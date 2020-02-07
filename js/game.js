let images = ["./images/20.gif", "./images/30.gif", "./images/40.gif"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const urlParams = window.location.search;
let levelval = getSecondPart(urlParams);
let speed = 0;
let birdsArray = [];
class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
        // this.bird.classList.add("flip");
        this.bird.style.top = top + "px";
        this.bird.style.right = 0;
        // this.myInterval;
    }
    addtoParent = function () {
        var body = document.querySelector("body");
        body.appendChild(this.bird);
    }
    moveLeft = function () {

        //  let counter = 100;
        // this.bird.style.right = parseInt(this.bird.style.right) + counter + "px";
        //  this.bird.style.right = 10+"px";
        $(this.bird).animate({
            // right: "+=200"
            right: windowWidth
        }, 5000)
    }
    getRight = function () {
        return this.bird.style.right;

    }
    removeBird = function () {
        // $(".bird").hide();
        // var body = document.querySelector("body");
        // var myImg=document.querySelector(".bird")
        // console.log(myImg)
        // body.removeChild(myImg);
        // this.bird.style.display = "none";
    }
}

switch (levelval) {
    case "level1":
        speed = 2000;
        break;
    case "level2":
        speed = 200;
        break;

}
window.setInterval(function () {
    let topcount = 1;
    let birdsNumber = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i <= birdsNumber; i++) {
        let topp = Math.floor(Math.random() * (windowHeight - 200)) + (0);
        let birdObj = new Bird(topp + topcount, images[Math.floor(Math.random() * 3) + 0])
        birdObj.addtoParent();
        birdObj.moveLeft();
        birdsArray.push(birdObj);
        topcount += 20;

    }
    $("img:not(:first).bird").on("click", function () {
        // this.css(object);
        $(this).stop();
        $(this).attr("src", "images/die.png").fadeTo(2000);
        $(this).animate({ top: '450px', opacity: '0.8' }, 1500).hide(1000);
    });
}, speed);
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
    // for (let i = 0; i < birdsArray.length; i++) {
    //     if (parseInt(birdsArray[i].bird.style.right) == (windowWidth)) {
    //         birdsArray.splice(i, 1);
    //     }
    // }
    birdsArray.shift();
}, 50);

function getSecondPart(str) {
    return str.split('levels=')[1];
}
$(function(){
    
    $('*').css('cursor', 'url(images/images.png),auto');
});
