const player = document.getElementById("player");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture");

const constraints = {
    video: true,
};

captureButton.addEventListener("click", () => {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    // console.log(canvas.toDataURL("image/png"));
    console.log(context.getImageData(0, 0, canvas.width, canvas.height));
    // Stop all video streams.
    player.srcObject.getVideoTracks().forEach((track) => track.stop());
});

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    // Attach the video stream to the video element and autoplay.


    player.srcObject = stream;
});