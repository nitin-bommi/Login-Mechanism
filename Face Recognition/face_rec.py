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
    # List to store image encodings
    face_encodings= []
    # Specifying the path to haarcascade file 
    harcascadePath = ".\cascade\haarcascade_frontalface_default.xml" 
    # Creating the classier based on the haarcascade file. 
    detector = cv2.CascadeClassifier(harcascadePath)  

    # Initializing the sample number(No. of images) as 0 
    sampleNum = 0

    while(True): 
        # Reading the video captures by camera frame by frame 
        ret, img = cam.read() 
              
        # It converts the images in different sizes  
        # (decreases by 1.3 times) and 5 specifies the 
        # number of times scaling happens 
        faces = detector.detectMultiScale(img, 1.3, 5)

        if len(faces) == 0:
            print("No face detected") 
            
        else:
            # For creating a rectangle around the image 
            for (x, y, w, h) in faces:  
                # Specifying the coordinates of the image as well
                # as color and thickness of the rectangle.       
                # incrementing sample number for each image
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)  
                
                # saving the captured face in the dataset folder
                # TrainingImage as the image needs to be trained  
                # are saved in this folder
                image = img[y:y + h, x:x + w, :]
                encoding = face_recognition.face_encodings(image)
                if encoding!=[]:
                    face_encodings.append(encoding)
                    sampleNum = sampleNum + 1
                # display the frame that has been captured  
                # and drawn rectangle around it. 
                cv2.imshow('frame', img) 

        # wait for 100 miliseconds  
        if cv2.waitKey(100) & 0xFF == ord('q'): 
            break
        # break if the sample number is more than 15
        elif sampleNum>19: 
            break

    if not os.path.exists('encodings'):
        os.makedirs('encodings')

    # Saving th encodings as .npy files using numpy
    np.save(f'encodings/{Id}', np.array(face_encodings))
    # Displaying message for the user
    print('Encodings saved for ID : '+Id)
    # releasing the resources 
    cam.release()  
    # closing all the windows 
    cv2.destroyAllWindows()


# For verifying user by giving Id.
def Verification(Id):

    capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    process_this_frame = True

    # Getting the encodings for the given user.
    try:
        face_encodings_for_id = np.load('encodings/'+Id+'.npy',allow_pickle=True)
    except:
        print('No user with that id')
        main()

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
        
def main():
    print("---------------------------------------------")
    print("Welcome")
    print("---------------------------------------------")
    while(True):
        print("1. Register\n2. Login\n3. Quit")
        n = int(input("Enter the option : "))
        # Validation code must be written
        
        if(n==1):
            Id = input("Enter your Id : ")
            TakeImages(Id)
        elif(n==2):
            Id = input("Enter your Id : ")
            Verification(Id)
        elif(n==3):
            break
        else:
            print("Invalid input")
        print("---------------------------------------------")

if __name__ == '__main__':
    main()