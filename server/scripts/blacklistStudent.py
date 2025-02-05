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

    cx = int(student_coords[0][0])
    cy = int(student_coords[0][1])
    major = int(student_coords[1][0])
    minor = int(student_coords[1][1])
    angle = int(student_coords[2])
    resized_fill = cv2.resize(logo, (major, minor))

    mask = np.zeros_like(base_image[:,:,0])
    cv2.ellipse(mask, (cx, cy), (major//2, minor//2), angle, 0, 360, 255, thickness=cv2.FILLED)

    x1, y1 = cx - major // 2, cy - minor // 2
    x2, y2 = x1 + major, y1 + minor
    roi = base_image[y1:y2, x1:x2]

    # Apply the mask to blend the fill image into the base image
    roi[np.where(mask[y1:y2, x1:x2] == 255)] = resized_fill[np.where(mask[y1:y2, x1:x2] == 255)]

    # Put the modified region back into the base image
    base_image[y1:y2, x1:x2] = roi

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





