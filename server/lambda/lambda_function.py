import sys
import cv2
import easyocr
import boto3
import numpy as np

# Initialize EasyOCR Reader
reader = easyocr.Reader(['en'], gpu=False)

# Allowed characters
allowed_chars = set(
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "\u00e0\u00e2\u00e4\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u00f6\u00f9\u00fb\u00fc\u00e7"
    "\u00c0\u00c2\u00c4\u00c9\u00c8\u00ca\u00cb\u00ce\u00cf\u00d4\u00d6\u00d9\u00db\u00dc\u00c7"
    "\u2019'-\u2013_! ()&"
)

# Load an image from the specified path
def load_image(image_path):
    return cv2.imread(image_path)

# Adjust the contrast of the image
def adjust_contrast(image, alpha=0.9, beta=0):
    return cv2.convertScaleAbs(image, alpha=alpha, beta=beta)

# Detect edges in the image using the Canny edge detector
def detect_edges(image):
    return cv2.Canny(image, 100, 200)

# Apply morphological operations to close gaps in the edges
def morphological_operations(edges):
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    closed_edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
    return cv2.dilate(closed_edges, kernel, iterations=1)

# Find contours in the dilated edge image
def find_contours(dilated_edges):
    contours, _ = cv2.findContours(dilated_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    return contours

# Filter contours to find potential student regions based on aspect ratio and size
def filter_contours(contours):
    temp_student_regions = []
    areas = []
    for contour in contours:
        if len(contour) >= 400:
            # Fit an ellipse to the contour
            ellipse = cv2.fitEllipse(contour)
            center, axes, angle = ellipse
            aspect_ratio = float(axes[0]) / axes[1]
            # Check if the aspect ratio is within the desired range
            if 0.7 <= aspect_ratio <= 0.9:
                temp_student_regions.append(ellipse)
                # Calculate the area of the ellipse
                area = np.pi * axes[0] * axes[1] / 4
                areas.append(area)
    return temp_student_regions, areas

# Filter student regions by area to remove outliers
def filter_by_area(temp_student_regions, areas, tolerance=0.4):
    avgarea = np.mean(areas)
    stdarea = np.std(areas)
    student_regions = [
        student for student in temp_student_regions
        # Check if the area is within the tolerance range
        if abs((student[1][0] * student[1][1] * np.pi / 4) - avgarea) <= tolerance * stdarea
    ]
    return student_regions

# Extract the region of interest (ROI) for text extraction
def extract_text_roi(image, center, axes, padding=0, base_text_height=60, max_lines=2, width_multiplier=1.0):
    x, y = int(center[0]), int(center[1])
    width, height = int(axes[0]), int(axes[1])
    roi_top = max(0, y + height // 2 + padding)
    roi_left = max(0, int(x - width * width_multiplier // 2))
    roi_right = min(image.shape[1], int(x + width * width_multiplier // 2))
    roi_bottom = roi_top + base_text_height

    for i in range(max_lines):
        line_roi = image[roi_bottom - base_text_height:roi_bottom, roi_left:roi_right]
        gray_line = cv2.cvtColor(line_roi, cv2.COLOR_BGR2GRAY)
        white_space_ratio = cv2.countNonZero(gray_line) / gray_line.size
        # Check if the line contains mostly white space
        if white_space_ratio < 0.1:
            break
        roi_bottom += base_text_height
        # Ensure the ROI does not exceed the image boundaries
        if roi_bottom >= image.shape[0]:
            break

    # Validate the ROI dimensions
    if roi_top >= roi_bottom or roi_left >= roi_right:
        return None, roi_left, roi_top, roi_right, roi_bottom

    roi = image[roi_top:roi_bottom, roi_left:roi_right]
    return roi, roi_left, roi_top, roi_right, roi_bottom

# Check if the extracted text is a valid name
def is_valid_name(text):
    return all(char in allowed_chars or char.isspace() for char in text)

# Process each detected oval to extract and validate text
def process_ovals(image, student_regions):
    final_image = image.copy()
    mapped_ovals = []
    metadata_list = []
    for idx, student in enumerate(student_regions):
        center, axes, angle = student
        roi, roi_left, roi_top, roi_right, roi_bottom = extract_text_roi(image, center, axes)
        if roi is None:
            print(f"Invalid ROI detected for oval {idx + 1}, skipping...")
            continue
        gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
        results = reader.readtext(gray_roi, detail=0)
        extracted_text = "\n".join(results)
        lines = extracted_text.strip().split("\n")
        valid_lines = [line.strip() for line in lines if line.strip()][:2]
        # Check if the extracted text is a valid name
        if valid_lines and is_valid_name(" ".join(valid_lines)):
            mapped_ovals.append({"center": center, "name_lines": valid_lines})
            # Draw the ellipse and ROI on the final image
            cv2.ellipse(final_image, student, (0, 255, 0), 2)
            cv2.rectangle(final_image, (roi_left, roi_top), (roi_right, roi_bottom), (255, 0, 0), 2)
            name_text = " ".join(valid_lines)
            cv2.putText(final_image, name_text, (int(center[0] - 50), int(center[1] + axes[1] + 20)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)
            metadata_list.append({"Name": name_text, "Center": center})
            print(f"Name: {name_text}, Center: {center}")
        else:
            print(f"Invalid name detected for oval {idx + 1}, skipping...")
    return metadata_list

# Main function to execute the steps
def main(image_data):
    image_array = np.frombuffer(image_data, dtype=np.uint8)
    
    # Decode the image
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        print("Error: Failed to decode image")
        sys.exit(1)
    
    contrast = adjust_contrast(image)
    edges = detect_edges(contrast)
    dilated_edges = morphological_operations(edges)
    contours = find_contours(dilated_edges)
    temp_student_regions, areas = filter_contours(contours)
    student_regions = filter_by_area(temp_student_regions, areas)
    metadata = process_ovals(image, student_regions)
    return metadata

if __name__ == "__main__":
    image_data = sys.stdin.buffer.read()
    final_metadata = main(image_data)
    print(final_metadata)  # Ensure the output can be captured in Node.js