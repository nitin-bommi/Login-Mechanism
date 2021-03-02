import face_recognition
import os
import cv2
import numpy as np

harcascadePath = ".\haarcascade_frontalface_default.xml" 
face_detector = cv2.CascadeClassifier(harcascadePath)

def store_image(id, image_path):

    img = cv2.imread(image_path)
    os.remove(image_path)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    img_enc = face_recognition.face_encodings(img)[0]

    if img_enc.size == 0:
        return False

    if not os.path.exists('encodings'):
        os.makedirs('encodings')

    np.save(f'encodings/{id}', np.array(img_enc))

    return True


def verify_image(id, image_path):

    tolerence = 0.3

    try:
        face_encodings_for_id = np.load('encodings/'+id+'.npy', allow_pickle=True)
    except:
        print('No user with that id')
        return False

    img = cv2.imread(image_path)
    os.remove(image_path)

    img = cv2.resize(img, (0, 0), fx=0.6, fy=0.6)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
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
            return False
        result = face_recognition.compare_faces([face_encodings_for_id], encoding, 0.3)[0]        
        print(result)
    
        if not result:
            print("Face did not match the user...")
            return False

        print("Face recognized successfully...")
        return True

    return result
