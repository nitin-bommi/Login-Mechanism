import React, {Component} from 'react';
import Webcam from 'react-webcam';
const axios = require('axios');

class FaceRecognition extends Component {

	constructor(props){
		super(props);
        this.state={
            tries: 0,
        }
	}

    setRef = (webcam) => {
        this.webcam = webcam;
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
        // console.log(image64);
        // console.log("Image length " + image64.length);
        const token = localStorage.getItem("userid");
        const config = {
            headers:{
                "x-access-token":  token
            }
        }
        let url="http://localhost:8080/face_auth/";
        if(this.props.login){
            url=url+'face_sign_in';
        }else{
            url=url+'face_sign_up';
        }
        
        const response = await axios.post(url, {'image64':image64}, config);
        console.log(response.data.success);
        if(this.props.login){
            if(response.data.success){
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
                    {/* {loginbutton} */}
                    { this.props.login ? loginbutton : signupbutton }
                
                    
                </div>
    		</div>
		)
	}
}
export default FaceRecognition;