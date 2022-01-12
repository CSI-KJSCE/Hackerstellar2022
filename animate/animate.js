
// DOM selectors
function SubmitForm(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var msg = document.getElementById('message').value;

    const data={
        name:name,
        email:email,
        subject:subject,
        message:msg
    };
    console.log(data);
    if(name.length!=0 && email.length!=0 && subject.length!=0){
        fetch("https://shreeconsultant.herokuapp.com/submit", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
        }).then(res => {
            document.getElementById("the_truth_value").style.display = "block";
            console.log("Request complete! response:", res);
        });
    }
    
};
window.onload = function () {
    document.getElementById("onload-show-header").style.display = "block";
};

const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');
const slider = document.querySelector(".slider");
document.body.style.zoom = 1.0
var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
document.body.style.msTransform =   scale;       // IE 9
document.body.style.transform = scale;     // General

// global variables
let screen, starsElements, starsParams = { speed: 2, number: 650, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider

slider.onmouseover = function() {
    console.log("mouse")
    starsParams.speed = 20;
};

slider.onmouseout = function() {
    console.log("Not hovering")
    starsParams.speed = 4;
};

// update stars on resize to keep them centered
window.onresize = function() {
    setupStars();
};

// star constructor
function Star() {
    this.x = Math.random() * stars.width;
    this.y = Math.random() * stars.height;
    this.z = Math.random() * stars.width;

    this.move = function() {
        this.z -= starsParams.speed;
        if (this.z <= 0) {
            this.z = stars.width;
        }
    };

    this.show = function() {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (stars.width / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (stars.width / this.z);
        y = y + screen.c[1];
        rad = stars.width / this.z;
        opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

        starsCtx.beginPath();
        starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        starsCtx.arc(x, y, rad-0.2, 0, Math.PI * 2);
        starsCtx.fill();
    }
}

// setup <canvas>, create all the starts
function setupStars() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
    window.cancelAnimationFrame(updateStars);
    stars.width = screen.w;
    stars.height = screen.h;
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}

// redraw the frame
function updateStars() {
    starsCtx.fillStyle = "#07031a";
    starsCtx.fillRect(0, 0, stars.width, stars.height);
    starsElements.forEach(function (s) {
        s.show();
        s.move();
    });

    window.requestAnimationFrame(updateStars);
}