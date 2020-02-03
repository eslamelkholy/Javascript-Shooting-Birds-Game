let images = ["./images/login.jpg", "./images/images.jfif"]
class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
        // console.log(this.bird);

        this.bird.style.top = top + "px";

    }
    addtoParent = function () {
        var body = document.querySelector("body");
        body.appendChild(this.bird);

    }
    moveLeft = function () {
        $(this.bird).animate({
            right: "+=800"
        }, 2000)
        console.log(this.bird.style.right)
        if (parseInt(this.bird.style.right) ==920){
            console.log("hello");
            $(".bird").hide();
            this.bird.style.display="none";
        }
    }
    getRight = function () {
        return this.bird.style.right;
    }
    removeBird=function () {
        // $(".bird").hide();
        // var body = document.querySelector("body");
        // var myImg=document.querySelector(".bird")
        // console.log(myImg)
        // body.removeChild(myImg);
        this.bird.style.display="none";

    }
}


window.setInterval(function () {
    let topp = Math.floor(Math.random() * 676) + 156;
    let birdObj = new Bird(topp, images[Math.floor(Math.random() * 1) + 0])
    birdObj.addtoParent();
    birdObj.moveLeft();
    // console.log(birdObj.getRight())
    if (parseInt(birdObj.getRight()) ==120){
        // console.log("hello");
        // birdObj.removeBird();
    }
}, 2000)
