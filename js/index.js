//Class which recognizes key presses
class Controller{
    constructor(player, attacks){
        let justShot = false;
        //Whenever user presses a key, the spaceship will start to move
         //Whenever the space bar is pressed, the spaceship will create a new Attack object which is a laser
        document.addEventListener("keydown", (event) =>{
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    player.moveUp();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    player.moveDown();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    player.moveLeft();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    player.moveRight();
                    break;
                case " ":
                    if(!justShot){
                        //Here we make sure the player cannot simply just hold space bar so that he fires super fast. Instead its more steady.
                        justShot = true;
                        setTimeout(() => justShot = false, 100);
                        this.x = player.pos.x + player.height/2 - 9;
                        this.y = player.pos.y ;
                        attacks.push(new Attack(this.x,this.y));
                        var audio = new Audio('./audio/laser.mp3');
                        audio.play();
                    }
                    event.preventDefault();
                   
                    break;
            }
        
            
        }
        
        
        );
        //Whenever the key is released, the spaceship will stop
       
        document.addEventListener("keyup", (event) =>{
            switch (event.key) {
                case "ArrowUp":
                    if(player.yvelocity < 0){
                        player.stopYVelocity();
                    }
                    event.preventDefault();
                    
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    if(player.yvelocity > 0){
                        player.stopYVelocity();
                    }
                    break;
                case "ArrowLeft":
                    if(player.xvelocity < 0){
                        player.stopXVelocity();
                    }
                    event.preventDefault();
                    
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    if(player.xvelocity > 0){
                        player.stopXVelocity();
                    }
                    break;
                case " ":
                 
                    break;
            }
        
            
        }
        
        
        );
        
        
    }
}


//Class for the spaceship which the user controls
class Player{

    //Constructor for a Player spaceship object
    //Takes in the width and height of the display as parameters
    constructor(displayWidth, displayHeight){
        //Sets height and width of spaceship
        //this.playerattack = document.getElementById("playerattack");
        this.spaceship = document.getElementById("spaceship");
        this.width = 100;
        this.height = 100;
        //The movement speed of the spaceship whenever an arrow is pressed in a direction
        this.movementSpeed = 4;

        this.yvelocity = 0;
        this.xvelocity = 0;

        //Width and height of the canvas
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;

        //Sets the starting position of the spaceship
        this.pos = {
            x: displayWidth / 2 - this.width / 2,
            y: displayHeight - this.height - 10
        };
    }
   
    getXPos(){
        return this.pos.x;
    }
    getYPos(){
        return this.pos.y;
    }

    //Draws the player on the display
    drawPlayer(drawCanvas){
        drawCanvas.drawImage(spaceship, this.pos.x, this.pos.y, this.width, this.height);
    }
    

    //Updating the canvas
    //Takes a parameter dt which will represent the time that the game was last updated
    update(dt){
        if(!dt){
            return;
        }
        this.pos.x += this.xvelocity;
        this.pos.y += this.yvelocity;
        if(this.pos.x < 0){
            this.pos.x = 0;
        }
        if(this.pos.x + this.width > this.displayWidth){
            this.pos.x = this.displayWidth - this.width;
        }
        if(this.pos.y < 0){
            this.pos.y = 0;
        }
        if(this.pos.y + this.height > this.displayHeight){
            this.pos.y = this.displayHeight - this.height;
        }
    }

    
    //Player spaceship will move right
    moveRight(){
        this.xvelocity = this.movementSpeed;
    }
    //Player spaceship will move left
    moveLeft(){
        this.xvelocity = (this.movementSpeed)*-1;
    }
     //Player spaceship will move down   
    moveDown(){
        this.yvelocity = this.movementSpeed;
    }
    //Player spaceship will move up
    moveUp(){
        this.yvelocity = (this.movementSpeed)*-1;
    }
    
    //Tells player spaceship to stop moving horizontally
    stopXVelocity(){
        this.xvelocity = 0;
    }
    //Tells player spaceship to stop moving vertically
    stopYVelocity(){
        this.yvelocity = 0;
    }

}

//Class which is for the users attack which is a laser
class Attack{
    constructor(xpos, ypos){
        this.laser = document.getElementById("playerattack");
        this.yVelocity = -3;

        this.pos = {
            x : xpos,
            y : ypos
        };
    }

    //Draws the image of the laser on the Canvas
    drawAttack(drawCanvas){
        drawCanvas.drawImage(this.laser, this.pos.x, this.pos.y, 20, 20 );
        
    }
    //Updating the canvas with the position of the laser
    update(dt, xpos, ypos){
        this.pos.y += this.yVelocity;
    }
}


//Class for the enemy aliens 
class Enemy{
    constructor(xpos, ypos, pdownchange ){
        this.image = document.getElementById("alien");
        this.xVelocity = 1;
        this.yPixelDown = 5 * pdownchange;

        //Direction the enemy is going
        this.direction = "LEFT";


        this.pos = {
            x : xpos,
            y : ypos
        };
    }

    //Moves the enemy down (used whenever enemy reaches left or right side of canvas)
    moveDown(){
        this.pos.y = this.pos.y + this.yPixelDown;
    }
     
    //Switches direction 
    switchDirection(){
        if(this.direction === "LEFT"){
            this.direction = "RIGHT";
        }
        else{
            this.direction = "LEFT";
        }

    }
    //Updating teh canvas with the position of the enemy (used whenever enemy reaches left or right side of canvas)
    update(dt){
         
        if(this.direction === "LEFT"){
            this.pos.x = this.pos.x - this.xVelocity; 
        }
        else{
            this.pos.x = this.pos.x + this.xVelocity;
        }
          
      
    }

    
    //Draws the enemy alien on the canvas
    drawEnemy(drawCanvas){
        drawCanvas.drawImage(this.image, this.pos.x, this.pos.y, 38.88, 29.76);
    }

}





//Update the high score at the top of display
document.getElementById("highscore").innerHTML="High Score: "  + getCookie("High Score");
let canvas = document.getElementById("gameScreen");
let drawCanvas = canvas.getContext("2d");

//Creates array of attack objects and alien objects and populate aliens array with alien objects
let attacks = [];
let aliens = [];
for(let row = 0 ; row < 5 ; row++){
    for(let col = 0 ; col < 11 ; col++){
        const newAlien =  new Enemy(col*50+50, row*50+50, 1, 1);
        aliens.push(newAlien);
    }
}

//Canvas width and height
const DISPLAY_WIDTH = 800;
const DISPLAY_HEIGHT = 600;


let time = 0;
let player = new Player(DISPLAY_WIDTH, DISPLAY_HEIGHT);
let controller = new Controller(player, attacks);


//Keeps track of the score
let score = 0;
//Increases the speed of the aliens slowly
let speeder = 1.2;




//Will constantly update the canvas whenever objects move
function updateGame(timestamp){
    //dt will store how much time has passed
 
   drawCanvas.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
   let dt = timestamp - time;
   time = timestamp;
   player.update(dt);
   player.drawPlayer(drawCanvas);
   

    //Removes an attack object from array attacks if it goes off the screen
    for(var i = 0 ; i < attacks.length ; i++){
        attacks[i].update(dt);
        attacks[i].drawAttack(drawCanvas);
        if(attacks[i].pos.y < 0){
            attacks.splice(attacks.indexOf(attacks[i]),1);
            
        }
    }

    //Helps to detect whether aliens are reaching the end of the screen
    
    for(let i = 0 ; i < aliens.length ; i++){
        if(aliens[i].pos.x == 0 || aliens[i].pos.x == (800-30)){
            //If aliens are reaching end of screen (left or right side of screen), switch direction and move them down a bit.
            for(let c = 0 ; c < aliens.length ; c++){
                aliens[c].switchDirection();
                aliens[c].moveDown();
                
            }
            break;
        }
    }

    //This area will test for a laser hitting an enemy object 
    for(let i = 0 ; i < aliens.length ; i++){
        for(let c = 0 ; c < attacks.length ; c++){
             //If a laser makes contact with a enemy object, it will remove the an attack object and alien object from their respective arrays and increment score by 20
            if(!(aliens[i].pos.x > attacks[c].pos.x  + 39 || 
                aliens[i].pos.x + 20 < attacks[c].pos.x|| 
                aliens[i].pos.y > attacks[c].pos.y + 20 ||
                aliens[i].pos.y + 30 < attacks[c].pos.y)){
                    attacks.splice(attacks.indexOf(attacks[c]), 1);
                    aliens.splice(aliens.indexOf(aliens[i]), 1);
                    score += 20;
                    document.getElementById("score").innerHTML = "Score: " + score;
                    break;
                }
        }
    }
    //Detect any collisions with the spaceship and aliens to see if user lost the game
    for(let i = 0 ; i < aliens.length ; i++){
        if(!(aliens[i].pos.x > player.pos.x  + 100 || 
            aliens[i].pos.x + 20 < player.pos.x || 
            aliens[i].pos.y > player.pos.y + 100 ||
            aliens[i].pos.y + 30 < player.pos.y)){
                var destroyaudio = new Audio('./audio/destroy.mp3');
                destroyaudio.play();
                drawCanvas.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
                
                //Checks to see if there is a new high score
                if(score > getCookie("High Score")){
                    setCookie("High Score", score, 1);
                    document.getElementById("highscore").innerHTML="High Score: "  + getCookie("High Score");
                    
                }
           alert("Aliens have invaded your planet! Your score is " + score + " points!");
      
           return;
        }
    }
    //Let aliens move
    for(let i = 0 ; i < aliens.length ; i++){
        aliens[i].update(dt);
        aliens[i].drawEnemy(drawCanvas);
    }

    //If aliens are all destroyed then the level up sound will play and new aliens are spawned which are faster.
    if(aliens.length == 0){
        var audio = new Audio('./audio/levelup.mp3');
        audio.play();
        speeder += 4.0;
        for(let row = 0 ; row < 5 ; row++){
            for(let col = 0 ; col < 11 ; col++){
                const newAlien =  new Enemy(col*50+50, row*50+50, speeder, speeder/2);
                aliens.push(newAlien);
            }
        }
    }
        
    
    requestAnimationFrame(updateGame);

}

//function for setting a cookie for highscore
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  
//function for getting a cookie for highscore
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0){
        return c.substring(nameEQ.length, c.length);
      } 
    }
    return 0;
}


updateGame();