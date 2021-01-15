import React, {Component} from 'react';
import Sketch from "react-p5";
const axios = require('axios');

let video;

class FaceLogin extends Component {

	constructor(props){
		super(props);
        this.state={

        }
	}

	setup(p5='') {
        p5.noCanvas();
        video = p5.createCapture(p5.VIDEO); 
        video.size(300,230);       
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
        //console.log(image64);
        const token = localStorage.getItem("studentid");
        const config = {
            headers:{
                "x-access-token":  token
            }
        }
        let url="http://localhost:5000/face_auth/face_sign_in";        
        
        const response = await axios.post(url, {'image64':image64}, config);
        console.log(response.data.success);
        
        if(response.data.success){
            this.stop();
            console.log(response.data.image);
            console.log(response.data.imagebody);
            alert('Face recognition successful, you are logged in')
            window.location.replace('/userDashboard')
        } else {
            this.stop();
            alert("Not a registered user!")
            //window.location.replace('')
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
export default FaceLogin;