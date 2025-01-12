import cv2
import numpy as np
import mediapipe as mp

from flask import Flask, request, jsonify, make_response, Response
from flask_cors import CORS
import threading
import time


app = Flask(__name__)
CORS(app)

shared_string = ""

@app.route('/stream-notes')
def stream_notes():
    def generate():
        global shared_string
        last_sent = None  # Track the last sent value to avoid redundant updates
        while True:
            if shared_string != last_sent:
                yield f"data: {shared_string}\n\n"  # Stream data as SSE format
                last_sent = shared_string
            time.sleep(0.5)  # Adjust the interval if needed for faster/slower updates
    return Response(generate(), mimetype='text/event-stream')

@app.route('/get-notes', methods=['GET'])
def get_notes():
    global shared_string
    return shared_string

def run_server():
    print("Server is running on http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=False, use_reloader=False)


# Initialize Mediapipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils



def get_finger_tips(hand_landmarks, frame_width, frame_height):
    """Extract the coordinates of all fingertips including the thumb."""
    fingertips = [4, 8, 12, 16, 20]  # Thumb, index, middle, ring, pinky tips
    #fingertips = [8]
    finger_positions = []
    for tip_id in fingertips:
        x = int(hand_landmarks.landmark[tip_id].x * frame_width)
        y = int(hand_landmarks.landmark[tip_id].y * frame_height)
        finger_positions.append((x, y))
    return finger_positions

def map_fingers_to_keys(finger_positions, key_position):
    """Map all fingertip positions to specific keys."""
    pressed_keys = set()
    for x, y in finger_positions:
        for key, (x_key, y_key, w_key, h_key) in key_position.items():
            if x_key <= x  and y_key <= y and x <= x_key + w_key and y <= y_key + h_key:
                pressed_keys.add(key)
    return pressed_keys

def draw_pressed_keys(frame, pressed_keys):
    """Display all pressed keys as a CSV at the top of the screen."""
    csv_text = ', '.join(pressed_keys)
    cv2.putText(frame, f"Pressed Keys: {csv_text}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)



def is_excessively_overlapping(r1, r2):
    """
    Checks if two rectangles overlap excessively (>50% of the smaller rectangle's area).
    """
    x1, y1, w1, h1 = r1
    x2, y2, w2, h2 = r2

    # Calculate intersection
    xi1 = max(x1, x2)
    yi1 = max(y1, y2)
    xi2 = min(x1 + w1, x2 + w2)
    yi2 = min(y1 + h1, y2 + h2)

    if xi1 >= xi2 or yi1 >= yi2:
        return False  # No overlap

    intersection_area = (xi2 - xi1) * (yi2 - yi1)
    min_area = min(w1 * h1, w2 * h2)
    return (intersection_area / min_area) > 0.5

def detect_keyboard(imgOriginal, imgDil):
    """
    Detect piano keys in the image and return bounding rectangles of the detected keys.
    """
    # Find contours and hierarchy
    contours, hierarchy = cv2.findContours(imgDil, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

    conPoly = []  # List to store polygonal approximations
    boundRect = []  # List to store bounding rectangles
    detectedKeys = 0

    # Iterate through all contours
    for i, contour in enumerate(contours):
        # Check area of each contour to filter out small or large irregularities
        area = cv2.contourArea(contour)
        if area < 500 or area > 50000:
            continue

        # Check for nested contours using the hierarchy
        if hierarchy[0][i][3] != -1:
            # Polygonal approximation
            peri = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

            # Assume piano keys are rectangular (4 corners)
            if len(approx) == 4:
                # Get bounding rectangle
                x, y, w, h = cv2.boundingRect(approx)
                aspect_ratio = h / float(w)

                # Filter by aspect ratio
                if 4.2 <= aspect_ratio <= 7.2:
                    # Check for excessive overlap
                    excessive_overlap = False
                    for existing in boundRect:
                        if is_excessively_overlapping(existing, (x, y, w, h)):
                            excessive_overlap = True
                            break

                    # Add rectangle if it doesn't excessively overlap
                    if not excessive_overlap:
                        boundRect.append((x, y, w, h))
                        detectedKeys += 1

                        # Draw the bounding rectangle and label
                        cv2.rectangle(imgOriginal, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Expected total keys in a single octave piano
    totalKeys = 13

    # Display detection status
    if detectedKeys < totalKeys:
        cv2.putText(imgOriginal, "Piano not found", (50, 50), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 3)
    else:
        cv2.putText(imgOriginal, "All keys detected", (50, 50), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 3)

    # Sort the rectangles by their x-coordinate
    boundRect.sort(key=lambda rect: rect[0])

    return boundRect

# def detect_keyboard(imgOriginal, imgDil):
#     # Find contours and hierarchy
#     contours, hierarchy = cv2.findContours(imgDil, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    
#     conPoly = [None] * len(contours)  # List to store polygonal approximations
#     boundRect = [None] * len(contours)  # List to store bounding rectangles

#     detectedKeys = 0

#     # Iterate through all contours
#     for i, contour in enumerate(contours):
#         # Check area of each contour to filter out small or large irregularities
#         area = cv2.contourArea(contour)

#         if area < 500 or area > 50000:
#             continue

#         # Check for nested contours using the hierarchy
#         if hierarchy[0][i][3] != -1:
#             # Polygonal approximation
#             peri = cv2.arcLength(contour, True)
#             conPoly[i] = cv2.approxPolyDP(contour, 0.02 * peri, True)

#             # Get bounding rectangle
#             boundRect[i] = cv2.boundingRect(conPoly[i])

#             # Assume piano keys are rectangular (4 corners)
#             if len(conPoly[i]) == 4:
#                 detectedKeys += 1

#                 # Draw the bounding rectangle and label
#                 x, y, w, h = boundRect[i]
#                 cv2.rectangle(imgOriginal, (x, y), (x + w, y + h), (0, 255, 0), 2)
#                 cv2.putText(imgOriginal, "Key", (x, y - 10), cv2.FONT_HERSHEY_PLAIN, 1, (0, 69, 255), 2)

#     # Expected total keys in a single octave piano
#     totalKeys = 13

#     # Check if all keys are detected
#     if detectedKeys < totalKeys:
#         cv2.putText(imgOriginal, "Piano not found", (50, 50), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 3)
#     else:
#         cv2.putText(imgOriginal, "All keys detected", (50, 50), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 3)

#     # Sort the rectangles by their x-coordinate
#     boundRect = [rect for rect in boundRect if rect is not None]  # Remove None values
#     boundRect.sort(key=lambda rect: rect[0])  # Sort by x-coordinate

#     return boundRect

# def draw_keyboard(frame, key_position):
    
def preProcess(img):
    # Convert to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Apply Gaussian blur
    img_blur = cv2.GaussianBlur(img_gray, (5, 5), 1)
    # Apply Canny edge detection
    img_canny = cv2.Canny(img_blur, 50, 50)
    # Apply dilation
    kernel = np.ones((5, 5))
    img_dil = cv2.dilate(img_canny, kernel, iterations=1)
    return img_dil



# Initialize webcam
cap = cv2.VideoCapture(2)

paused = False
key_position = {}

orderOfKeys = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5']


if __name__ == "__main__":
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        #flip the frame
        #frame = cv2.flip(frame, 1)
        frame_height, frame_width, _ = frame.shape


        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        pressed_keys = set()

        if not paused:
            # Preprocess the frame
            imgDil = preProcess(frame)
            # Get the piano contours
            keys = detect_keyboard(frame, imgDil)
            frozenKeys = keys

            if(len(frozenKeys) == 13):
                for i in range(len(frozenKeys)):
                    key_position[orderOfKeys[i]] = frozenKeys[i]
                print(key_position)
                paused = True

        i = 0
        if len(frozenKeys) == 13:
            for key in frozenKeys:
                x, y, w, h = key
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, orderOfKeys[i], (x, y - 10), cv2.FONT_HERSHEY_PLAIN, 1, (0, 69, 255), 2)
                i += 1

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Get positions of all fingertips including the thumb
                finger_positions = get_finger_tips(hand_landmarks, frame_width, frame_height)

                # Highlight the fingertips
                for x, y in finger_positions:
                    cv2.circle(frame, (x, y), 10, (0, 255, 0), -1)
                

                # Map all fingertips to keys
                pressed_keys.update(map_fingers_to_keys(finger_positions, key_position))
        
        #print(pressed_keys)
        # Display pressed keys at the top
        draw_pressed_keys(frame, pressed_keys)
        shared_string = ', '.join(pressed_keys)

        cv2.imshow("Virtual Piano", frame)

        key = cv2.waitKey(1)
        if key == ord('q'):
            break
        elif key == ord(' '):
            paused = False

    cap.release()
    cv2.destroyAllWindows()
