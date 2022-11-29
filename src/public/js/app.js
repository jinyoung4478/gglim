const socket = io();

const myFace = document.querySelector('#myFace');
const muteBtn = document.querySelector('#mute');
const cameraBtn = document.querySelector('#camera');
const camerasSelect = document.querySelector('#camerasSelect');

let myStream;
let muted = false;
let cameraOff = false;

async function getCamearas() {
   try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      console.log(myStream.getVideoTracks()); // 선택된 카메라가 뭔지 알 수 있음
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

async function handleCameraChange() {
   await getMedia(camerasSelect.value);
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);
