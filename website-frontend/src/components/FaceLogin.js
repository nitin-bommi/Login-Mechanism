import React, {Component} from 'react';
import Sketch from "react-p5";
const axios = require('axios');

let video;

class FaceLogin extends Component {

	constructor(props){
		super(props);
        this.state={
            tries: 0
        }
	}

	setup(p5='') {
        p5.noCanvas();
        video = p5.createCapture(p5.VIDEO); 
        video.size(500,400);       
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
        const token = localStorage.getItem("userid");
        const config = {
            headers:{
                "x-access-token":  token
            }
        }
        let url="http://localhost:8080/face_auth/face_sign_in";        
        
        const response = await axios.post(url, {'image64':image64}, config);
        console.log(response.data.success);
        
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
        
    }

	render(){
        let buttonname=(
            <div className="form-form-nobg">
                <button id="submit" className="create-account" onClick={this.handleSubmit} >
                    Login
                </button>
            </div>
        )
		let verify = (
            <div>
                <Sketch setup={this.setup} draw={this.draw}/>
                <div className="form-form-nobg">
                    <button id="submit" className="create-account" onClick={this.handleSubmit} >
                        Login
                    </button>
                </div>
                {/* {buttonname} */}
            </div>
        )
    	return (
            <div>
            {/* {verify} */}
            {/* {buttonname} */}
                <div>
                    <div className="form-form-nobg">
                        <Sketch setup={this.setup} draw={this.draw}/>

                        <button id="submit" className="create-account" onClick={this.handleSubmit} >
                            Login
                        </button>
                    </div>
                    {/* {buttonname} */}
                </div>
    		</div>
		)
	}
}
export default FaceLogin;