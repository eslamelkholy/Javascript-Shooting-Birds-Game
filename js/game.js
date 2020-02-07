let images = ["./images/20.gif", "./images/30.gif", "./images/40.gif"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const urlParams = window.location.search;
let levelval = getSecondPart(urlParams);
let speed = 0;
let birdsArray = [];
/* <div id="bomb">
    <img src="/images/ezgif.com-crop.gif" alt="">
</div> */

class Bird {
    constructor(top, src) {
        let birdImg = document.createElement("img");
        this.bird = birdImg;
        this.bird.src = src;
        this.bird.classList.add("bird");
        // this.bird.classList.add("flip");
        this.bird.style.top = top + "px";
        this.bird.style.right = 0;
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
    // for (let i = 0; i < birdsArray.length; i++) {
    //     if (parseInt(birdsArray[i].bird.style.right) == (windowWidth)) {
    //         birdsArray.splice(i, 1);
    //     }
    // }
    // console.log(birdsArray.length);
    birdsArray.shift();
    // console.log(birdsArray.length);
}, 50);

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

startBtn.on("click",function() { $("#welcome").addClass("out"); this.blur() })
startBtn.on("click",startgame);

function startgame() {
    let time=0;
    window.setInterval(function () {
        let topcount = 1;
        time++;
        
        let birdsNumber = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i <= birdsNumber; i++) {
            let topp = Math.floor(Math.random() * (windowHeight - 200)) + (0);
            let birdObj = new Bird(topp + topcount, images[Math.floor(Math.random() * 3) + 0])
            birdObj.addtoParent();
            birdObj.moveLeft();
            birdsArray.push(birdObj);
            topcount += 20;
        }

        if(time % 5==0){ 
            let bombContainer = $(`<div id="bomb" class="falling"></div>`);
            myBomb = bombContainer;
            let bomb = $(`<img src="/images/ezgif.com-crop.gif">`);
            bombContainer.css("left",Math.floor(Math.random()*100)+"%")
            // bomb.attr("src","");
            // bomb.removeClass("boom");

            bombContainer.append(bomb);           
            $("body").append(bombContainer);
            setTimeout(function(){
                bombContainer.remove();
            }, 5000);

            bomb.on("click",function() {

                $(this).attr("src","/images/DarlingScholarlyDoe-small.gif");
                $(this).addClass("boom");
                
                bombContainer.css("top",bombContainer.css("top"));
                bombContainer.removeClass("falling");
                setTimeout(() => {
                    $(this).hide(300)
                    setTimeout(() => {
                        $(this).parent().remove();
                    }, 500);
                }, 500);
            })
        }
        
        $("img:not(:first).bird").on("click", function () {
            // this.css(object);
            $(this).attr("src", "images/die.png").fadeTo(2000);
            $(this).animate({ top: '350px', opacity: '0.8' }, 1500).hide(1000);
        });
    
    
    }, speed);

    

}
