import React, {Component} from 'react';
import Sketch from "react-p5";
const axios = require('axios');

let video;

export class FaceRecognition extends Component {

	constructor(props){
		super(props);
		this.state = {
			verify : false,
		};
	}

	setup(p5='') {
        p5.noCanvas();
        video = p5.createCapture(p5.VIDEO);        
    }

    stop(){
    	const tracks = document.querySelector("video").srcObject.getTracks();
		  	tracks.forEach(function(track) {
    				track.stop();
  			});
    }

    handleSubmit= async e=>{
        e.preventDefault();
    
        video.loadPixels();
        console.log(video.canvas);
        const image64 = video.canvas.toDataURL();
        const token = localStorage.getItem("studentid");
        const config = {
            headers:{
                "x-access-token":  token
            }
        }
        let url="http://localhost:5000/face_auth/";
        if(this.state.verify){
            url=url+'face_sign_in'
        }else{
            url=url+'face_sign_up'
        }
        const response = await axios.post(url,config, {'image64':image64});
        console.log(response.data.success);
        if(this.state.verify){
            if(response.data.success){
                this.stop();
                window.location.replace('/userDashboard')
            } else {
                this.stop();
                alert("Not a registered user!")
                //window.location.replace('')
            }
        }else{
            if(response.data.success){
                this.stop();
                window.location.replace('/basicregister')
            } else {
                this.stop();
                alert("Registration failed!")
                //window.location.replace('')
            }
        }  
    }

	render(){
        let buttonname=(
            <div>
                <button id="submit" onClick={this.handleSubmit} >
                    Sign In
                </button>
            </div>
        )
        if(!this.state.verify){
            <div>
                <button id="submit" onClick={this.handleSubmit} >
                    Sign Up
                </button>
            </div>
            
        }

		let verify = (
            <div>
                <Sketch setup={this.setup} draw={this.draw}/>
                {buttonname}
            </div>
		)


    	return (<div>
            {verify}
    		</div>
		)
	}
}
export default FaceRecognition;