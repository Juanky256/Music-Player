const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Variables for changing the song
const image = document.querySelector('img');
const title = document.getElementById("title");
const artist = document.getElementById("artist");

//Progress bar
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");

//Time elements
const current = document.getElementById("current-time");
const durationTime = document.getElementById("duration");

//Music 
const songs = [
    {
        name: "savannah",
        displayName: "Savannah",
        artist: "Diviners"
    },
    {
        name: "link",
        displayName: "Link",
        artist: "Jim Yosef"
    },
    {
        name: "tropic",
        displayName: "Tropic Love",
        artist: "Diviners feat. Contracreast"
    },
    {
        name: "eclipse",
        displayName: "Eclipse",
        artist: "Jim Yosef"
    },
    
];

//Check if Playing
function isPlaying(music) { 
    return !music.paused; 
}

//Play or pause
function Toggle() {
    if (!isPlaying(music)) {
        playSong();
    }
    else {
        pauseSong();
    }
}

//Play song
function playSong() {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

//Pause song
function pauseSong() {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

//Play or pause event listener
playBtn.addEventListener("click", Toggle);

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current song
let currentSong = 0;

//Get to previous song
function prevSong() {
    if (currentSong == 0) {
        currentSong = songs.length-1;
    } 
    else {
        currentSong--;
    }
    console.log(currentSong);
    loadSong(songs[currentSong]);
    playSong();
}

//Next song
function nextSong() {
    if (currentSong == songs.length-1) {
        currentSong = 0;
    } 
    else {
        currentSong++;
    }
    loadSong(songs[currentSong]);
    playSong();
}

//Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//Update progress bar
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.target;
        //Update progress bar
        const progressPercent = (currentTime/ duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        //Calculate the display for the duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //Delay switching duration of Element to avoid NaN
        if (durationSeconds) {
            durationTime.textContent = `${durationMinutes}: ${durationSeconds}`;
        }

        //Calculate the display for the current time
        let minutes = Math.floor(currentTime/60);
        let seconds = Math.floor(currentTime % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        current.textContent = `${minutes}: ${seconds}`;

    }
}

//Change progress Bar
music.addEventListener("timeupdate", updateProgressBar);

//Change bar depending on clicks
function setProgressBar(event) {
    let width = this.clientWidth;
    let offsX = event.offsetX;
    let percent = offsX/width;
    const { duration } = music;
    let placeInSong = percent * duration;
    music.currentTime = Math.floor(placeInSong);
}

//Check for clicks in progress bar
progressContainer.addEventListener("click", setProgressBar);

//Move to next song
function moveToNext() {
    if (currentSong == songs.length-1){
        currentSong = 0;
        loadSong(songs[currentSong]);
        playSong();
    }
    else {
        currentSong++;
        loadSong(songs[currentSong]);
        playSong();
    }
}

//Check if song has ended
music.addEventListener("ended", moveToNext);