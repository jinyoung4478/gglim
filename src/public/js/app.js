const socket = io();

const myFace = document.querySelector('#myFace');
const muteBtn = document.querySelector('#mute');
const cameraBtn = document.querySelector('#camera');

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
   try {
      myStream = await navigator.mediaDevices.getUserMedia({
         audio: true,
         video: true,
      });
      myFace.srcObject = myStream;
   } catch (e) {
      console.log(e);
   }
}

getMedia();

function handleMuteClick() {
   myStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
   if (!muted) {
      muteBtn.innerText = 'Unmute';
      muted = true;
   } else {
      muteBtn.innerText = 'Mute';
      muted = false;
   }
}
function handleCameraClick() {
   myStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
   if (cameraOff) {
      cameraBtn.innerText = 'Turn Camera On';
   } else {
      cameraBtn.innerText = 'Turn Camera Off';
   }
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
