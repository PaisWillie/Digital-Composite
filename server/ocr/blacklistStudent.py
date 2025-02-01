import json
from PIL import Image
import cv2
import numpy as np
import os
from io import BytesIO

# Paths
jpeg_path = "./logo/fireball_logo.jpg"
#composite_path = "./testcomposite/test.jpg"
output_folder = "output"
program_year = "2024-Materials_Engineering"
json_path = f"./output/{program_year}.json"


# Convert jpg to cv2 format
def convert_jpg_to_cv2(jpg_image):
    cv_image = cv2.imread(jpg_image)
    return cv_image

def convert_buffer_to_cv2(buffer):
    nparr = np.frombuffer(buffer, np.uint8)
    cv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return cv_image


# Blacklist student on composite image
def blacklist_student(composite, data, student, logo):
    #base_imageog = cv2.imread(composite)
    base_imageog = convert_buffer_to_cv2(composite)
    base_image = base_imageog.copy()

    with open (data) as f:
        data = json.load(f)
    for person in data:
        if person["name"] == student:
            cx = int(person["student_region"][0][0])
            cy = int(person["student_region"][0][1])
            major = int(person["student_region"][1][0])
            minor = int(person["student_region"][1][1])
            angle = int(person["student_region"][2])
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

    output_image_path = os.path.join(output_folder, f"{program_year}_blacklisted.jpg")
    cv2.imwrite(output_image_path, base_image)
    print(f"Blacklisted image saved in '{output_folder}/{program_year}_blacklisted.jpg'")



# EXAMPLE USAGE
"""
logo = convert_jpg_to_cv2(jpeg_path)
blacklist_student(composite_path, json_path, "Kevin Armah Mensah", logo)
"""




