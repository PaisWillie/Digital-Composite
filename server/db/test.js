const path = require("path");
const ImageService = require("./dal/image_service"); // Update the path if needed

async function testImageService() {
    const imageService = new ImageService();

    try {
        console.log("---- Starting ImageService Tests ----");

        // Test 1: Upload an image
        const testFilePath = path.resolve(__dirname, "test-files/random.png"); // Replace with your test image file path
        console.log(testFilePath)
        console.log("Uploading image...");
        const uploadUrl = await imageService.uploadImage(testFilePath, "2024", "electrical");
        console.log("Image uploaded successfully. S3 URL:", uploadUrl);

        // Test 3: Download an image
        const downloadImageName = "2024/electrical/random.png"; // Use the name of the uploaded image
        const downloadPath = path.resolve(__dirname, "downloads/random.png"); // Save the downloaded file locally
        console.log("\nDownloading image...");
        await imageService.downloadImage(downloadImageName, downloadPath);
        console.log("Image downloaded successfully. Saved at:", downloadPath);

        console.log("\n---- ImageService Tests Completed Successfully ----");
        
    } catch (error) {
        console.error("An error occurred during testing:", error.message);
    }
}

testImageService();
