/// <reference path="references.js" />
// when pesho is immortal the cats cannot catch the mouse
var pesho = { immortal: false }

window.onload = function startGame() {
    var MOUSE = {
        WIDTH: 38,
        HEIGHT: 26,
        SPEED: 15,
        INITIAL_X: 350,
        INITIAL_Y: 300,
        SPRITE_SOURCE: '../images/Mouse.png'
    },
        DIRECTIONS = {
            LEFT_ARROW_CODE: 37,
            UP_ARROW_CODE: 38,
            RIGHT_ARROW_CODE: 39,
            DOWN_ARROW_CODE: 40
        },
        FIELD = {
            LEFT_BORDER: 0,
            RIGHT_BORDER: 800,
            TOP_BORDER: 0,
            DOWN_BORDER: 600
        },
        CHEESE = {
            WIDTH: 25,
            HEIGHT: 20,
            IMAGE_SOURCE: '../images/cheese.png'
        },
        CAT = {
            WIDTH: 50,
            HEIGHT: 50,
            JUMPS: 20,
            IMAGE_SRC: '../images/cat.png'
        },

    CATS_COUNT = 3,
    CHEESE_PER_LEVEL = 10,

    scoreContainerDiv = document.getElementById('scoreContainer'),
    eatenCheese = 0,
    level = 1,

    stage = new Kinetic.Stage({
        container: 'animationContainer',
        width: FIELD.RIGHT_BORDER,
        height: FIELD.DOWN_BORDER
    }),
    layer = new Kinetic.Layer();

    stage.add(layer);
    generateBackground();

    // It's HACKIN' time 
    // when pesho is immortal, cats cannot catch the mouse
    window.alert = function (msg) {
        pesho.immortal = (msg === 'pesho is God');
        return "Yep, that's true!";
    };
   
    // This is KineticJS way to add image
    var cheese;
    var cheeseImage = new Image();

    cheese = new Kinetic.Image({
        x: generateRandomNumber(FIELD.RIGHT_BORDER - CHEESE.WIDTH),
        y: generateRandomNumber(FIELD.DOWN_BORDER - CHEESE.HEIGHT),
        image: cheeseImage,
        width: CHEESE.WIDTH,
        height: CHEESE.HEIGHT
    })
    layer.add(cheese);
    layer.draw();

    cheeseImage.src = CHEESE.IMAGE_SOURCE;

    var cats = [CATS_COUNT];
    var catImage = new Image();

    function populateWithCats() {
        var currentCat;
        for (var i = 0; i < CATS_COUNT; i++) {
            cats[i] = new Kinetic.Image({
                x: generateRandomNumber(FIELD.RIGHT_BORDER - CAT.WIDTH),
                y: generateRandomNumber(FIELD.DOWN_BORDER - CAT.HEIGHT),
                image: catImage,
                width: CAT.WIDTH,
                height: CAT.HEIGHT
            });
            //currentCat = new Kinetic.Image(cats[i]);
            layer.add(cats[i]);
            layer.draw();
        }
    }
    populateWithCats();

    function addCat() {
        cats[CATS_COUNT] = new Kinetic.Image({
            x: generateRandomNumber(FIELD.RIGHT_BORDER - CAT.WIDTH),
            y: generateRandomNumber(FIELD.DOWN_BORDER - CAT.HEIGHT),
            image: catImage,
            width: CAT.WIDTH,
            height: CAT.HEIGHT
        });
        //currentCat = new Kinetic.Image(cats[i]);
        layer.add(cats[CATS_COUNT]);
        CATS_COUNT += 1;
        layer.draw();
    }

    //moving cats generateRandom==1 move TopLeft if generateRandom==2 move TopRight etc.
    function moveCats() {
        for (var i = 0; i < CATS_COUNT; i++) {
            var cat = cats[i];

            switch (generateRandomNumber(4)) {
                case 1: {
                    moveCatLeft(cat);
                    moveCatUp(cat);
                    break;
                }
                case 2: {
                    moveCatLeft(cat);
                    moveCatDown(cat);
                    break;
                }
                case 3: {
                    moveCatRight(cat);
                    moveCatUp(cat);
                    break;
                }
                case 4: {
                    moveCatRight(cat);
                    moveCatDown(cat);
                    break;
                }
            }

            layer.draw();
            stage.draw();
        }
    }

    function moveCatLeft(cat) {
        var catX = cat.attrs.x - generateRandomNumber(CAT.JUMPS);

        if (canMoveLeft(catX)) {
            cat.setX(catX);
        }
    }

    function moveCatRight(cat) {
        var catX = cat.attrs.x + generateRandomNumber(2 * CAT.JUMPS);

        if (canMoveRight(catX, CAT.WIDTH)) {
            cat.setX(catX);
        }
    }

    function moveCatUp(cat) {
        var catY = cat.attrs.y - generateRandomNumber(CAT.JUMPS);

        if (canMoveUp(catY)) {
            cat.setY(catY);
        }
    }

    function moveCatDown(cat) {
        var catY = cat.attrs.y + generateRandomNumber(2 * CAT.JUMPS);

        if (canMoveDown(catY, CAT.HEIGHT)) {
            cat.setY(catY);
        }
    }

   var interval = setInterval(function () {
        moveCats();

        var isMouseOnCat = checkIsMouseOnCat(moveMouse, cats);
        // TODO: Immortal mode 

        if (pesho.immortal == true) {

            isMouseOnCat = false;
        }

        if (isMouseOnCat) {
            $('svg').remove();
            $('canvas').remove();
            scoreContainerDiv.parentNode.removeChild(scoreContainerDiv);
            clearInterval(interval);
            showMenu();
        }
    }, 700);
    catImage.src = CAT.IMAGE_SRC;

    // This is KineticJS way to add sprite animation 
    var moveMouse;
    var mouse = new Image();
    mouse.onload = function () {
        moveMouse = new Kinetic.Sprite({
            x: MOUSE.INITIAL_X,
            y: MOUSE.INITIAL_Y,
            image: mouse,
            animation: 'idle',
            animations: {
                idle: [
                                                       // x, y, width, height (1 frame)
                                                       12, 20, 24, 26,
                ],
                moveDown: [
                                                       // x, y, width, height (4 frame)
                                                       12, 20, 24, 26,
                                                       60, 22, 24, 24,
                                                       108, 20, 24, 26,
                                                       156, 22, 24, 24
                ],
                moveLeft: [
                                                       6, 70, 38, 24,
                                                       52, 70, 38, 24,
                                                       102, 70, 38, 24,
                                                       148, 70, 38, 24
                ],
                moveRight: [
                                                       4, 118, 38, 24,
                                                       54, 118, 38, 24,
                                                       100, 118, 38, 24,
                                                       150, 118, 38, 24
                ],
                moveUp: [
                                                       12, 164, 24, 26,
                                                       60, 166, 24, 24,
                                                       108, 164, 24, 26,
                                                       156, 166, 24, 24
                ]
            },
            frameRate: 5,
            frameIndex: 0
        });

        layer.add(moveMouse);
        layer.draw();

        // Function "start()" come from "KineticJS"
        moveMouse.start();

        var frameCount = 0;

        // Function "on" come from "KineticJS"
        moveMouse.on('frameIndexChange', function (evt) {
            // Set 'idle image' after key is up(not presses any more)
            if ((moveMouse.animation() === 'moveLeft' || moveMouse.animation() === 'moveRight' ||
                 moveMouse.animation() === 'moveUp' || moveMouse.animation() === 'moveDown') && ++frameCount > 3
            ) {
                moveMouse.animation('idle');
                frameCount = 0;
            }
        });

        window.addEventListener('keydown', onKeyDown);
    };

    mouse.src = MOUSE.SPRITE_SOURCE;

    function onKeyDown(evt) {
        switch (evt.keyCode) {
            case DIRECTIONS.LEFT_ARROW_CODE:
                moveMouseLeft(moveMouse);
                break;
            case DIRECTIONS.RIGHT_ARROW_CODE:
                moveMouseRight(moveMouse);
                break;
            case DIRECTIONS.DOWN_ARROW_CODE:
                moveMouseDown(moveMouse);
                break;
            case DIRECTIONS.UP_ARROW_CODE:
                moveMouseUp(moveMouse);
                break;
        }

        // We need to check the position of the mouse on every key stroke
        var isMouseOnCheese = checkIsMouseOnCheese(moveMouse, cheese);

        if (isMouseOnCheese) {
            changeCheesePosition(cheese);
            eatenCheese++;
            if (eatenCheese % CHEESE_PER_LEVEL === 0) {
                levelUp();
            }
            scoreContainerDiv.innerHTML = 'Score: ' + eatenCheese + ', Level: ' + level;
        }
    };

    function levelUp() {
        level += 1;

        // TODO: Add new cat. Done
        addCat();
        // TODO: if(level%3 === 0) { // make cats move faster }
    }

	 function showMenu() {
        var menu = document.createElement('div');
        var playerName = prompt('Your score is: ' + eatenCheese + '. Please enter your name:');
        if (playerName === null) {
            playerName = 'unnamed';
        }
        localStorage.setItem(eatenCheese, playerName);
        updateTopScores();
    }
    function updateTopScores() {
        var topScores = document.getElementById('top-scores');

        var sortedScores = Object.keys(localStorage).sort(function (a, b) {
            return b - a;
        });

        for (var i = 0; i < 10; i++) {
            var currentScore = sortedScores[i];
            if (currentScore && currentScore !== undefined) {
                var scoreDiv = document.createElement('div');
                scoreDiv.innerText = localStorage[currentScore] + ' : ' + currentScore;
                topScores.appendChild(scoreDiv);
            }
        }
    }
	
   /* function showMenu() {
        var gameOver = new Kinetic.Text({
            x: FIELD.RIGHT_BORDER / 2,
            y: FIELD.DOWN_BORDER / 2,
            text: 'GAME OVER \n score :' + eatenCheese,
            fontSize: 40,
            fontFamily: 'Calibri',
            fill: 'red'
        });

        var menu = new Kinetic.Layer();
        stage.add(menu);
        var optionsText = ['Start', 'Help', 'Highscores - not done', 'Something else'];
        var options = [];
        var selected = 0;
        var color = 'red';

        function list() {
            var curPosX = FIELD.DOWN_BORDER / 2 + 80;
            for (var i = 0; i < optionsText.length; i++) {
                if (i == selected) {
                    color = 'green';
                } else {
                    color = 'red';
                }
                options[i] = new Kinetic.Text({
                    x: FIELD.RIGHT_BORDER / 2,
                    y: curPosX + 30,
                    text: optionsText[i],
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: color
                });
                curPosX += 30;
            }
            menu.add(gameOver);

            for (var i = 0; i < options.length; i++) {
                menu.add(options[i]);
            }
            menu.draw();
        }
        list();

        window.addEventListener('keydown', function (evt) {
            switch (evt.keyCode) {
                case DIRECTIONS.DOWN_ARROW_CODE:
                    selected++;
                    list();
                    break;
                case DIRECTIONS.UP_ARROW_CODE:
                    selected--;
                    list();
                    break;
                case 13:
                    if (selected == 0) {
                        startGame();
                        //return;
                    }
                    break;
            }
            ;
        });
    }*/

    function moveMouseLeft(mouse) {
        var canMove = canMoveLeft(mouse.attrs.x);

        if (canMove) {
            mouse.setX(mouse.attrs.x += -1 * MOUSE.SPEED);
            mouse.attrs.animation = 'moveLeft';
        }
    }

    function moveMouseRight(mouse) {
        var canMove = canMoveRight(mouse.attrs.x, MOUSE.WIDTH);

        if (canMove) {
            mouse.setX(mouse.attrs.x += MOUSE.SPEED);
            mouse.attrs.animation = 'moveRight';
        }
    }

    function moveMouseDown(mouse) {
        var canMove = canMoveDown(mouse.attrs.y, MOUSE.HEIGHT);

        if (canMove) {
            mouse.setY(mouse.attrs.y += MOUSE.SPEED);
            mouse.attrs.animation = 'moveDown';
        }
    }

    function moveMouseUp(mouse) {
        var canMove = canMoveUp(mouse.attrs.y);

        if (canMove) {
            mouse.setY(mouse.attrs.y += -1 * MOUSE.SPEED);
            mouse.attrs.animation = 'moveUp';
        }
    }

    function canMoveLeft(x) {
        var canMoveLeft = false;

        if (x > FIELD.LEFT_BORDER + 5) {
            canMoveLeft = true;
        }

        return canMoveLeft;
    }

    function canMoveRight(x, imageWidth) {
        var canMoveRight = false;

        if (x < FIELD.RIGHT_BORDER - imageWidth) {
            canMoveRight = true;
        }

        return canMoveRight;
    }

    function canMoveDown(y, imageHeight) {
        var canMoveDown = false;

        if (y < FIELD.DOWN_BORDER - imageHeight - 5) {
            canMoveDown = true;
        }

        return canMoveDown;
    }

    function canMoveUp(y) {
        var canMoveUp = false;

        if (y > FIELD.TOP_BORDER) {
            canMoveUp = true;
        }

        return canMoveUp;
    }

    function changeCheesePosition(cheese) {
        var x = generateRandomNumber(FIELD.RIGHT_BORDER - CHEESE.WIDTH),
            y = generateRandomNumber(FIELD.DOWN_BORDER - CHEESE.HEIGHT);

        cheese.setPosition({ x: x, y: y });

        layer.draw();
        stage.draw();
    }

    function checkIsMouseOnCheese(mouse, cheese) {
        var isMouseOnCheese = false;

        if (
            mouse.attrs.x > cheese.attrs.x - CHEESE.WIDTH &&
            mouse.attrs.x < cheese.attrs.x + CHEESE.WIDTH &&
            mouse.attrs.y > cheese.attrs.y - CHEESE.HEIGHT &&
            mouse.attrs.y < cheese.attrs.y + CHEESE.HEIGHT
            ) {
            isMouseOnCheese = true;
        }

        return isMouseOnCheese;
    }

    function checkIsMouseOnCat(mouse, cat) {
        var isMouseOnCat = false;
        for (var i = 0; i < CATS_COUNT; i++) {
            if (
                ((mouse.attrs.x > cats[i].attrs.x &&
                  mouse.attrs.x < cats[i].attrs.x + CAT.WIDTH) ||
                 (mouse.attrs.x < cats[i].attrs.x &&
                  mouse.attrs.x + MOUSE.WIDTH > cats[i].attrs.x)) &&
                ((mouse.attrs.y > cats[i].attrs.y &&
                  mouse.attrs.y < cats[i].attrs.y + CAT.HEIGHT) ||
                 (mouse.attrs.y < cats[i].attrs.y &&
                  mouse.attrs.y + MOUSE.HEIGHT > cats[i].attrs.y))
                ) {
                isMouseOnCat = true;
                break;
            }
        }

        return isMouseOnCat;
    }

    function generateRandomNumber(maxNumber) {
        var randomNumber = (Math.random() * maxNumber) | 0;

        return randomNumber;
    }
}