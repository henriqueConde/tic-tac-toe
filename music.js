class MusicPlayer {
    state = {
        isPlaying: false,
    }

    constructor() {
        this.getRightFunc = this.getRightFunc.bind(this);
        this.renderMusicPlayer(this);
    }

    createEl(tag, attrObj = {}, eventsObj = {}) {
        const el = document.createElement(tag);

        Object.entries(attrObj).forEach(([attr, value]) => {
            el[attr] = value;
        })

        Object.entries(eventsObj).forEach(([eventType, func]) => {
            el.addEventListener(eventType, func);
        })

        return el;
    }

    renderMusicPlayer() {
        // Create music container
        const main = document.querySelector('#main');
        const musicContainer = this.createEl('aside', {
            className: 'music',
        })

        // Create audio tag
        const audio = this.createEl('audio', {
            className: 'music__audio',
            src: 'assets/dracula.mp3',
        })
        musicContainer.appendChild(audio);

        // Create cover img
        const musicImg = this.createEl('div', {
            className: 'music__img'
        })

        const imgCover = this.createEl('img', {
            className: 'music__cover music__cover--paused',
            src: 'assets/Dracula cover.png',
            alt: 'music-cover'
        });
        musicImg.appendChild(imgCover);
        musicContainer.appendChild(musicImg);

        // Create play/pause button
        const btn = this.createEl('button', {
            className: 'music__navigation__button',
        }, {
            click: this.getRightFunc,
        });

        const playIcon =  this.createEl('i', {
            className: 'fas fa-play',
            id: 'play-icon',
        });

        btn.appendChild(playIcon);
        musicContainer.appendChild(btn);

        // Append all
        main.appendChild(musicContainer);
    }

    getRightFunc() {
        if(this.state.isPlaying) {
            return this.pause()
        } else {
            return this.play()
        }
    }


    play() {
        this.state.isPlaying = true;
        const audio = document.querySelector('.music__audio');
        const playIcon = document.querySelector('#play-icon');
        const coverImg = document.querySelector('.music__cover');
        const playPromise = audio.play();
        if (playPromise !== undefined) {
                playPromise.then(() => {});
            }
        playIcon.classList.toggle('fa-pause');
        playIcon.classList.toggle('fa-play');
        coverImg.classList.toggle('music__cover--paused');
    }

    pause() {
        this.state.isPlaying = false;
        const audio = document.querySelector('.music__audio');
        const playIcon = document.querySelector('#play-icon');
        const coverImg = document.querySelector('.music__cover');
        const pausePromise = audio.pause();
        if (pausePromise !== undefined) {
                pausePromise.then(() => {});
            }
        playIcon.classList.toggle('fa-pause');
        playIcon.classList.toggle('fa-play');
        coverImg.classList.toggle('music__cover--paused');
    }
}

const musicPlayer = new MusicPlayer();

const playIcon = document.querySelector('#play-icon');
document.addEventListener('keyup', event => {
    const isFieldButton = event.target.classList.contains('field__button');
    if(event.code === 'Space' && playIcon.classList.contains('fa-play') && !isFieldButton) {
        musicPlayer.play();
    } else if (event.code === 'Space' && !isFieldButton) {
        musicPlayer.pause();
    }
})
