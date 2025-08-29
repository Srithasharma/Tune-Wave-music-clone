console.log("Welcome to TuneWave");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songmusic1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let currentCover = document.getElementById('currentCover');

let songs = [
    {songName:"Paruvam Vanaga",filePath:"songmusic1.mp3",coverPath:"songpic1.jpg"},
    {songName:"Andangalena",filePath:"songmusic2.mp3",coverPath:"songpic2.jpg"},
    {songName:"Aamani",filePath:"songmusic3.mp3",coverPath:"songpic3.jpg"},
    {songName:"Nalonenena",filePath:"songmusic4.mp3",coverPath:"songpic4.jpg"},
    {songName:"Oo Cheliya",filePath:"songmusic5.mp3",coverPath:"songpic5.jpg"},
];

// Populate song list
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause master button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Progressbar.value = progress;
});

// Click on progress bar to seek
Progressbar.addEventListener('click', (e) => {
    const barWidth = e.target.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / barWidth) * audioElement.duration;
    audioElement.currentTime = newTime;
});


// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Update play/pause state for current song
const updateSongItemIcons = () => {
    makeAllPlays();
    if (!audioElement.paused) {
        let currentIcon = document.getElementsByClassName('songItemPlay')[songIndex];
        if (currentIcon) {
            currentIcon.classList.remove('fa-circle-play');
            currentIcon.classList.add('fa-circle-pause');
        }
        currentCover.src = songs[songIndex].coverPath;
    }
};

// Song item click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        Progressbar.value = 0; // Reset progress bar to start
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        updateSongItemIcons();
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    Progressbar.value = 0; // Reset
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateSongItemIcons();
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    Progressbar.value = 0; // Reset
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateSongItemIcons();
});





