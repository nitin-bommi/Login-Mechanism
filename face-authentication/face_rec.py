import face_recognition
import os
import cv2
import numpy as np

def store_image(id, image_path):
    img = cv2.imread(image_path)
    os.remove(image_path)
    img_enc = face_recognition.face_encodings(img)[0]
    if img_enc == []:
        return False
    if not os.path.exists('encodings'):
        os.makedirs('encodings')
    np.save(f'encodings/{id}', np.array(img_enc))
    return True

def verify_image(id, image_path):
    try:
        face_encodings_for_id = np.load('encodings/'+id+'.npy', allow_pickle=True)
    except:
        print('No user with that id')
        return False
    img = cv2.imread(image_path)
    os.remove(image_path)
    try:
        img_enc = face_recognition.face_encodings(img)
        result = face_recognition.compare_faces(face_encodings_for_id, img_enc)
    except:
        return False
    return result
