Plan for making face authorisation and integrating with the current web app:

https://towardsdatascience.com/facial-recognition-login-system-using-deep-learning-reactjs-61bff981eb74
Refer to the above link, for the code and explanation.
https://github.com/jackfrost1411/facial-recognition-login
Github link for the same code.

How the face authorisation should work:
1. User enters their ID. If token is available, and they click Face authorisation button, then they should login with face.
2. If ID is not present, they should register their face along with other details.
The back-end will have two routes, '/face_sign_in' and '/face_sign_up'.

For the react frontend, as shown in the above link, the same code will be used to display a webcam and capture the image.
For '/face_sign_up', the image, base64 encoded, and the ID token will be passed in header, and the particular image is written to file, and the database will store the path.
For '/face_sign_in', the image, and the image from database, are taken and passed to the model wrtten in python.  
The two routes, '/face_sign_in' and '/face_sign_up' are to written in NodeJS backend, in routes folder, face_auth.js file.
From each route, we will need an API to call the python model, which basically means, we need to give the required parameters and call the functions in Python, from NodeJS.