from flask import Flask
from flask import request
import base64
import json
import os

import face_rec

app = Flask(__name__)

@app.route("/register", methods=['POST'])
def register():
    try:
        id = request.get_json()['id']
        img_data = request.get_json()['image64']
        counter = request.get_json()['counter']
        with open('images/'+id+'.jpg', "wb") as fh:
            fh.write(base64.b64decode(img_data[22:]))
        img_path = 'images/'+id+'.jpg'
        res = face_rec.store_image(id, img_path, counter)
        os.remove(img_path)
        if res:
            return json.dumps({
                "status": 200,
                "success": True,
                "message": "Image successfully registered."
            })
        else:
            return json.dumps({
                "status": 200,
                "success": False,
                "message": "Image is invalid, must contain a face."
            })
    except Exception as e:
        print(e)
        return json.dumps({"status": 500})

@app.route('/verify', methods=["POST"])
def verify():
    id = request.get_json()['id']
    img_data = request.get_json()['image64']
    with open('images/'+id+'.jpg', "wb") as fh:
        fh.write(base64.b64decode(img_data[22:]))
    img_path = 'images/'+id+'.jpg'
    res = face_rec.verify_image(id, img_path)
    os.remove(img_path)
    if res:
        return json.dumps({
            "status": 200,
            "success": True,
            "message": "Face has been verified."
        })
    else:
        return json.dumps({
            "status": 200,
            "success": False,
            "message": "Face not found, please try again."
        })
    return json.dumps({"status": 500})
