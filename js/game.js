let images = ["./images/20.gif", "./images/30.gif", "./images/40.gif"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const urlParams = window.location.search;
let levelval = getSecondPart(urlParams);
let userName = urlParams.split('=')[1].split('&')[0]
let speed = levelval == "level1" ? 7000 : 4000;
let birdsArray = [];
var bgSound;
var killSound;
var bombFire;
let killCount = 0;
let myInterval;
//esraa
class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        birdImg.setAttribute("draggable", "false")
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
        this.bird.style.top = top + "px";
        this.bird.style.right = 0;
        this.bird.style.left = "100%";
        this.myInterval;
    }
    addtoParent = function () {
        var body = document.querySelector("body");
        body.appendChild(this.bird);
    }
    moveLeft = function () {
        $(this.bird).animate({
            left: "-10%"
        }, speed, function () {
            this.remove();
        })
    }
}
//esraa
//class for sound
class sound {
    constructor(src, loopFalg) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.loop = loopFalg;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play = function () {
        this.sound.play();
    }
    stop = function () {
        this.sound.pause();
    }
}

function getSecondPart(str) {
    return str.split('levels=')[1];
}


$(function () {
    //esraa and Mahmoud
    let parsing = JSON.parse(localStorage.getItem(userName));
    $("h1 span:first").text(userName);
    $("h1 span:last").text(levelval);
    if (parsing.name == userName) {
        $(".score h2:last span").text(parsing.score)
    }

});
//Mahmoud
let startBtn = $("#welcome button")

startBtn.on("click", startgame);
function startgame() {
    $("span.playerScore").text("0");
    $("#welcome").addClass("out");
    setTimeout(() => {
        $(".caveMan").addClass("moving")
    }, 1000);
    this.blur()
    setTimeout(() => {
        clearInterval(myInterval);
        // https://stackoverflow.com/questions/42378426/sweetalert2-bind-another-event-to-cancel-button
        if (killCount > 20) {
            Swal.fire({
                title: 'success!',
                text: 'yes you did it ! wanna try again ? ',
                icon: 'success',
                confirmButtonText: 'lets play again',
                showCancelButton: true,
                allowOutsideClick: false
            }).then(function (result) {
                if (result.value) {
                    startBtn.trigger("click");
                } else if (result.dismiss == 'cancel') {
                    window.location.href = "index.html";
                }
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'sorry you lost :C. wanna try again ? ',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'ok !',
                allowOutsideClick: false
            }).then(function (result) {
                if (result.value) {
                    bgSound.stop();
                    startBtn.trigger("click");
                } else if (result.dismiss == 'cancel') {
                    window.location.href = "index.html";
                }
            });
        }
    }, 60000);

    let time = 0;
    //esraa
    bgSound = new sound("../sounds/bgmusic.mp3", true);
    killSound = new sound("../sounds/kill.mp3", false);
    bgSound.play();
    myInterval = window.setInterval(function () {
        time++;
        let birdsNumber = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i <= birdsNumber; i++) {
            let topp = Math.floor(Math.random() * (windowHeight - 200)) + (0);
            let birdObj = new Bird(topp + Math.floor(Math.random() * 10), images[Math.floor(Math.random() * 3) + 0])
            birdObj.addtoParent();
            birdObj.moveLeft();
            birdsArray.push(birdObj);
        }

        if (levelval == "level2") {
            bomb(time);
        }
        //Eslam
        $("img:not(:first).bird").on("click", function () {
            killSound.play();
            gameScore($(this).attr('src'));
            $(this).stop();
            $(this).attr("src", "images/die.png").fadeTo(2000);
            $(this).animate({
                top: '450px',
                opacity: '0.8'
            }, 1500).hide(1000);
        });
        $(function () {

            $('*').css('cursor', 'url(images/images.png),auto');
        });
        //Eslam
        function gameScore(score) {
            let currentScore = parseInt($("span.playerScore").text());

            switch (score) {
                case './images/20.gif':
                    currentScore = currentScore + 10;
                    $("span.playerScore").text(currentScore);
                    killCount++;
                    break;
                case './images/30.gif':
                    if (currentScore >= 10) {
                        currentScore = parseInt(currentScore) - 10;
                        $("span.playerScore").text(currentScore);
                    }
                    else if (currentScore == 5) {
                        $("span.playerScore").text("0");
                    }

                    break;
                case './images/40.gif':
                    currentScore = currentScore + 5;
                    $("span.playerScore").text(currentScore);
                    killCount++;
                    break;
            }
            localStorage.setItem(userName, JSON.stringify({
                name: userName,
                score: currentScore
            }));
        }
    }, 1000);
}
//Mahmoud
function bomb(time) {
    if (time % 5 == 0) {
        let bombContainer = $(`<div id="bomb" class="falling"></div>`);
        let bomb = $(`<img src="/images/ezgif.com-crop.gif" draggable="false">`);
        bombContainer.css("left", Math.floor(Math.random() * 100) + "%")
        bombContainer.append(bomb);
        $("body").append(bombContainer);
        setTimeout(function () { bombContainer.remove() }, 5000);
        bomb.on("click", function () {
            let leftValue = parseInt(bombContainer.css("left"));
            let topValue = parseInt(bombContainer.css("top"));
            bombFire = new sound("../sounds/bomb.mp3").play();
            $(this).attr("src", "/images/DarlingScholarlyDoe-small.gif");
            $(this).addClass("boom");
            for (i of birdsArray) {
                let birdleft = parseInt($(i.bird).css("left"));
                let birdtop = parseInt($(i.bird).css("top"));

                if (birdleft > leftValue && birdleft < leftValue + 350 &&
                    birdtop > topValue && birdtop < topValue + 350) {
                    console.log($(i));
                    $(i.bird).trigger("click");
                }
                bombContainer.css("top", topValue);
                bombContainer.removeClass("falling");
                setTimeout(() => {
                    $(this).hide(300)
                    setTimeout(() => { $(this).parent().remove() }, 500);
                }, 500);
            }
        })
    }
}