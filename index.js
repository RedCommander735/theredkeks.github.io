var tile_green;
var tile_red;
var tile_yellow;
var tile_blue;
var score_text;
var score = 0;
var parray = [];
var array = [];
var disable = true;
var msg = new SpeechSynthesisUtterance();

function init() {
    tile_green = document.querySelector(".gameboard tr:nth-child(1) > td:nth-child(1)");
    tile_red = document.querySelector(".gameboard tr:nth-child(1) > td:nth-child(2)");
    tile_yellow = document.querySelector(".gameboard tr:nth-child(2) > td:nth-child(1)");
    tile_blue = document.querySelector(".gameboard tr:nth-child(2) > td:nth-child(2)");
    button_start = document.querySelector(".button");
    score_text = document.querySelector(".controlls table> tbody > tr > td:nth-child(2) > p");

    tiles = [tile_green, tile_red, tile_yellow, tile_blue];
    tiles.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.stopPropagation();
            event.preventDefault();
            if (!disable) {
                onpress(event);
            }
        }, false);
    });
    button_start.addEventListener("click", run);
};

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function onpress(event) {
    var target = event.target;
    parray.push(target);
    flash(target);
    check();
};

function flash(tile) {
    tile.style.filter = "brightness(150%)";
    setTimeout(function() {
        tile.style.filter = "brightness(100%)";
    }, 200);
}

function check() {
    len = array.length;
    parray.forEach(function(element, index) {
        if (element != array[index]) {

            setTimeout(function() {
                msg.text = "Du hast verloren! Score: " + score;
                window.speechSynthesis.speak(msg);
                alert("Du hast verloren! Score: " + score)
                score = 0;
            }, 250)
            parray = [];
            array = [];
            disable = true;
            button_start.disable = false;
            score_text.innerText = "-";
        } else if (index + 1 == len) {
            score++;
            disable = true;
            score_text.innerText = score;
            setTimeout(run, 500);
        }
    });
}

function run() {
    button_start.disable = true;
    array.push(tiles[randint(0, 3)]);
    clonedarray = [...array];
    parray = [];
    setTimeout(playsequence, 1000, clonedarray);
}

function playsequence(newarray) {
    if (newarray.length > 0) {
        flash(newarray.shift());
        setTimeout(playsequence, 500, newarray);
        disable = false;
    }

}

document.addEventListener("DOMContentLoaded", init);