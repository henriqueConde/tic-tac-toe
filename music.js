class MusicPlayer {
    constructor() {
        this.renderMusicPlayer()
    }

    renderMusicPlayer() {
        // Create music container
        const main = document.querySelector('#main');
        const musicContainer = document.createElement('aside');
        musicContainer.classList.add('music');

        // Create audio tag
        const audio = document.createElement('audio');
        audio.classList.add('music__audio');
        audio.setAttribute('src', 'assets/dracula.mp3');
        musicContainer.appendChild(audio);

        // Create cover img
        const musicImg = document.createElement('div');
        musicImg.classList.add('music__img');
        const imgCover = document.createElement('img');
        imgCover.setAttribute('src', 'assets/Dracula cover.png');
        imgCover.setAttribute('alt', 'music-cover');
        imgCover.classList.add('music__cover');
        imgCover.classList.add('music__cover--paused');
        musicImg.appendChild(imgCover);
        musicContainer.appendChild(musicImg);

        // Create play/pause button
        const btn = document.createElement('button');
        btn.classList.add('music__navigation__button');
        const playIcon = document.createElement('i');
        playIcon.classList.add('fas');
        playIcon.classList.add('fa-play');
        playIcon.setAttribute('id', 'play-icon');
        btn.appendChild(playIcon);
        musicContainer.appendChild(btn);

        // Append all
        main.appendChild(musicContainer);
    }


    play() {
        const audio = document.querySelector('.music__audio');
        const playIcon = document.querySelector('#play-icon');
        const coverImg = document.querySelector('.music__cover');
        const playPromise = audio.play();
        if (playPromise !== undefined) {
                playPromise.then(() => {});
            }
        playIcon.classList.toggle('fa-play');
        playIcon.classList.toggle('fa-pause');
        coverImg.classList.toggle('music__cover--paused');
    }

    pause() {
        const audio = document.querySelector('.music__audio');
        const playIcon = document.querySelector('#play-icon');
        const coverImg = document.querySelector('.music__cover');
        const pausePromise = audio.pause();
        if (pausePromise !== undefined) {
                pausePromise.then(() => {});
            }
        playIcon.classList.toggle('fa-play');
        playIcon.classList.toggle('fa-pause');
        coverImg.classList.toggle('music__cover--paused');
    }
}

const musicPlayer = new MusicPlayer();
const playBtn = document.querySelector('.music__navigation__button');
playBtn.addEventListener('click', () => {
    const playIcon = document.querySelector('#play-icon');
    if(playIcon.classList.contains('fa-play')) {
        musicPlayer.play();
    } else {
        musicPlayer.pause();
    }
})