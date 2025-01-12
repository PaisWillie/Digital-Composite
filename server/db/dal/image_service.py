from db.dao.s3_dao import S3DAO

class ImageService:
    def __init__(self):
        self.s3_dao = S3DAO()

    def upload_image(self, file_path: str, image_name: str) -> str:

        object_name = f"2024/{image_name}"
        return self.s3_dao.upload_file(file_path, object_name)

    def download_image(self, image_name: str, download_path: str):
       
        object_name = f"images/{image_name}"
        self.s3_dao.download_file(object_name, download_path)

    def list_images(self) -> list:
        
        all_files = self.s3_dao.list_files()
 
        return [file for file in all_files if file.startswith("images/")]
