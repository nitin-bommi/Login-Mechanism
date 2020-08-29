# 📜 Project description

In this project, we make use of the present face recognition and voice technologies to access our personal information on the web. We will build a profile app where we can see our profiles, modify them. But the login to our profile can be done using
* Username and Password
* Face recognition
* Trigger word detection

## 🔑 Login page

The user will be given three options to login. 

### ⌨️ Username and Password 

The user will get to access his account be entering the right credentials.

### 👦👧 Face recognition

Once the user selects this, we should access the webcam and display a square segment which will be used as input to recognize the face. After he is in a good position, he should be able to tap `capture` which will capture an image within the square and send it as an input to the model. The model returns the name of the user and the profile should be shown.

## 📄 Profile

The profile should contain the user's image, basic information. Once we complete the login part successfully, we can allow the users to send messages to classmates and view their profile.

## 💾 Update profile

The user gets to update their profile. But we need a password authorization to access the edit form.
If the user logged in using Face or Voice, he can fake the data as picture or voice recording. So we need password confirmation to edit the profile form. 

