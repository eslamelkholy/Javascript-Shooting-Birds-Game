let images = ["./images/20.gif", "./images/30.gif", "./images/40.gif"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const urlParams = window.location.search;
<<<<<<< HEAD
let levelval = localStorage.getItem("level");
let speed = 0;
let birdsArray = [];
/* <div id="bomb">
    <img src="/images/ezgif.com-crop.gif" alt="">
</div> */

class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        birdImg.setAttribute('draggable', false);
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
        // this.bird.classList.add("flip");
=======
let levelval = getSecondPart(urlParams);
let speed = 0;
let birdsArray = [];
class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
>>>>>>> eec9f2bf1ad4f07a8a480843a70755e97234a6a8
        this.bird.style.top = top + "px";
        this.bird.style.left = "100%";
        this.myInterval;
    }
    addtoParent = function () {
        var body = document.querySelector("body");
        body.appendChild(this.bird);
    }
    moveLeft = function () {

        let counter = 100;
        this.bird.style.right = parseInt(this.bird.style.right) + counter + "px";
        //  this.bird.style.right = 10+"px";
        $(this.bird).animate({
<<<<<<< HEAD
            // right: "+=200"
            left: "-10%"
        }, 5000)
=======
            left: "-10%"
        }, speed, function () {
            $(this).remove()

        })
>>>>>>> eec9f2bf1ad4f07a8a480843a70755e97234a6a8



    }
    getRight = function () {
        return this.bird.style.right;

    }
<<<<<<< HEAD
    removeBird = function () {
        // $(".bird").hide();
        // var body = document.querySelector("body");
        // var myImg=document.querySelector(".bird")
        // console.log(myImg)
        // body.removeChild(myImg);
        // this.bird.style.display = "none";


    }
=======
>>>>>>> eec9f2bf1ad4f07a8a480843a70755e97234a6a8
}

switch (levelval) {
    case "level1":
<<<<<<< HEAD
        speed = 2000;
        break;
    case "level2":
        speed = 1000;
        break;

}

//moving birds
// window.setInterval(function () {
//     for (let i = 0; i < birdsArray.length; i++) {
//         birdsArray[i].moveLeft();
//         // let counter = 100;
//         // birdsArray[i].style.right = parseInt(this.bird.style.right) + counter + "px";
//     }

// }, 1000)
//code for removing newly created objects
window.setInterval(function () {
    for (let i = 0; i < birdsArray.length; i++) {
        if (parseInt(birdsArray[i].bird.style.right) == (windowWidth)) {
            // $(birdsArray[i].bird).remove();
            // console.log($(birdsArray[i]));
            birdsArray.splice(birdsArray[i]);
        }
    }

    // console.log(birdsArray.length);
    // birdsArray.shift();
    // console.log(birdsArray.length);
}, 1500);
=======
        speed = 7000;
        break;
    case "level2":
        speed = 4000;
        break;
}


//code for removing newly created objects
// window.setInterval(function () {
//     for (let i = 0; i < birdsArray.length; i++) {
//         birdsArray.shift();
//     }
// }, 50);
>>>>>>> eec9f2bf1ad4f07a8a480843a70755e97234a6a8

function getSecondPart(str) {
    return str.split('levels=')[1];
}


$(function () {
    // sending name/level over localStorage
    $("h1 span:first").text(localStorage.getItem("name"))
    $("h1 span:last").text(localStorage.getItem("level"))
    // ends here
});

let startBtn = $("#welcome button")
startBtn.on("click", function () {
    $("#welcome").addClass("out");
    this.blur()
})
startBtn.on("click", startgame);
function startgame() {
    let time = 0;
    window.setInterval(function () {
        let topcount = 1;
        time++;

        let birdsNumber = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i <= birdsNumber; i++) {
            let topp = Math.floor(Math.random() * (windowHeight - 200)) + (0);
            let birdObj = new Bird(topp + Math.floor(Math.random()*10), images[Math.floor(Math.random() * 3) + 0])
            birdObj.addtoParent();
            birdObj.moveLeft();
            birdsArray.push(birdObj);
            topcount += 20;
        }

        if (levelval == "level2")
            if (time % 5 == 0) {
                let bombContainer = $(`<div id="bomb" class="falling" draggable="false"></div>`);
                myBomb = bombContainer;
                let bomb = $(`<img src="/images/ezgif.com-crop.gif">`);
                bombContainer.css("left", Math.floor(Math.random() * 100) + "%")
                // bomb.attr("src","");
                // bomb.removeClass("boom");

                bombContainer.append(bomb);
                $("body").append(bombContainer);
                setTimeout(function () {
                    bombContainer.remove();
                }, 5000);

                bomb.on("click", function () {
                    $(this).attr("src", "/images/DarlingScholarlyDoe-small.gif");
                    $(this).addClass("boom");

                    let leftValue = parseInt(bombContainer.css("left"));
                    let topValue = parseInt(bombContainer.css("top"));
                    // console.log("left ",leftValue ," top ", topValue);
                    // console.log(birdsArray);

                    for (i of birdsArray) {
                        // console.log($(i.bird).css("right"));

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
                            setTimeout(() => {
                                $(this).parent().remove();
                            }, 500);
                        }, 500);
                    }
                })
            }

        $("img:not(:first).bird").on("click", function () {
            // this.css(object);
            $(this).attr("src", "images/die.png").fadeTo(2000);
            $(this).animate({
                top: '350px',
                opacity: '0.8'
            }, 1500).hide(1000);
        });


    }, 1000);



}



