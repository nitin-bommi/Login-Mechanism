import React, {Component} from 'react';
import Webcam from 'react-webcam';
import {getUserRole} from '../utils';
const axios = require('axios');

class FaceRecognition extends Component {

	constructor(props){
		super(props);
        this.state={
            tries: 0,
            notLoggedIn: false
        }
	}

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    async componentDidMount(){
        const role = await getUserRole();
          if(role === "Student"){
              window.location.replace('/studentDashboard');
          }else if(role === "Professor"){
            window.location.replace('/professorDashboard');
        }else{
          this.setState({ notLoggedIn: true })
        }
    }



    stop(){
    	const tracks = document.querySelector("video").srcObject.getTracks();
		  	tracks.forEach(function(track) {
    				track.stop();
  			});
    }

    handleSubmit = async e=>{
        e.preventDefault();

        const image64 = this.webcam.getScreenshot();

        let url="http://localhost:8080/face_auth/";
        if(this.props.login){
            url=url+'face_sign_in';
        }else{
            url=url+'face_sign_up';
        }

        const response = await axios.post(url, {'image64':image64});
        console.log(response.data.success);
        if(this.props.login){
            if(response.data.success){
							//If token is not found in cookie and server throws an error
							//Then redirect to checkid page
							if(response.data.error === "token"){
								window.location.replace('/');
							}
                this.stop();
                console.log(response.data.image);
                console.log(response.data.imagebody);
                alert('Face recognition successful, you are logged in')
                if(response.data.result.role === 'Student')
                    window.location.replace('/studentDashboard')
                else
                    window.location.replace('/professorDashboard')
            } else {
                alert("Face not recognised! Try Again!");
                this.setState({tries: this.state.tries +1});
                if(this.state.tries === 3){
                    this.stop();
                    window.location.replace('/options');
                }
            }
        }else{
            if(response.data.success){
                console.log(response.data.image);
                this.stop();
                alert("Face Registration Successful");
                window.location.replace('/options');
            } else {
                alert("Face not detected! Registration failed! Try Again!");
                //window.location.reload();
            }
        }
    }

	render(){
        let notLoggedIn = this.state.notLoggedIn;

        const videoConstraints = {
            height: 320,
            width: 400,
            facingMode: 'user'
        }
        let loginbutton=(
            <div className="form-form-nobg">
                <button id="submit" className="create-account" onClick={this.handleSubmit} >
                    Login
                </button>
            </div>
        )
        let signupbutton=(
            <div className="form-form-nobg">
                <button id="submit" className="create-account" onClick={this.handleSubmit} >
                    Sign Up
                </button>
            </div>
        )

    	return (
            <div>
              { notLoggedIn ?
                <div>
                    <div className="camera">
                        <Webcam
                            audio={false}
                            height={320}
                            width={400}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </div>
                    <div>
                        { this.props.login ? loginbutton : signupbutton }
                    </div>
                </div>
              : 
                null
              }
    		</div>
		)
	}
}
export default FaceRecognition;
