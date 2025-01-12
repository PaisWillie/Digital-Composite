from db.dal.image_service import ImageService

def main():
    image_service = ImageService()

    file_path = "random.png"
    image_name = "random.png"
    uploaded_url = image_service.upload_image(file_path, image_name)
    print(f"Uploaded image URL: {uploaded_url}")

    #download_path = "path/to/download/image.jpg"
    #image_service.download_image(image_name, download_path)
    #print(f"Image downloaded to: {download_path}")


if __name__ == "__main__":
    main()
