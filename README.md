# 📜 Project description

In this project, we make use of the present face recognition and voice technologies to access our personal information on the web. We will build a profile app where we can see our profiles, modify them. But the login to our profile can be done using

* Username and Password
* Face recognition
* Trigger word detection

## LBPHFaceRecognizer

### Folder Structure

* cascade
    * haarcascade_frontalface_default.xml

* encodings
    * username.yml - face encodings of the user

* face_rec.py (program)

### How it works?

1. We will be given 3 options:
    * Register
    * Login 
    * Quit

2. We have to give ID, and it will start collecting your images and store it's encodings directly in `encodings/username.yml` file.

3. When we try to login, the encodings of the given ID is taken and verified.

Please try it out and inform me the results. I already added my face images and trained it.
