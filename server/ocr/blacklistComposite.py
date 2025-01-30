import json
from PIL import Image
import cv2
import numpy as np
import os

# Paths     
logo_path = "../test/fireball_grey_mcmaster_engineering-01-01_eps_eps.eps"
json_path = "output.json"
composite_path = "../test/test.jpg"

# function to convert PIL image to cv2 image or to save as JPG ( NEED GHOSTSCRIPTS INSTALLED)
def convert_pil_to_cv2(pil_image):
    eps_image = Image.open(pil_image)
    #first = eps_image.convert("RGB")
    #cv_image = np.array(first)
    #return cv2.cvtColor(cv_image, cv2.COLOR_RGB2BGR)
    eps_image.convert("RGB").save("fireball_logo.jpg", format="JPEG")

def convert_jpg_to_cv2(jpg_image):
    cv_image = cv2.imread(jpg_image)
    return cv_image

def blacklist_student(composite, data, student, logo):
    base_imageog = cv2.imread(composite)
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

    # DISPLAY ON SCREEN
    
    cv2.imshow("Filled Ellipse", base_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # DOES NOT SAEV RESULT YET


def main():
    #logo = convert_pil_to_cv2(logo_path)
    logo = convert_jpg_to_cv2("fireball_logo.jpg")
    blacklist_student(composite_path, json_path, "Kevin Armah Mensah", logo)

# Entry point of the script
if __name__ == "__main__":
    main()



