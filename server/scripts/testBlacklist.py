import subprocess
import json
import cv2
import numpy as np

# Load the composite image
composite_path = "./test_composites/test.jpg"  # Change to your actual composite image path
composite_img = cv2.imread(composite_path)

# Define student coordinates (adjust as needed)
student_coords = [
    [3486.191162109375, 2423.927490234375],  # Center (x, y)
    [349.65777587890625, 421.1594543457031],  # Major and minor axes (width, height)
    0.0011821674415841699            # Angle (rotation in degrees)
]

# Convert image to binary for stdin
_, img_encoded = cv2.imencode(".jpg", composite_img)
binary_data = img_encoded.tobytes()

# Run the script via subprocess
result = subprocess.run(
    ["python", "blacklistStudent.py", json.dumps(student_coords)],
    input=binary_data,
    stdout=subprocess.PIPE
)

# Convert output back to an image
output_img = cv2.imdecode(np.frombuffer(result.stdout, np.uint8), cv2.IMREAD_COLOR)

# Save and show the result
cv2.imwrite("./test_composites/output_blacklisted.jpg", output_img)
