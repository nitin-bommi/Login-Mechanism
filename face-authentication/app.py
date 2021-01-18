from flask import Flask
from flask import request
from flask import render_template
import base64

import face_rec

app = Flask(__name__)

@app.route("/register", methods=['POST'])
def register():
    try:
        id = request.get_json()['id']
        img_data = request.get_json()['image64']
        counter = request.get_json()['counter']
        img_data = base64.b64decode(image_data[22:])
        res = face_rec.TakeImages(id, img_data, counter)
        if res:
            return json.dumps({"status": 200})
        return json.dumps({"status": 500})
    except:
        return json.dumps({"status": 500})

@app.route('/verify', methods=["POST"])
def verify():
    id = request.get_json()['id']
    img_data = request.get_json()['image64']
    img_data = base64.b64decode(image_data[22:])
    res = face_rec.TakeImages(id, img_data)
    if res:
        return json.dumps({"status": 200})
    return json.dumps({"status": 500})