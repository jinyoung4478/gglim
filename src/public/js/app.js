const socket = io();

const myFace = document.querySelector('#myFace');
const muteBtn = document.querySelector('#mute');
const cameraBtn = document.querySelector('#camera');
const camerasSelect = document.querySelector('#camerasSelect');

const welcome = document.querySelector('#welcome');
const call = document.querySelector('#call');
const welcomeForm = document.querySelector('#welcomeForm');
const welcomeInput = document.querySelector('#welcomeInput');

const peerFace = document.querySelector('#peerFace');

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
let myDataChannel;

async function getCamearas() {
   try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      //console.log(myStream.getVideoTracks()); // 선택된 카메라가 뭔지 알 수 있음
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach(camera => {
         const option = document.createElement('option');
         option.value = camera.deviceId;
         option.innerText = camera.label;
         if (currentCamera.label === camera.label) {
            option.selected = true;
         }
         camerasSelect.append(option);
      });
   } catch (e) {
      console.log(e);
   }
}

async function getMedia(deviceId) {
   const initialConstraints = {
      audio: true,
      video: true,
   };
   const cameraConstraints = {
      audio: true,
      //video: { deviceId: id },
      video: { deviceId: { exact: deviceId } },
   };
   try {
      myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstraints);
      myFace.srcObject = myStream;
      if (!deviceId) {
         await getCamearas();
      }
   } catch (e) {
      console.log(e);
   }
}

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

async function handleCameraChange() {
   await getMedia(camerasSelect.value);
   if (myPeerConnection) {
      const videoTrack = myStream.getVideoTracks()[0]; // 나를 위한 트랙
      const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === 'video');
      videoSender.replaceTrack(videoTrack); // peer를 위한 트랙
   }
}

async function handleWelcomeSubmit(e) {
   e.preventDefault();
   await initCall();
   socket.emit('joinRoom', welcomeInput.value);
   roomName = welcomeInput.value;
   welcomeInput.value = '';
}

async function initCall() {
   welcome.hidden = true;
   call.hidden = false;
   await getMedia();
   makeConnection();
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

// sockets

socket.on('welcome', async () => {
   myDataChannel = myPeerConnection.createDataChannel('chat');
   myDataChannel.addEventListener('message', console.log);
   console.log('made data channel');

   const offer = await myPeerConnection.createOffer();
   myPeerConnection.setLocalDescription(offer);
   console.log('sent the offer');
   socket.emit('offer', offer, roomName);
});

socket.on('offer', async offer => {
   myPeerConnection.addEventListener('datachannel', event => {
      myDataChannel = event.channel;
      console.log(myDataChannel);
      myDataChannel.addEventListener('message', console.log);
   });

   console.log('receive the offer');
   myPeerConnection.setRemoteDescription(offer);
   const answer = await myPeerConnection.createAnswer();
   myPeerConnection.setLocalDescription(answer);
   console.log('sent the answer');
   socket.emit('answer', answer, roomName);
});

socket.on('answer', async answer => {
   console.log('receive the answer');
   myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', ice => {
   myPeerConnection.addIceCandidate(ice);
   console.log('received ice candidate');
});

// RTC
function makeConnection() {
   myPeerConnection = new RTCPeerConnection({
      iceServers: [
         {
            urls: 'stun:stun.l.google.com:19302',
         },
      ],
   });
   myPeerConnection.addEventListener('icecandidate', handleIce);
   myPeerConnection.addEventListener('addstream', handleAddStream);
   myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
   socket.emit('ice', data.candidate, roomName);
   console.log('sent ice candidate');
}

function handleAddStream(data) {
   console.log('got an stream from my peer');
   console.log(data.stream);
   console.log(myStream);
   peerFace.srcObject = data.stream;
}
