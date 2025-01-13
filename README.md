# Ink-Keys

**Ink-Keys** turns drawings into instruments using a webcam and hand tracking, offering a portable, affordable way to make music. Accessible for kids, beginners, and creatives alike!

[Watch the demo](https://youtu.be/FEbX3Bo4c6Q?si=OAoiauRlL0f7RWWt)

---

## **Inspiration**

The idea for Ink-Keys came from the desire to make music accessible, affordable, and portable for everyone. The hefty price tag on pianos often makes music education inaccessible, discouraging beginners. Ink-Keys combines a child's love of drawing with the joy of playing music, fostering creativity and learning through fun. We wanted to eliminate the barriers by allowing users to draw their own piano and bring it to life anywhere, anytime.

---

## **What It Does**

- Uses a webcam, phone, or any camera available to detect a printed or drawn piano on paper.
- Allows users to learn, create, and play around with a piano system, with real-time feedback.

---

## **How We Built It**

### **Frontend**

- Used **ReactJS** and **TailwindCSS** to form an easy-to-follow hierarchy, displaying various components used and reused across the website.

### **Backend**

- **Flask**: Created a **SocketIO stream**, updating key presses in real-time.
- **OpenCV**: Accessed the webcam to detect the piano keys by finding contours in the video, filtering by shape and aspect ratio.
- **TensorFlow** and **MediaPipe**: Used for hand and fingertip tracking to allow easy interaction with the virtual keyboard.
- **Python**: Implemented backend logic for key detection, hand tracking, and input recognition.

---

## **Challenges We Ran Into**

- **Real-time Integration**: The initial system of constantly pinging the backend was inefficient, so we switched to a **Flask SocketIO stream** for real-time updates.
- **Noise Issues in Detection**: Separating keyboard keys based on drawn lines involved overcoming challenges with overlap detection, rectangle detection, and shape filters.

---

## **Accomplishments We're Proud Of**

- Developed a fully interactive and responsive keyboard.
- The website’s display reflects the keys being pressed in real-time.
- Successfully implemented **OpenCV**, **TensorFlow**, and **MediaPipe** for hand tracking and piano detection/key separation mechanisms.

---

## **What We Learned**

- Gained experience using **OpenCV**, **MediaPipe**, and **TensorFlow** for object detection and tracking.
- Learned how to use **Flask StreamIO** for seamless frontend-backend integration in real-time.

---

## **What's Next for Ink-Keys**

- **Community Features**: Users can save their info, enabling others to play and learn their custom tunes.
- **Precise Hand Tracking**: Enhance tracking to detect whether a finger is pressed down for a key press.
- **Mobile App**: Adapt Ink-Keys into an app with a user-friendly UI for mobile users.

---

## **Built With**

![C++](https://img.shields.io/badge/-C++-00599C?style=flat&logo=c%2B%2B&logoColor=white)
![CSS](https://img.shields.io/badge/-CSS-1572B6?style=flat&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=flask&logoColor=white)
![HTML](https://img.shields.io/badge/-HTML-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![MediaPipe](https://img.shields.io/badge/-MediaPipe-47A8B0?style=flat&logo=google&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)
![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

---
