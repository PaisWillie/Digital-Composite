from PIL import Image
import cv2
import numpy as np
import os
import sys
from io import BytesIO

# THIS IS AN OUTDATED SCRIPT DO NOT USE
# YOU CAN USE SCRIPTS DIRECTLY FROM THE SCRIPTS FOLDER, THERE ARE TESTING SCRIPTS FOR EACH FUNCTIONAL SCRIPT AS WELL
# THERE

# Paths
jpeg_path = "./logo/fireball_logo.jpg"
output_folder = "output"

# Convert jpg to cv2 format
def convert_jpg_to_cv2(jpg_image):
    cv_image = cv2.imread(jpg_image)
    return cv_image

def convert_buffer_to_cv2(buffer):
    nparr = np.frombuffer(buffer, np.uint8)
    cv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return cv_image

# Blacklist student on composite image
def blacklist_student(composite, student_coords, logo):
    #base_imageog = cv2.imread(composite)
    base_imageog = convert_buffer_to_cv2(composite)
    base_image = base_imageog.copy()

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

    output_image_path = os.path.join(output_folder, f"{program_year}_blacklisted.jpg")
    cv2.imwrite(output_image_path, base_image)
    print(f"Blacklisted image saved in '{output_folder}/{program_year}_blacklisted.jpg'")


if __main__ == "__main__":
    logo = convert_jpg_to_cv2(jpeg_path)
    blacklist_student(composite_path, json_path, "Kevin Armah Mensah", logo)
    image_data = sys.stdin.buffer.read()
    image_array = main(image_data)
    sys.stdout.buffer.write(image_array)




