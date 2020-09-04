const player = document.getElementById("player");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture");
const btn = document.getElementById("axios");
const constraints = {
	video: true,
};
async function test() {
	console.log("Entered");
	const model = await blazeface.load();
	//console.log(body.dataURI);
	// var img = func(body.dataURL);
	// console.log(img);
	// console.log(body.imageData.length);
	// console.log("From Test" + array.subarray(0, 10));
	const predictions = await model.estimateFaces(
		document.getElementById("photo"),
		false
	);
	if (predictions.length > 0) {
		/*
		`predictions` is an array of objects describing each detected face, for example:
	
		[
		  {
			topLeft: [232.28, 145.26],
			bottomRight: [449.75, 308.36],
			probability: [0.998],
			landmarks: [
			  [295.13, 177.64], // right eye
			  [382.32, 175.56], // left eye
			  [341.18, 205.03], // nose
			  [345.12, 250.61], // mouth
			  [252.76, 211.37], // right ear
			  [431.20, 204.93] // left ear
			]
		  }
		]
		*/

		for (let i = 0; i < predictions.length; i++) {
			const start = predictions[i].topLeft;
			const end = predictions[i].bottomRight;
			const size = [end[0] - start[0], end[1] - start[1]];
			console.log(predictions[i]);
			// Render a rectangle over each detected face.
			context.drawImage(photo, 0, 0, 400, 400);
			// console.log(context);
			context.fillStyle = "red";
			context.globalAlpha = 0.5;
			context.fillRect(start[0], start[1], size[0], size[1]);
		}
	}
	// console.log(predictions);
}
captureButton.addEventListener("click", async () => {
	context.drawImage(player, 0, 0, canvas.width, canvas.height);
	// console.log(canvas.toDataURL("image/png"));
	var dataURL = canvas.toDataURL("image/png");
	const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
	//console.log(imagedata);
	// tf.browser.fromPixels(imagedata).print();
	// console.log(imagedata.data);
	// const res = await axios.post("/authenticate", {
	// 	imageData: imagedata.data,
	// 	dataURL: dataURL,
	// 	width: canvas.width,
	// 	height: canvas.height,
	// });
	//console.log(res);
	// console.log(context.getImageData(0, 0, canvas.width, canvas.height));
	// Stop all video streams.

	player.srcObject.getVideoTracks().forEach((track) => track.stop());
});

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
	// Attach the video stream to the video element and autoplay.

	player.srcObject = stream;
});
test();
btn.addEventListener("click", () => {
	console.log("button clicked");
});
