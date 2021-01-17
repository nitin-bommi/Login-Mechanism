from flask import Flask
from flask import request
from flask import render_template

import face_rec

app = Flask(__name__)

"""
@app.route('/signin', methods=["GET"])
def hello_world():
    return render_template("login.html")
"""

"""
@app.route('/signup', methods=["GET"])
def signup():
    id = request.args["id"]
    return id
"""

@app.route('/hello', methods=["GET"])
def hello():
    print("Hello world")
    return "Nitin"

@app.route("/signin", methods=['GET'])
def signin():
    img = request.args["id"]
    res = face_rec.Verification(img)
    print(res)
    return str(res)

@app.route('/signup', methods=["GET"])
def signup():
    id = request.args["id"]
    print(id)
    res = face_rec.TakeImages(id)
    return str(res)