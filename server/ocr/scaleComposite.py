from PIL import Image
from io import BytesIO

# Paths
#composite_path = "./testcomposite/test.jpg"
output_folder = "output"
program_year = "2024-Materials_Engineering"

def scaleComposite(composite_path, output_folder, program_year):
    # Load an image from the specified path
    img = Image.open(BytesIO(composite_path))


    # Resize the image to 50% of its original size
    width, height = img.size
    new_width = int(width * 0.5)
    new_height = int(height * 0.5)
    resized_img = img.resize((new_width, new_height))

    # Save the resized image
    resized_img.save(f"{output_folder}/{program_year}_preview.jpg")
    print(f"Resized image saved to {output_folder}/{program_year}_preview.jpg")
    return

# EXAMPLE USAGE
"""
scaleComposite(composite_path, output_folder, program_year)
"""

