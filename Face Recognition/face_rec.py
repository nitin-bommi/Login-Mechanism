import face_recognition
import os
import cv2
import numpy as np

harcascadePath = ".\cascade\haarcascade_frontalface_default.xml" 
# Creating the classier based on the haarcascade file. 
face_detector = cv2.CascadeClassifier(harcascadePath)  

# Function to capture images of users when registering/modifing
def TakeImages(Id):

    cam = cv2.VideoCapture(0, cv2.CAP_DSHOW)  
    face_encodings= []

    while True:

        ret, img = cam.read() 
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_enc = face_recognition.face_encodings(img)[0]

        print(img_enc)
        print(type(img_enc))

        if img_enc.size == 0:
            print("No face detected...")
            return 0

        if not os.path.exists('encodings'):
            os.makedirs('encodings')

        np.save('encodings/'+Id, img_enc)
        print('Encodings saved for ID : '+Id)
        cam.release()  
        cv2.destroyAllWindows()
        return 1


# For verifying user by giving Id.
def Verification(Id):

    capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    process_this_frame = True

    try:
        face_encodings_for_id = np.load('encodings/'+Id+'.npy',allow_pickle=True)
    except:
        print('No user with that id...')
        return 0

    while True:

        ret, img = capture.read()

        img = cv2.resize(img, (0, 0), fx=0.6, fy=0.6)

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Detect faces
        faces = face_detector.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(50, 50),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        for (x,y,w,h) in faces:
            encoding = face_recognition.face_encodings(rgb, [(y, x+w, y+h, x)])[0]
            if encoding.size == 0:
                print("No face detected...")
                return 0
            result = face_recognition.compare_faces([face_encodings_for_id], encoding, 0.3)[0]        
            print(result)
        
            if not result:
                print("Face did not match the user...")
                return 0

            print("Face recognized successfully...")
            return 1
        
def main():
    print("---------------------------------------------")
    print("Welcome")
    print("---------------------------------------------")
    while(True):
        print("1. Register\n2. Login\n3. Quit")
        n = int(input("Enter the option : "))
        if(n==1):
            Id = input("Enter your Id : ")
            print(TakeImages(Id))
        elif(n==2):
            Id = input("Enter your Id : ")
            print(Verification(Id))
        elif(n==3):
            break
        else:
            print("Invalid input")
        print("---------------------------------------------")

if __name__ == '__main__':
    main()