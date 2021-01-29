import face_recognition
import os
import cv2
import numpy as np
from PIL import Image

"""
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
"""

def read_img(path):
    img = cv2.imread(path)
    (h, w) = img.shape[:2]
    width = 400
    ratio = width / float(w)
    height = int(h * ratio)
    return cv2.resize(img, (width, height))

def store_image(id, image_path, counter):
    img = read_img(image_path)
    os.remove(img_path)
    img_enc = face_recognition.face_encodings(img)[0]
    if not os.path.exists('encodings'):
        os.makedirs('encodings')
    np.save(f'encodings/{id}', np.array(img_enc))

def verify_image(id, image_path):
    try:
        face_encodings_for_id = np.load('encodings/'+id+'.npy', allow_pickle=True)
    except:
        print('No user with that id')
        return False
    img = read_img(image_path)
    os.remove(img_path)
    img_enc = face_recognition.face_encodings(img)
    result = face_recognition.compare_faces(face_encodings_for_id, img_enc)
    print(result)
    return result
