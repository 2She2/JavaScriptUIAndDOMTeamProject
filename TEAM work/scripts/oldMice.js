//var canvas = document.getElementById("the-canvas");
//var ctx = canvas.getContext("2d");
//var bgReady = false;
//var bgImage = new Image();
//bgImage.onload = function () {
//    bgReady = true;
//};
//bgImage.src = "images/background.png";
//var heroImage = document.createElement("div");
//heroImage.style.width = 200 + 'px';
//heroImage.style.height = 100 + 'px';
//heroImage.style.border = 1 + 'px solid black';
//heroImage.style.zIndex = 100;
//document.body.appendChild(heroImage);
//var hero = {
//    speed: 256, // movement in pixels per second
//    x: 0,
//    y: 0
//};
//var monster = {
//    x: 0,
//    y: 0
//};
//function Treat() {
//    this.sizeX = 20;
//    this.sizeY = 20;
//    this.y = Math.floor((Math.random() * FIELD.DOWN_SCREEN_BORDER - this.sizeY) + 1);
//    this.x = Math.floor((Math.random() * FIELD.RIGHT_SCREEN_BORDER - this.sizeX) + 1);
//    this.eaten = false;
//}
//var monstersCaught = 0;
//var treatsEaten = 0;
// Handle keyboard controls
//var keysDown = {};
//addEventListener("keydown", function (e) {
//    keysDown[e.keyCode] = true;
//}, false);
//addEventListener("keyup", function (e) {
//    delete keysDown[e.keyCode];
//}, false);
// Reset the game when the player catches a monster
//var reset = function () {
//    hero.x = MOUSE.INITIAL_X;
//    hero.y = MOUSE.INITIAL_X;
//    // Throw the monster somewhere on the screen randomly
//    monster.x = 32 + (Math.random() * (canvas.width - 64));
//    monster.y = 32 + (Math.random() * (canvas.height - 64));
//};
// Update game objects
//var update = function (modifier) {
//    if (38 in keysDown) { // Player holding up
//        hero.y -= hero.speed * modifier;
//    }
//    if (40 in keysDown) { // Player holding down
//        hero.y += hero.speed * modifier;
//    }
//    if (37 in keysDown) { // Player holding left
//        hero.x -= hero.speed * modifier;
//    }
//    if (39 in keysDown) { // Player holding right
//        hero.x += hero.speed * modifier;
//    }
//    // Are they touching?
//    if (hero.x <= (monster.x + 32) &&
//        monster.x <= (hero.x + 32) &&
//        hero.y <= (monster.y + 32) &&
//        monster.y <= (hero.y + 32)
//        ) {
//        ++monstersCaught;
//        reset();
//    }
//    if (((hero.x <= cheese.x && hero.x + 100 >= cheese.x) || (hero.x >= cheese.x && hero.x <= cheese.x + cheese.sizeX)) &&
//        ((hero.y <= cheese.y && hero.y + 100 >= cheese.y) || (hero.y >= cheese.y && hero.y <= cheese.y + cheese.sizeY))
//        ) {
//        cheese.eaten = true;
//        treatsEaten++;
//    };
//};
//var cheese = new Treat();
// ???
//function updateChees(hero, monster) {
//    //Are they touching?
//    //if (hero.attrs.x <= (monster.x + 32) &&
//    //       monster.x <= (hero.attrs.x + 32) &&
//    //       hero.attrs.y <= (monster.y + 32) &&
//    //       monster.y <= (hero.attrs.y + 32)
//    //       ) {
//    //    ++monstersCaught;
//    //    reset();
//    //}
//    if (((hero.attrs.x <= cheese.x && hero.x + 100 >= cheese.x) || (hero.attrs.x >= cheese.x && hero.attrs.x <= cheese.x + cheese.sizeX)) &&
//    ((hero.attrs.y <= cheese.y && hero.attrs.y + 100 >= cheese.y) || (hero.attrs.y >= cheese.y && hero.attrs.y <= cheese.y + cheese.sizeY))
//    ) {
//        cheese.eaten = true;
//        treatsEaten++;
//    }
//    if (cheese.eaten === true) {
//        cheese = new Treat();
//    }
//}
//var render = function () {
//    //if (bgReady) {
//    //    ctx.drawImage(bgImage, 0, 0);
//    //}
//    ctx.clearRect(0, 0, 800, 600);
//    //if (heroReady) {
//    ctx.fillRect(hero.x, hero.y, 100, 100);
//    //}
//    if (cheese.eaten === true) {
//        cheese = new Treat();
//    }
//    ctx.fillRect(cheese.x, cheese.y, cheese.sizeX, cheese.sizeY);
//    //ctx.drawImage(monsterImage, monster.x, monster.y);
//    // Score
//    ctx.fillStyle = "rgb(250, 250, 250)";
//    ctx.font = "24px Helvetica";
//    ctx.textAlign = "left";
//    ctx.textBaseline = "top";
//    //ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
//};
// The main game loop
//    var main = function () {
//        var now = Date.now();
//        var delta = now - then;
//        update(delta / 1000);
//        render();
//        then = now;
//        // Request to do this again ASAP
//        requestAnimationFrame(main);
//    };
//    // Cross-browser support for requestAnimationFrame
//    var w = window;
//    requestAnimationFrame = w.requestAnimationFrame ||
//                            w.webkitRequestAnimationFrame ||
//                            w.msRequestAnimationFrame ||
//                            w.mozRequestAnimationFrame;
//    // Let's play this game!
//    var then = Date.now();
//    reset();
//    main();