from PIL import Image

# Paths     
logo_path = "../test/fireball_grey_mcmaster_engineering-01-01_eps_eps.eps"

# Function to convert PIL image to save as JPG ( NEED GHOSTSCRIPTS INSTALLED)
def convert_pil_to_cv2(pil_image):

    eps_image = Image.open(pil_image)
    eps_image.convert("RGB").save("fireball_logo.jpg", format="JPEG")

    return

# Def main function
def main():
    convert_pil_to_cv2(logo_path)

# Entry point of the script
if __name__ == "__main__":
    main()



