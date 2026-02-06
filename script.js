score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        froggy = document.querySelector('.froggy');
        froggy.classList.add('animateFroggy');
        setTimeout(() => {
            froggy.classList.remove('animateFroggy')
        }, 700);
    }
    if (e.keyCode == 39) {
        froggy = document.querySelector('.froggy');
        froggyX = parseInt(window.getComputedStyle(froggy, null).getPropertyValue('left'));
        froggy.style.left = froggyX + 112 + "px";
    }
    if (e.keyCode == 37) {
        froggy = document.querySelector('.froggy');
        froggyX = parseInt(window.getComputedStyle(froggy, null).getPropertyValue('left'));
        froggy.style.left = (froggyX - 112) + "px";
    }
}


setInterval(() => {
    froggy = document.querySelector('.froggy');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    fx = parseInt(window.getComputedStyle(froggy, null).getPropertyValue('left'));
    fy = parseInt(window.getComputedStyle(froggy, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(fx - ox);
    offsetY = Math.abs(fy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX< 73 && offsetY< 52) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX< 145 && cross){
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation.duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + "s";
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}