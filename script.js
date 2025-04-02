console.log("Welcome to Spotify");
//Initialise the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname= document.getElementById('mastersongname');
let songitems= Array.from(document.getElementsByClassName('songitem'));
let songitemplays = Array.from(document.getElementsByClassName('songitemplay'));

let songs = [
    {songName: "...Ready for It?", filePath: "songs/1.mp3", coverPath:"covers/1.png"},
    {songName: "End Game", filePath: "songs/2.mp3", coverPath:"covers/2.png"},
    {songName: "I Did Something Bad", filePath: "songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "Don't Blame Me", filePath: "songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Look What You Made Me Do ", filePath: "songs/5.mp3", coverPath:"covers/5.png"},
    {songName: "Delicate", filePath: "songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "So It Goes...", filePath: "songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName: "Gorgeous", filePath: "songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName: "Getaway Car", filePath: "songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName: "Call It What You Want", filePath: "songs/10.mp3", coverPath:"covers/10.jpg"},  

];

songitems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songitemplay")[0].setAttribute("data-index",i);
});

// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        updateUI(true);

    }
    else{
        audioElement.pause();
        updateUI(false);
    }

});

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{ 
    //update seekbar
    let progress= ((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
});

myprogressbar.addEventListener('input',()=>{
    let seekTime= (myprogressbar.value/100)*audioElement.duration;
    if(!isNaN(seekTime)){
        audioElement.currentTime = seekTime;

    }
    
});

const makeAllPlays = ()=>{
    songitemplays.forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        

    });

};

//Play song when clicking a song's play button
songitemplays.forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        if (songIndex === i && !audioElement.paused) {
            // If the same song is clicked again, toggle play/pause
            audioElement.pause();
            updateUI(false);
        } else {
            makeAllPlays(); // Reset all song buttons
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            mastersongname.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updateUI(true);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
        }
    });
});



document.getElementById('next').addEventListener('click',()=>{
    songIndex=(songIndex+1) % songs.length;
    // audioElement.src=songs[songIndex].filePath;
    // mastersongname.innerText=songs[songIndex].songName;
    // audioElement.currentTime=0;
    playSong(songIndex);
    // gif.style.opacity=1;
    // masterPlay.classList.remove('fa-circle-play');
    // masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click',()=>{
    songIndex=(songIndex-1+songs.length) % songs.length;
    playSong(songIndex);
    // audioElement.src=songs[songIndex].filePath;
    // mastersongname.innerText=songs[songIndex].songName;
    // audioElement.currentTime=0;
    // audioElement.play();
    // gif.style.opacity=1;
    // masterPlay.classList.remove('fa-circle-play');
    // masterPlay.classList.add('fa-circle-pause');
});

const updateUI = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
};

const playSong = (index) => {
    makeAllPlays();
    audioElement.src = songs[index].filePath;
    mastersongname.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUI(true);
    document.getElementById(index).classList.remove("fa-circle-play");
    document.getElementById(index).classList.add("fa-circle-pause");
};