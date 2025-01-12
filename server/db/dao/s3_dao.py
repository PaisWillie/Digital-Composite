import boto3
from botocore.exceptions import NoCredentialsError
import os
from dotenv import load_dotenv

load_dotenv()

class S3DAO:
    def __init__(self):
        self.bucket_name = "digital-composite-bucket"
        self.s3 = boto3.client(
            "s3",
            region_name=os.getenv('AWS_REGION'),
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
            aws_secret_access_key=os.getenv('AWS_SECRET_KEY'),
        )

    def upload_file(self, file_path: str, object_name: str) -> str:
        
        try:
            self.s3.upload_file(file_path, self.bucket_name, object_name, ExtraArgs={"ACL": "public-read"})
            return f"https://{self.bucket_name}.s3.amazonaws.com/{object_name}"
        except FileNotFoundError:
            raise Exception("File not found.")
        except NoCredentialsError:
            raise Exception("AWS credentials not found.")

    def download_file(self, object_name: str, download_path: str):
        
        try:
            self.s3.download_file(self.bucket_name, object_name, download_path)
        except NoCredentialsError:
            raise Exception("AWS credentials not found.")

    def list_files(self) -> list:

        response = self.s3.list_objects_v2(Bucket=self.bucket_name)
        if "Contents" in response:
            return [obj["Key"] for obj in response["Contents"]]
        return []

