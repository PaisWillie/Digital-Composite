from PIL import Image
import sys
import numpy as np
from io import BytesIO

def main(image_data):
    img = Image.open(BytesIO(image_data))

    # Resize the image to 50% of its original size
    width, height = img.size
    new_width = int(width * 0.5)
    new_height = int(height * 0.5)
    resized_img = img.resize((new_width, new_height))

    img_byte_array = BytesIO()
    resized_img.save(img_byte_array, format="JPEG")  # Ensure format is correct
    return img_byte_array.getvalue()  # Return byte data   

if __name__ == "__main__":
    image_data = sys.stdin.buffer.read()
    image_array = main(image_data)
    sys.stdout.buffer.write(image_array)
