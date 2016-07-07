# Základy programovania - Hra Forest

## Úvod

Stiahneme si `basic` šablónu, otvoríme `stranka.html` v prehliadači a spustíme konzolu.
V konzole si postupne prejdeme:
  * základné matematické výrazy
  * premenné a konštanty
  * stringy, zreťazenie

```javascript
/* Matematika */
17+5
17*5
17-5
17/5
17%5
Math.floor(17/5)
5*5+9*(3-6)+2
// Math. spustí v konozle autocomplete :)
```

```javascript
/* Premenné */
let x = 6
x
x*(x+1)/2
x = 7
x = x + 1
x += 3

/* Konštanty */
const y = 5
y
x+y
y = 4 // Chyba
```

```javascript
/* Reťazce */
"Ahoj"
let s = "Janko"
"Ahoj" + s
"Ahoj" + 47
s[2]
s[7]
("Ahoj " + s)[7]
s[2][0][0][0] //...
```

## Kreslenie

Kreslíme v konzole pomocou objektu `ctx`. (Môžete skúšať nové veci cez autocomplete.)
Máme k dispozícii canvas veľkosti 800x600 px, začiatok je klasicky vľavo hore.
Rozlišuje sa medzi vyplnením `fill` a čiarou `stroke`, majú zvlášť farbu.

Všetko okrem obdĺždnikov kreslíme tak, že najskôr zadefinujeme cestu z čiar a oblúkov
a potom ju naraz nakreslíme / vyplníme.


```javascript
/* Obdĺždnik */

ctx.fillStyle = "red"
ctx.fillRect(100, 200, 200, 300)

ctx.strokeStyle = "#00ff00"
ctx.lineWidth = 10
ctx.strokeRect(100, 200, 200, 300)

/* Oblúk */

ctx.beginPath()
ctx.arc(200, 200, 150, 0.25 * Math.PI, 1.75 * Math.PI);
ctx.stroke()
ctx.fillStyle = "yellow"
ctx.fill()

/* Polygón */

ctx.beginPath()
ctx.moveTo(400, 100)
ctx.lineTo(450, 300)
ctx.lineTo(400, 500)
ctx.lineTo(600, 450)
ctx.lineTo(550, 300)
ctx.stroke()

ctx.fill()

ctx.lineTo(550, 150)
ctx.closePath()
ctx.strokeStyle = "blue"
ctx.lineWidth = 5
ctx.stroke()
```

## Editor

Zistíme, že príkazy by sme mohli mať niekde uložené.
Stiahneme a vysvetlíme si, čo je to editor.
Otvoríme a upravíme súbor `hra.js`. Už sú tam dva riadky, ktoré vytvárajú `ctx` objekt.

```javascript
const canvas = document.getElementById("game"); // Nechytáme
const ctx = canvas.getContext("2d"); // Nechytáme

console.log('Vitaj programátor!'); // Môže sa hodiť :)

// Tu píšte čokoľvek ...
```

## Strom

Chceme les. Najskôr ale potrebujeme strom. Nakreslíme trávnatú plochu 40x40 px a do jej stredu strom.

```javascript
// Tráva
ctx.fillStyle = "#009900";
ctx.fillRect(x, y, 40, 40);

// Peň
ctx.fillStyle = "#663300";
ctx.fillRect(x+15, y+20, 10, 18);

// Koruna
ctx.beginPath();
ctx.arc(x+20, y+18, 15, 0, 2 * Math.PI, false);
ctx.fillStyle = "#003300";
ctx.fill();
```

## Päť stromov

Takých istých. V rade vedľa seba. Ten kód sa nám nejako opakuje :/

```javascript
/*
Toto sem písať nebudem ...
*/
```

## Funkcie

Pri piatich stromoch sme robili ten istý kód stále odznova, menenili sa nám len súradnice.
Predsatvíme deťom koncept funkcie - vytvorenia nového príkazu, s parametrami `x` a `y`.
Funkciu môžeme testujeme v konzole. Vieme pridať ďalšie parametre - farba, veľkosť ...

```javascript
function kresliTravu(x, y){
    ctx.fillStyle = "#009900";
    ctx.fillRect(x, y, 40, 40);
}

function kresliStrom(x, y, farba = "#003300"){
    kresliTravu(x, y);

    ctx.fillStyle = "#663300";
    ctx.fillRect(x+15, y+20, 10, 18);

    ctx.beginPath();
    ctx.arc(x+20, y+18, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = farba;
    ctx.fill();
}
```

## Cykly

Postupne kreslíme:
  * 1D: rad, stĺpec, uhlopriečka, opačná uhlopriečka
  * 2D: celá plocha, trojuholníky
Hurá! Máme les!

```javascript
for(let y = 0; y < canvas.height; y+=40) {
    for(let x = 0; x < canvas.width; x+=40) {
        kresliStrom(x, y);
    }
}
```

## Podmienky

Čo ak by sme chceli vynechať šachovnicovo každý druhý strom?
Alebo všetky stromy, ktoré majú jednu súradnicu deliteľnú tromi? (Vytvoríme tak bloky stromov.)
Podmienky sa môžu hodiť.

```javascript
for(let y = 0; y < canvas.height; y+=40) {
    for(let x = 0; x < canvas.width; x+=40) {
        if (((x+y)/40)%2 === 0) {
            kresliStrom(x, y);
        } else {
            kresliTravu(x, y);
        }
    }
}
```

## Náhodný les

Ukážeme im funkciu `Math.random`. Náhodne vynechávame stromy.
Vymyslíme si rôzne typy stromov (listnatý, ihličnatý, iné farby ...).

```javascript
const farbaTravy = "#009900";
const farbaStromu = "#003300";
const farbaPna = "#663300";

function kresliTravu(x, y){
    /* ... */
}

function kresliListnaty(x, y){
    /* ... */
}

function kresliIhlicnaty(x, y){
    /* ... */
}

for(let y = 0; y < canvas.height; y+=40) {
    for(let x = 0; x < canvas.width; x+=40) {
        if (Math.random() < 0.6) {
            if (Math.random() < 0.5) {
                kresliListnaty(x, y);
            } else {
                kresliIhlicnaty(x, y);
            }
        } else {
            kresliTravu(x, y);
        }
    }
}
```

## Klávesy

Chceli by sme teraz reagovať na klávesy.
Po stlačení `A`, `S` alebo `D` vykreslite vľavo hore listnatý strom, ihličnatý strom alebo trávu.

```javascript
// Zistíme, aké sú kódy kláves
window.onkeydown = function(e) {
    console.log(e.keyCode)
}
```

```javascript
window.onkeydown = function(e) {
    if(e.keyCode === 65) {
        kresliListnaty(0, 0);
    }
    if(e.keyCode === 83) {
        kresliIhlicnaty(0, 0);
    }
    if(e.keyCode === 68) {
        kresliTravu(0, 0);
    }
}
```

## Kurzor

Meniť iba roh je trápne.
Čo takto mať kurzor, ktorý sa vždy po nakreslení posunie doprava?
Treba im vysvetliť použitie globálnej premennej.
Vieme kurzor aj nakresliť?

```javascript
function kresliKurzor(x, y) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeRect(x+2, y+2, 36, 36);
}

let kurzorX = 0;
kresliKurzor(0, 0)

function pohniKurzor() {
    kurzorX += 40
    kresliKurzor(kurzorX, 0)
}

window.onkeydown = function(e) {
    if(e.keyCode === 65) {
        kresliListnaty(kurzorX, 0);
        pohniKurzor();
    }
    if(e.keyCode === 83) {
        kresliIhlicnaty(kurzorX, 0);
        pohniKurzor();
    }
    if(e.keyCode === 68) {
        kresliTravu(kurzorX, 0);
        pohniKurzor();
    }
}
```

## Ďalšie riadky

Kurzor nám utiekol :/
Ako ho donútime aby prešiel do ďalšieho riadku?

```javascript
function pohniKurzor() {
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
```

## Pole

Čo ak by sme na pozícii chceli klávesu, ktorá na pozícii nechá to, čo tam bolo pôvodne?
Potrebujeme si nejako zapamätať, čo tam bolo, aby sme vedeli prekresliť kurzor.

** Tento krok je naozaj ťažký! **

Takže im vysvetlíme pole. Najskôr nám stačí verzia fungujúca na prvom riadku.
Potom to vieme rozšíriť na viac riadkov tak,
že indexujeme do 1D poľa sekvenčne poďľa pohybu kurzora.
Nakoniec sa dostaneme k 2D poľu.

Entity reprezentujeme číslami / stringami.
Môžeme si napísať funkciu, ktorá vykreslí správny objekt ak jej dáme typ a súradnice.

```javascript
// Polia
let p = [0, 1, 2, 'tri', 'IV', 5.0]
p.push(6)
p = p.concat([7, 8, 9])
p[2]
p[2] = 'dva'
p[20]
p[20] = '20'
```

```javascript
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
```

## Ak sa bude niekto nudiť :)

  * Pohyb kurzoru všetkými smermi so šípkami
  * Panák, ktorý vie chodiť po lúke ale nie po stromoch
