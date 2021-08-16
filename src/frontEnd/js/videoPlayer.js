const video = document.querySelector("video")
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoController = document.getElementById("videoController");

let timeOutId = null;
let mouseStopTimeId = null;

const handlePlay = (e) => {
    video.paused ? video.play() : video.pause();
    playBtn.innerText = video.paused ? "Pause" : "Play";
}
const handlePlayBtn = () => { playBtn.innerText = "play"; }
const handlePauseBtn = () => {playBtn.innerText = "pause"; }

const handleMute = (e)=>{
    video.muted ? video.muted = false :  video.muted = true ;
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volume.value = video.muted ? 0 : 0.5;
}

const handleVolume = (event) => {
    const { target : {value}} = event;
    video.volume = value;
    muteBtn.innerText = video.volume === 0 ? "Unmute" : "Mute";
}

const formatTime = (seconds) => new Date(seconds*1000).toISOString().substr(14,5);

const handleLoadedData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration)); 
}

const handleTimeUpate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
}

const handleFullScreen = () => {
    if(document.fullscreenElement){
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    }else{
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
}
const hideControls = () =>  videoController.classList.remove("showing");

const handleMouseMove = () => {
    if(timeOutId){
        clearTimeout(timeOutId);
        timeOutId = null;
    }
    if(mouseStopTimeId){
        clearTimeout(mouseStopTimeId);
        mouseStopTimeId = null;
    }
    mouseStopTimeId = setTimeout(hideControls,3000);
    videoController.classList.add("showing");
}

const handleMouseLeave = () => {
    timeOutId = setTimeout(hideControls,3000);
}


playBtn.addEventListener("click", handlePlay)
video.addEventListener("pause", handlePlayBtn)
video.addEventListener("play", handlePauseBtn)
muteBtn.addEventListener("click", handleMute)
volume.addEventListener("input",handleVolume)
video.addEventListener("loadeddata", handleLoadedData);
video.addEventListener("timeupdate",handleTimeUpate);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove",handleMouseMove);
video.addEventListener("mouseleave",handleMouseLeave);