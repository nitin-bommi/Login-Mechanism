from flask import Flask
from flask import request
from flask import render_template
import base64
import json

import face_rec

app = Flask(__name__)

@app.route("/register", methods=['POST'])
def register():
    try:
        id = request.get_json()['id']
        img_data = request.get_json()['image64']
        counter = request.get_json()['counter']
        img_data = base64.b64decode(img_data[22:])
        res = face_rec.TakeImages(id, img_data, counter)
        print(res)
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
    except:
        return json.dumps({"status": 500})

@app.route('/verify', methods=["POST"])
def verify():
    id = request.get_json()['id']
    img_data = request.get_json()['image64']
    img_data = base64.b64decode(img_data[22:])
    res = face_rec.Verification(id, img_data)
    print(res)
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