import cv2
import easyocr
import sys
import os
import numpy as np
import json

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

# color contour
def detect_colored_contours(image):
    # Convert image to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    # give me color range for the color rgb: (143, 64, 243)
    lower_bound = np.array([120, 100, 100])
    upper_bound = np.array([140, 255, 255])

    # Threshold the image to get only the desired color
    mask = cv2.inRange(hsv, lower_bound, upper_bound)


    # Apply morphological operations to clean up the mask
    #kernel = np.ones((5, 5), np.uint8)
    #mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=1)
    

    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    output = image.copy()
    cv2.drawContours(output, contours, -1, (0, 255, 0), 2)

    # Display results
    cv2.imshow("Mask", mask)
    cv2.imshow("Detected Contours", output)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return contours

# Adjust the contrast of the image
def adjust_contrast(image, alpha=1.05, beta=5):

    detect_colored_contours(image)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    adjusted = cv2.convertScaleAbs(gray, alpha=alpha, beta=beta)
    window_name = "contrast"
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.imshow(window_name, adjusted)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()

    # Create a mask for white regions
    _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)

    # Create an output image, setting non-white areas to black
    output = np.zeros_like(image)
    output[mask == 255] = [255, 255, 255]  # Keep white areas as white
    window_name = "output"
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.imshow(window_name, output)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    return output

# Detect edges in the image using the Canny edge detector
def detect_edges(image):
    edge = cv2.Canny(image, 100, 200)
    # show the edges
    window_name = "canny"
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.imshow(window_name, edge)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()

    return image

# Apply morphological operations to close gaps in the edges
def morphological_operations(edges):
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (4, 4))
    closed_edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
    d = cv2.dilate(closed_edges, kernel, iterations=1)
    # show the closed edges
    window_name = "morph"
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.imshow(window_name, d)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    return d

# Find contours in the dilated edge image
def find_contours(dilated_edges, image):
    if len(dilated_edges.shape) == 3:  # Check if it's a color image
        dilated_edges = cv2.cvtColor(dilated_edges, cv2.COLOR_BGR2GRAY)
    contours, _ = cv2.findContours(dilated_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    # display the contours

    while len(contours) < 10:
        contours, _ = cv2.findContours(dilated_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        if not contours:
            return []
        else:
            cv2.drawContours(dilated_edges, contours[0], -1, 0, thickness=cv2.FILLED)
    contours, _ = cv2.findContours(dilated_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    window_name = "draw"
    th = image.copy()
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.drawContours(th, contours, -1, (0, 255, 0), 5)
    #cv2.imshow(window_name,th)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    return contours

# Filter contours to find potential student regions based on aspect ratio and size
def filter_contours(contours, image):
    temp_student_regions = []
    areas = []
    contourareas = [cv2.contourArea(contour) for contour in contours]
    bigarea = sorted(contourareas)[-3]
    tolerance = 1
    minarea = bigarea * (1 - tolerance)
    maxarea = bigarea * (1 + tolerance)
    temp_save = []

    for contour in contours:
        if len(contour) < 5:
            continue
        #if len(contour) >= 50 and minarea <= cv2.contourArea(contour) <= maxarea:
            #if cv2.contourArea(contour) < minarea or cv2.contourArea(contour) > maxarea:
            #    continue
            # Fit an ellipse to the contour
        ellipse = cv2.fitEllipse(contour)
        save = contour
        center, axes, angle = ellipse
        aspect_ratio = float(axes[0]) / axes[1]
            # Check if the aspect ratio is within the desired range
            #if 0.69 <= aspect_ratio <= 0.9:
        temp_student_regions.append(ellipse)
        # Calculate the area of the ellipse
        area = np.pi * axes[0] * axes[1] / 4
        areas.append(area)
        temp_save.append(save)
    
    window_name = "draw"
    th = image.copy()
    # sort the ellipses on the its x axis
    #cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)  # Allows manual resizing
    #cv2.resizeWindow(window_name, 1600, 1400)
    #cv2.drawContours(th, temp_save, -1, (0, 255, 0), 2)
    #cv2.imshow(window_name,th)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    return temp_student_regions, areas

# Filter student regions by area to remove outliers
def filter_by_area(temp_student_regions, areas, tolerance=0.4):
    #avgarea = np.mean(areas)
    #stdarea = np.std(areas)
    #student_regions = [
    #    student for student in temp_student_regions
        # Check if the area is within the tolerance range
    #    if abs((student[1][0] * student[1][1] * np.pi / 4) - avgarea) <= tolerance * stdarea
    #]
    student_regions = temp_student_regions
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


def boundingEllipseRectangle(ellipse):
    box = cv2.boxPoints(ellipse)
    return box.astype(int).tolist()

"""
# Process each detected oval to extract and validate text
def process_ovals(image, student_regions, program_year):
    data = []
    final_image = image.copy()
    mapped_ovals = []
    for idx, student in enumerate(student_regions):
        center, axes, angle = student
        roi, roi_left, roi_top, roi_right, roi_bottom = extract_text_roi(image, center, axes)
        if roi is None:
            continue
        gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
        results = reader.readtext(gray_roi, detail=0)
        extracted_text = "\n".join(results)
        lines = extracted_text.strip().split("\n")
        valid_lines = [line.strip() for line in lines if line.strip()][:2]

        corners = boundingEllipseRectangle(student)

        # Assign corners to variables
        top_left = corners[1]
        top_right = corners[2]
        bottom_left = corners[0]
        bottom_right = corners[3]
        height, width = final_image.shape[:2]


        # Check if the extracted text is a valid name
        if valid_lines and is_valid_name(" ".join(valid_lines)):
            mapped_ovals.append({"center": center, "name_lines": valid_lines, "top_left": top_left, "top_right": top_right, "bottom_left": bottom_left, "bottom_right": bottom_right})
            # Draw the ellipse and ROI on the final image
            cv2.ellipse(final_image, student, (0, 255, 0), 2)
            cv2.rectangle(final_image, (roi_left, roi_top), (roi_right, roi_bottom), (255, 0, 0), 2)
            name_text = " ".join(valid_lines)
            cv2.putText(final_image, name_text, (int(center[0] - 50), int(center[1] + axes[1] + 20)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)
            output = f"Name: {name_text}"

            # add output to data as json
            data.append({   
                            "name": name_text, 
                            "top_left": top_left, 
                            "top_right": top_right, 
                            "bottom_left": bottom_left, 
                            "bottom_right": bottom_right, 
                            "student_region": student
                        })
            corners = boundingEllipseRectangle(student)

    # Format data into final JSON
    og_data = [{"programYear": program_year,
                "students": data}]

    return og_data """
def process_ovals(image, student_regions, program_year):
    data = []
    final_image = image.copy()
    mapped_ovals = []

    for idx, student in enumerate(student_regions):
        center, axes, angle = student
        roi, roi_left, roi_top, roi_right, roi_bottom = extract_text_roi(image, center, axes)
        
        if roi is None:
            continue
        
        gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
        results = reader.readtext(gray_roi, detail=0)
        extracted_text = "\n".join(results)
        lines = extracted_text.strip().split("\n")
        valid_lines = [line.strip() for line in lines if line.strip()][:2]

        corners = boundingEllipseRectangle(student)

        # Assign corners to variables
        top_left = corners[1]
        top_right = corners[2]
        bottom_left = corners[0]
        bottom_right = corners[3]

        # Default name
        name_text = "PLEASE CHECK NAME"

        # Check if the extracted text is a valid name
        if valid_lines and is_valid_name(" ".join(valid_lines)):
            name_text = " ".join(valid_lines)

        # Draw the ellipse and ROI on the final image
        cv2.ellipse(final_image, student, (0, 255, 0), 2)
        cv2.rectangle(final_image, (roi_left, roi_top), (roi_right, roi_bottom), (255, 0, 0), 2)
        cv2.putText(final_image, name_text, (int(center[0] - 50), int(center[1] + axes[1] + 20)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1, cv2.LINE_AA)

        # Add output to data as JSON
        data.append({
            "name": name_text,
            "top_left": top_left,
            "top_right": top_right,
            "bottom_left": bottom_left,
            "bottom_right": bottom_right,
            "student_region": student
        })

    # Format data into final JSON
    og_data = [{"programYear": program_year, "students": data}]

    return og_data

# Main function to execute the steps
def main(image_data, program_year):
    image_array = np.frombuffer(image_data, dtype=np.uint8)

    if not image_data:
        print("Error: No image data received.", file=sys.stderr)
        sys.exit(1)
    
    # Decode the image
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        sys.exit(1)

    #contrast = adjust_contrast(image)
    #edges = detect_edges(contrast)
    #dilated_edges = morphological_operations(edges)
    #contours = find_contours(dilated_edges, image)
    contours = detect_colored_contours(image)
    temp_student_regions, areas = filter_contours(contours, image)
    student_regions = filter_by_area(temp_student_regions, areas)
    metadata = process_ovals(image, student_regions, program_year)
    return metadata

if __name__ == "__main__":
    program_year = sys.argv[1]
    image_data = sys.stdin.buffer.read()
    final_meta = main(image_data, program_year)
    print(json.dumps(final_meta))