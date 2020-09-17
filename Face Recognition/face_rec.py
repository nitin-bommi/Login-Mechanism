import face_recognition
import os
import cv2
import numpy as np
import csv
from PIL import Image

# Function to capture images of users when registering/modifing
def TakeImages(Id):

    # Capturing the video
    cam = cv2.VideoCapture(0, cv2.CAP_DSHOW)  

    # Specifying the path to haarcascade file 
    harcascadePath = "D:\Projects\Personal-Cards\Face Recognition\cascade\haarcascade_frontalface_default.xml" 
    # Creating the classier based on the haarcascade file. 
    detector = cv2.CascadeClassifier(harcascadePath)  

    # Initializing the sample number(No. of images) as 0 
    sampleNum = 0

    # Making a dir for each user to store images.
    if not os.path.exists("Images/"+Id):
        os.makedirs("Images/"+Id)

    while(True): 
        # Reading the video captures by camera frame by frame 
        ret, img = cam.read() 
              
        # It converts the images in different sizes  
        # (decreases by 1.3 times) and 5 specifies the 
        # number of times scaling happens 
        faces = detector.detectMultiScale(img, 1.3, 5)

        print(faces)
        if faces==[]:
            print("No face detected") 
            
        else:
            # For creating a rectangle around the image 
            for (x, y, w, h) in faces:  
                # Specifying the coordinates of the image as well 
                # as color and thickness of the rectangle.        
                # incrementing sample number for each image 
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)  
                sampleNum = sampleNum + 1
                # saving the captured face in the dataset folder  
                # TrainingImage as the image needs to be trained  
                # are saved in this folder 
                cv2.imwrite("Images/"+Id+"/"+Id+"."+ str(sampleNum) + ".jpg", img[y:y + h, x:x + w, :]) 
                # display the frame that has been captured  
                # and drawn rectangle around it. 
                cv2.imshow('frame', img) 

        # wait for 100 miliseconds  
        if cv2.waitKey(100) & 0xFF == ord('q'): 
            break
        # break if the sample number is more than 15
        elif sampleNum>14: 
            break

    # releasing the resources 
    cam.release()  
    # closing all the windows 
    cv2.destroyAllWindows()
    # Displaying message for the user
    print("Images Saved for ID : " + Id)


# Function used to store encodings.. Should be used immediately after capturing images.
def StoreEncodings(Id):

    # Displaying message for the user
    print('Loading Faces of ID : '+Id)
    # Storing all the encodings of 15 faces captured for a user in a list
    face_encodings= []

    for filename in os.listdir('Images/'+Id):

        # Getting the image
        image = face_recognition.load_image_file('Images/'+Id+'/'+filename)
        # Finding the encodings
        encoding = face_recognition.face_encodings(image)[0]
        face_encodings.append(encoding)

    # Saving th encodings as .npy files using numpy
    np.save(f'encodings/{Id}', np.array(face_encodings))
    # Displaying message for the user
    print('Encodings saved for ID : '+Id)


# For verifying user by giving Id.
def Verification(Id):

    capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    process_this_frame = True

    # Getting the encodings for the given user.
    face_encodings_for_id = np.load('encodings/'+Id+'.npy')
    print(face_encodings_for_id.shape)

    # Maintaining a cnt for verifying few number of times.
    cnt = 0
    while True:
        # Grab a single frame of video
        ret, frame = capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(face_encodings_for_id, face_encoding)

                print(matches)
                # If cnt is equal to 15 then we give authentication.
                if(np.count_nonzero(matches)>10):
                    print("Login Successful")
                else:
                    print("Wrong face")
                process_this_frame = False
                # Release handle to the webcam
                capture.release()
                cv2.destroyAllWindows()
                return 

            if face_encodings==[]:
                print("No face recognized")
        
    

print("Welcome")
while(True):
    print("1. Register\n2. Login\n3. Quit")
    n = int(input("Enter the option : "))
    # Validation code must be written
    
    if(n==1):
        Id = input("Enter your Id : ")
        TakeImages(Id)
        StoreEncodings(Id)
    elif(n==2):
        Id = input("Enter your Id : ")
        Verification(Id)
    elif(n==3):
        break
    else:
        print("Invalid input")
    print("---------------------------------------------")