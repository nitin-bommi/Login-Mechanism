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

@app.route('/face-authentication/app/hello', methods=["GET"])
def hello():
    print("Hello world")

@app.route("/signin", methods=['POST'])
def signin():
    img = request.args["image"]
    res = face_rec.Verification(img)
    print(res)
    return res

@app.route('/signup', methods=["POST"])
def signup():
    id = request.args["id"]
    print(id)
    res = face_rec.TakeImages(id)
    print(res)
    return res
    
if __name__ == '__main__':
    app.run(debug=True)