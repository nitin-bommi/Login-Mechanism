import face_recognition
import os
import cv2
import numpy as np
from PIL import Image

def TakeImages(id, img_path, counter):
    img = cv2.imread(img_path)
    harcascadePath = ".\cascade\haarcascade_frontalface_default.xml" 
    detector = cv2.CascadeClassifier(harcascadePath)  
    faces = detector.detectMultiScale(img, 1.3, 5)
    face_encodings = []
    if len(faces) == 0:
        print("No face detected") 
        return False
    else:
        for (x, y, w, h) in faces:  
            image = img[y:y+h, x:x+w, :]
            cv2.imshow('frame', image)
            image = image[:, :, ::-1]
            encoding = face_recognition.face_encodings(image, known_face_locations=[(0, w, h, 0)])
            print(encoding)
            if encoding!=[]:
                face_encodings.append(encoding)
                if counter == 9:
                    if not os.path.exists('encodings'):
                        os.makedirs('encodings')
                    np.save(f'encodings/{id}', np.array(face_encodings))
                return True
            print("Encoding is empty")
            return False

def Verification(id, img_path):
    try:
        face_encodings_for_id = np.load('encodings/'+id+'.npy',allow_pickle=True)
    except:
        print('No user with that id')
        return False
    cnt = 0
    img = cv2.imread(img_path)
    """
    small_frame = cv2.resize(img, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(face_encodings_for_id, face_encoding)
        if(np.count_nonzero(matches)>6):
            print("Login Successful")
            return True
        else:
            print("Wrong face")
            return False
    if face_encodings==[]:
        print("No face recognized")
        return False
    """
    harcascadePath = ".\cascade\haarcascade_frontalface_default.xml" 
    detector = cv2.CascadeClassifier(harcascadePath)  
    faces = detector.detectMultiScale(img, 1.3, 5)
    if len(faces) == 0:
        print("No face detected") 
        return False
    else:
        for (x, y, w, h) in faces:  
            image = img[y:y+h, x:x+w, :]
            cv2.imshow('frame', image)
            image = image[:, :, ::-1]
            encoding = face_recognition.face_encodings(image, known_face_locations=[(0, w, h, 0)])
            if encoding != []:
                matches = face_recognition.compare_faces(face_encodings_for_id, encoding)
                if(np.count_nonzero(matches)>6):
                    print("Login Successful")
                    return True
                else:
                    print("Wrong face")
                    return False
            print("Encoding is empty")
            return False