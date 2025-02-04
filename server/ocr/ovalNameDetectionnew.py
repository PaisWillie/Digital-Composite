import cv2 
import numpy as np 
  
image_path = "./testcomposite/test.jpg"
output_folder = "output"
program_year = "2024-Materials_Engineering"

thing = cv2.imread(image_path)
thing2 = cv2.convertScaleAbs(thing, alpha=0.9, beta=0)
thing3 = cv2.Canny(thing2, 100, 200)

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed_edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
return cv2.dilate(closed_edges, kernel, iterations=1)
  
# Set our filtering parameters 
# Initialize parameter setting using cv2.SimpleBlobDetector 
params = cv2.SimpleBlobDetector_Params() 
  
# Set Area filtering parameters 
params.filterByArea = False
params.minArea = 500
  
# Set Circularity filtering parameters 
params.filterByCircularity = True 
params.minCircularity = 0.3
params.maxCircularity = 0.9
  
# Set Convexity filtering parameters 
params.filterByConvexity = True
params.minConvexity = 0.2
      
# Set inertia filtering parameters 
params.filterByInertia = True
params.minInertiaRatio = 0.01
params.maxInertiaRatio = 0.5
  
# Create a detector with the parameters 
detector = cv2.SimpleBlobDetector_create(params) 
      
# Detect blobs 
keypoints = detector.detect(image) 
  
# Draw blobs on our image as red circles 
blank = np.zeros((1, 1))  
blobs = cv2.drawKeypoints(image, keypoints, blank, (0, 0, 255), 
                          cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS) 
  
number_of_blobs = len(keypoints) 
text = "Number of Circular Blobs: " + str(len(keypoints)) 
cv2.putText(blobs, text, (20, 550), 
            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 100, 255), 2) 
  
# Show blobs 
cv2.imshow("Filtering Circular Blobs Only", blobs) 
cv2.waitKey(0) 
cv2.destroyAllWindows() 