import cv2
import pytesseract
from pytesseract import Output
import os

# Ensure the Tesseract executable is in your PATH
# For Windows, you might need to specify the path to the tesseract executable
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

def extract_names_and_images(image_path, output_dir):
    # Load the image
    image = cv2.imread(image_path)
    
    # Perform OCR to detect text
    d = pytesseract.image_to_data(image, output_type=Output.DICT)
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Dictionary to store names and corresponding image filenames
    name_image_dict = {}
    
    # Iterate through detected text
    for i in range(len(d['text'])):
        if int(d['conf'][i]) > 60:  # Confidence threshold
            name = d['text'][i].strip()
            if name.isalpha():  # Check if the detected text is a name
                x, y, w, h = d['left'][i], d['top'][i], d['width'][i], d['height'][i]
                
                # Define the region of interest (ROI) for the image above the name
                roi_y1 = max(0, y - h * 3)  # Adjust the multiplier as needed
                roi_y2 = y
                roi_x1 = x
                roi_x2 = x + w
                
                # Crop the image
                cropped_image = image[roi_y1:roi_y2, roi_x1:roi_x2]
                
                # Save the cropped image
                image_filename = os.path.join(output_dir, f"{name}.png")
                cv2.imwrite(image_filename, cropped_image)
                
                # Add to dictionary
                name_image_dict[name] = image_filename
    
    # Print the dictionary
    print(name_image_dict)

# Example usage
extract_names_and_images('test.jpg', 'portraits')