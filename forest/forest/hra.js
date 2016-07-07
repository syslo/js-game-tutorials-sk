const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* Kreslenie */

const farbaTravy = "#009900";
const farbaStromu = "#003300";
const farbaPna = "#663300";


function kresliTravu(x, y){
    ctx.fillStyle = farbaTravy;
    ctx.fillRect(x, y, 40, 40);
}


function kresliListnaty(x, y){
    kresliTravu(x, y);

    ctx.fillStyle = farbaPna;
    ctx.fillRect(x+15, y+20, 10, 18);

    ctx.beginPath();
    ctx.arc(x+20, y+18, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = farbaStromu;
    ctx.fill();
}

function kresliIhlicnaty(x, y){
    kresliTravu(x, y);

    ctx.fillStyle = farbaPna;
    ctx.fillRect(x+15, y+20, 10, 18);

    ctx.beginPath();
    ctx.moveTo(x+2, y+33);
    ctx.lineTo(x+20, y+3);
    ctx.lineTo(x+38, y+33);
    ctx.closePath();
    ctx.fillStyle = farbaStromu;
    ctx.fill();
}

/* Les */

let les = []

function kresliObjekt(typ, x, y) {
    if (typ === 'L') {
        kresliListnaty(x, y);
    } else if (typ === 'I') {
        kresliIhlicnaty(x, y);
    } else {
        kresliTravu(x, y);
    }
}

for(let y = 0; y < canvas.height; y+=40) {
    les[y/40] = [];
    for(let x = 0; x < canvas.width; x+=40) {
        if (Math.random() < 0.6) {
            if (Math.random() < 0.5) {
                les[y/40].push('I');
            } else {
                les[y/40].push('L');
            }
        } else {
            les[y/40].push('T');
        }
        kresliObjekt(les[y/40][x/40], x, y)
    }
}


/* Kurzor */

function kresliKurzor(x, y) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeRect(x+2, y+2, 36, 36);
}

let kurzorX = 0;
let kurzorY = 0;
kresliKurzor(0, 0)

function pohniKurzor() {
    kresliObjekt(les[kurzorY/40][kurzorX/40], kurzorX, kurzorY)
    kurzorX += 40
    if (kurzorX >= canvas.width) {
        kurzorX = 0
        kurzorY += 40
    }
    if (kurzorY >= canvas.height) {
        kurzorY = 0
    }
    kresliKurzor(kurzorX, kurzorY)
}

window.onkeydown = function(e) {
    if (e.keyCode === 65) {
        les[kurzorY/40][kurzorX/40] = 'L'
        pohniKurzor();
    }
    if (e.keyCode === 83) {
        les[kurzorY/40][kurzorX/40] = 'I'
        pohniKurzor();
    }
    if (e.keyCode === 68) {
        les[kurzorY/40][kurzorX/40] = 'T'
        pohniKurzor();
    }
    if (e.keyCode === 70) {
        pohniKurzor();
    }
}
