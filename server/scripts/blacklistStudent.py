import json
import cv2
import numpy as np
import sys
from io import BytesIO
import os

def convert_buffer_to_cv2(buffer):
    nparr = np.frombuffer(buffer, np.uint8)
    cv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return cv_image


# Blacklist student on composite image
def main(composite, student_coords, logo):
    base_image = composite.copy()

    cx = int(student_coords[0][0])  # Center X
    cy = int(student_coords[0][1])  # Center Y
    major = int(student_coords[1][0])  # Major axis (width)
    minor = int(student_coords[1][1])  # Minor axis (height)
    angle = int(student_coords[2])  # Rotation angle

    # Compute bounding box coordinates
    x1 = cx - major // 2
    y1 = cy - minor // 2
    x2 = x1 + major
    y2 = y1 + minor

    # Ensure coordinates are within image bounds
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(base_image.shape[1], x2), min(base_image.shape[0], y2)

    # Fill the bounding box area with white
    base_image[y1:y2, x1:x2] = (255, 255, 255)

    # Get logo dimensions
    logo_h, logo_w = logo.shape[:2]

    # Determine the scaling factor (maintain aspect ratio)
    scale = min(major / logo_w, minor / logo_h)
    new_w = int(logo_w * scale)
    new_h = int(logo_h * scale)

    # Resize the logo while maintaining aspect ratio
    resized_logo = cv2.resize(logo, (new_w, new_h), interpolation=cv2.INTER_AREA)

    # Compute placement so the logo is centered
    logo_x1 = cx - new_w // 2
    logo_y1 = cy - new_h // 2
    logo_x2 = logo_x1 + new_w
    logo_y2 = logo_y1 + new_h

    # Ensure logo placement is within image bounds
    logo_x1, logo_y1 = max(0, logo_x1), max(0, logo_y1)
    logo_x2, logo_y2 = min(base_image.shape[1], logo_x2), min(base_image.shape[0], logo_y2)

    # Extract the logo's region
    logo_roi = resized_logo[: logo_y2 - logo_y1, : logo_x2 - logo_x1]

    # Overlay the logo onto the white-filled area
    base_image[logo_y1:logo_y2, logo_x1:logo_x2] = logo_roi

    return base_image

if __name__ == "__main__":
    image_data = sys.stdin.buffer.read()
    student_coords = json.loads(sys.argv[1])

    composite_img = convert_buffer_to_cv2(image_data)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    logo_path = os.path.join(script_dir, "./logo/fireball_logo.jpg")
    logo = cv2.imread(logo_path)

    processed_img = main(composite_img, student_coords, logo)

    _, img_encoded = cv2.imencode(".jpg", processed_img)
    binary_data = img_encoded.tobytes()
    sys.stdout.buffer.write(binary_data)





