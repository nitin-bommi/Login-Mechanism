from flask import Flask
from flask import request
from flask import render_template

import face_rec

app = Flask(__name__)


@app.route('/signin', methods=["GET"])
def hello_world():
    return render_template("login.html")


@app.route('/signup', methods=["GET"])
def signupget():
    return render_template("signup.html")


@app.route("/signin", methods=['POST'])
def signin():
    img = request.args["image"]
    res = face_rec.Verification(img)
    if (res):
        return render_template("home.html")
    else:
        return render_template("login_error.html")


@app.route('/signup', methods=["POST"])
def signup():
    id = request.args["id"]
    res = face_rec.TakeImages(id)
    if (res):
        return render_template("login.html")
    else:
        return render_template("signup_erro.html")
