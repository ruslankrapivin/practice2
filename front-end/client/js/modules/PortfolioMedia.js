export default class PortfolioMedia {
    constructor(){
        this.element = document.querySelector('.portfolio-section');
        this.videos = this.element.querySelectorAll('video');
    }

    togglePlay(videos){
        videos.forEach((video)=>{
            let playButton = video.nextElementSibling;
            playButton.addEventListener('click', function () {
                videos.forEach((otherVideo)=>{
                    otherVideo.pause();
                    otherVideo.nextElementSibling.classList.remove('hidden');
                });
                video.play();
                video.classList.add('playing');
                playButton.classList.add('hidden');
            });
            video.addEventListener('click', function () {
               video.pause();
               video.classList.remove('playing');
               playButton.classList.remove('hidden');
            })
        });
    }

    init(){
        this.togglePlay(this.videos)
    }
}