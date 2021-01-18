import React, {Component} from 'react';
import Sketch from "react-p5";
const axios = require('axios');

let video;

class FaceSignUp extends Component {

	constructor(props){
		super(props);
        this.state={
            counter: 0,
        }
	}

	setup(p5='',) {
        p5.noCanvas();
        video = p5.createCapture(p5.VIDEO);
        video.size(300, 230);        
    }

    stop(){
    	const tracks = document.querySelector("video").srcObject.getTracks();
		  	tracks.forEach(function(track) {
    				track.stop();
  			});
    }

    handleCapture = async e => {
        e.preventDefault();
    
        video.loadPixels();
        console.log(video.canvas);
        const image64 = video.canvas.toDataURL();
        //console.log(image64);
        const token = localStorage.getItem("studentid");
        const config = {
            headers:{
                "x-access-token":  token
            }
        }
        let url="http://localhost:8080/face_auth/face_sign_up";
        //let url="http://localhost:5000/signup";

        const response = await axios.post(url, {'image64':image64,'counter':this.state.counter}, config);
        console.log(response.data.success);
        
        if(response.data.success){
            console.log(response.data.image);
            this.setState({counter: this.state.counter + 1});
        } else {
            alert("Face not detected! Registration failed! Try Again!");
            //window.location.reload();
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.state.counter === 10){
            this.stop();
            alert("Face Registration Successful");
            window.location.replace('/options');
        }else{
            alert("Face Registration failed! Try Again!");
        }
    }

	render(){
        
		let verify = (
            <div>
                <Sketch setup={this.setup} draw={this.draw}/> 
                <p>We need ten images</p>
                <h1>{this.state.counter}</h1>
                <button id="capture" disabled={this.state.counter >= 10 ? true : false} onClick={this.handleCapture}> Capture Image</button>
                <button id="submit" disabled={this.state.counter === 10 ? false : true} onClick={this.handleSubmit}> Sign Up</button>
            </div>
		)
    	return (<div>
            {verify}
    		</div>
		)
	}
}
export default FaceSignUp;