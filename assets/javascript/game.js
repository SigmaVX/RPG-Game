$( document ).ready(function() {

// Create Objects For Salad Bar Warriors
var saladbarWarriors = [
    grinder = {name: "Hoagies", health: 100, attack:3, counterAttack: 5},
    chopSuey = {name: "Chop Suey", health: 90, attack:5, counterAttack: 7},
    beans = {name: "Navy Beans", health: 50, attack:10, counterAttack: 8},
    meatloaf = {name: "Meatloaf", health: 120, attack:5, counterAttack: 6},
    sloppyJoe = {name: "Sloppy Joe", health: 110, attack:8, counterAttack: 4}];

// DOM Elements
var saladBarHTML = document.getElementById("saladBar");
var lunchRoomHTML = document.getElementById("lunchRoom");

// Dynamic Text Shown To Users
var message = document.getElementById("message");

// Text Shown Before Start
var startMessage = "";
var jumbotron;

// Array Holding Competitors
var currentOpponents = []; 

// The Card For The Player Selected
var playerCard;

// Player Card's Location In Array
var playerArraySpot;

// The Oject Connected To The Player Card
var playerObject;

// The Card For The Target Selected
var targetCard;

// Target Card's Location In Array
var targetArraySpot;

// The Oject Connected To The Target Card
var targetObject;

// To Detect If Players Are In The Lunchroom
var picked;

// Player Bonus Attack Power
var bonusAttack = 0;


// Create Header Section
var instructions = $("<div>").html("Instructions");
    $(instructions).attr("class", "btn col-3");
    $("#header").append(instructions);

var playGame = $("<div>").html("Play Game");
    $(playGame).attr("class", "btn col-3");
    $(playGame).attr("id", "playGame");
    $("#header").append(playGame);    

var resetGame = $("<div>").html("Reset Game");
    $(resetGame).attr("class", "btn col-3");
    $(resetGame).attr("id", "resetGame");
    $("#header").append(resetGame);
    $(resetGame).hide();

var playAudio = $("<div>").html("Play Audio");
    $(playAudio).attr("class", "btn col-3");
    $(playAudio).attr("id", "playAudio");
    $("#header").append(playAudio);

var pauseAudio = $("<div>").html("Pause Audio");
    $(pauseAudio).attr("class", "btn col-3");
    $(pauseAudio).attr("id", "pauseAudio");
    $("#header").append(pauseAudio);

var messageRow = $("<div>").html("You Ready To Rumble? <br> Pick Your Salad Bar Warrior!")
    $(messageRow).attr("class", "col-12 text-center");
    $(messageRow).attr("id", "message");
    $("#header").append(messageRow);


// Play and Pause Audio - Is Not Native To JQ
// Is A Document Fucntion That We Access With Get (0) 
var audio = $("<audio>").attr("src", "./assets/audio/Lunchlady Land.mp3")
    $(audio).attr("id", "audio");
    $("#header").append(audio);
    // Atl Would Be - document.getElementById("audio").pause();

    $("#playAudio").on("click", function() {
        $("audio").get(0).play();
        // Atl Would Be - document.getElementById("audio").play();
    });

    $("#pauseAudio").on("click", function() {
        $("audio").get(0).pause();
    });


// Play & Reset Game Triggers
    $("#resetGame").on("click", function() {
        $(".card").remove();
        startGame();
    });

    $("#playGame").on("click", function() {
        startGame();
    });


// Start Text Message & Box
    jumbotron = $("<div>").html("test")
        $(jumbotron).attr("class", "container jumbotron col-12 text-center");
        $(jumbotron).attr("id", "jumbotron");
        $("#content").append(jumbotron);

    startMessage = $("<h2>").html("You Ready To Rumble? <br> Pick Your Salad Bar Warrior!")
        $(startMessage).attr("class", "col-12 text-center");
        $(startMessage).attr("id", "startMessage");
        $(jumbotron).append(startMessage);





function startGame(){

    // Reset Key Metrics 
    picked = false;
    bonusAttack = 0;
    currentOpponents = [];
    $(playerCard).attr("id", "");
    $("#saladbar").append(playerCard);
    $("#resetGame").show();
    $("#playGame").hide();
    $(jumbotron).hide();
    $("#message").html("You Ready To Rumble? <br> Pick Your Salad Bar Warrior!")
    console.log("Opponents Array At Reset: " + currentOpponents.length);
   
    var saladbarWarriors = [
        grinder = {name: "Hoagies", health: 100, attack:3, counterAttack: 5},
        chopSuey = {name: "Chop Suey", health: 90, attack:5, counterAttack: 7},
        beans = {name: "Navy Beans", health: 50, attack:10, counterAttack: 8},
        meatloaf = {name: "Meatloaf", health: 120, attack:5, counterAttack: 6},
        sloppyJoe = {name: "Sloppy Joe", health: 110, attack:8, counterAttack: 4}
    ];

    console.log("Array Objects At Reset: " + saladbarWarriors);

    // Create & Place Player Cards
function cardCreate(x, y, z, file, spot, healthID ){
    var newDiv = $("<div>").html("");
    $(newDiv).attr("class", "card col-2 text-center pl-1 pr-1");
    $(newDiv).attr("id", y );
    $(newDiv).attr("arraySpot", spot );
    $("#saladBar").append(newDiv);
    
    // Add Metrics
    var name = $("<div>").html(x.name);
        $(name).attr("class", "name");
        $(newDiv).append(name);

    var health = $("<div>").html("Health: " + x.health);
        $(health).attr("class", "health");
        $(health).attr("id", healthID );
        $(newDiv).append(health);

    var attack = $("<div>").html("Attack: " + x.attack);
        $(attack).attr("class", "attack");
        $(newDiv).append(attack);

    var counter = $("<div>").html("Counter: " + x.counterAttack);
        $(counter).attr("class", "counter");
        $(newDiv).append(counter);

    // Add Image
    var image = $("<img>").attr("src", file);
        $(image).attr("class", "img-fluid rounded");
        $(newDiv).prepend(image);

    // Add Buttons
    var attackButton = $("<button>").attr("class", "btn attackBtn");
        $(attackButton).html("Attack");
        $(attackButton).hide();
        $(newDiv).append(attackButton);
    var selectButton = $("<button>").attr("class", "btn selectBtn");
        $(selectButton).attr("id", z );
        $(selectButton).html("Select");
        $(newDiv).append(selectButton);
}

    cardCreate(grinder, "grinder", "grinderBtn", "./assets/images/hoagie.jpg", 0, "grinderHealth");
    cardCreate(chopSuey, "chopSuey", "chopSueyBtn", "./assets/images/Chopsuey.png", 1, "chopSueyHealth");
    cardCreate(beans, "beans", "beansBtn", "./assets/images/beans.jpg", 2, "beansHealth");
    cardCreate(meatloaf, "meatloaf", "meatloafBtn", "./assets/images/meatloaf.jpg", 3, "meatloafHealth");
    cardCreate(sloppyJoe, "sloppyJoe", "sloppyJoeBtn", "./assets/images/sloppyjoe2.jpg", 4, "sloppyJoeHealth");

    // Select The Player
    $(".selectBtn").on("click", function() {
        
        // Check There Are No Other Cards Selected 
        if(picked===false){
            playerCard = $(this).parent(); 
            $("#lunchRoom").append(playerCard);
            picked = true;
            
            // This Assigns The Object To Player 
            playerArraySpot = parseInt($(playerCard).attr("arraySpot"));
            console.log("Player Object Array Spot: " + playerArraySpot );
            playerObject = Object.assign({}, saladbarWarriors[playerArraySpot] );
            console.log(playerObject.name);

            // Shows Attack and Hides Select Button
            $(playerCard).attr("id", "player");
            $(".selectBtn").hide();
            $(".attackBtn").show();

            // Builds Competitor Array With Loop - Just Adding Name
            for ( var i = 0; i < saladbarWarriors.length; i++){
                if (i !== playerArraySpot) {
                    currentOpponents.push(saladbarWarriors[i].name);
                }    
            }
            console.log("Opponents Array: " + currentOpponents);
        }
        
        else {
            // Do Nothing
            console.log("a: Nothing To Do");
            alert("Two Men Enter But Only One Can Be In The Lunchroom!")
        } 
    });

    
    // Attack Function
    $(".attackBtn").on("click", function() {
        targetCard = $(this).parent(); 
        console.log(targetCard);

        // This Assigns The Object To The Target Card
        targetArraySpot = parseInt($(targetCard).attr("arraySpot"));
        console.log("Target's Array Spot: " + targetArraySpot );
        targetObject = Object.assign({}, saladbarWarriors[targetArraySpot]);
        
        console.log("Target Name: " + targetObject.name);

        // Assigns Damage To Players
        console.log("Target Health Before Attack: " + targetObject.health);
        console.log("Player Health Before Attack: " + playerObject.health);    
        console.log("Player Attack Before Attack: " + playerObject.attack);
        
        targetObject.health -= playerObject.attack;
        targetObject.health -= bonusAttack;
        var totalPlayerAttack = playerObject.attack + bonusAttack;
        console.log("Total Player Attack: " + totalPlayerAttack);
        playerObject.health -= targetObject.counterAttack;
        // Increases Bonus For Each Attack
        bonusAttack += playerObject.attack;

        console.log("Target Health After Attack: " + targetObject.health);
        console.log("Player Health After Attack: " + playerObject.health);    
        console.log("Bonus After Attack: " + bonusAttack); 
        
        // Sends The Updated Values Back To The Root Object - IMPORTANT!  
        saladbarWarriors[targetArraySpot] = targetObject;
        saladbarWarriors[playerArraySpot] = playerObject;

        // Update Message Box
        $("#message").html(playerObject.name + " Attacks " + targetObject.name + " For " + totalPlayerAttack + "<br>What's You're Next Move?");
        

        // Update HTML
        for (var i = 0; i < saladbarWarriors.length; i++){
            $("#grinderHealth" ).html("Health: " + saladbarWarriors[0].health);
            $("#chopSueyHealth").html("Health: " + saladbarWarriors[1].health);
            $("#beansHealth").html("Health: " + saladbarWarriors[2].health);
            $("#meatloafHealth").html("Health: " + saladbarWarriors[3].health);
            $("#sloppyJoeHealth").html("Health: " + saladbarWarriors[4].health);
        }

        // Remove Cards With No Health
        if (targetObject.health < 1) {
            targetCard.hide();
            currentOpponents.pop();
            $(message).html("You Defeated " + targetObject.name);
            console.log("Opponents Left: " + currentOpponents.length);
        }

        // Check Win Conditions
        if (currentOpponents.length < 1){
            $("#message").html("You Win!<br>You Are King ");
            $("#saladbar").append(playerCard);
            $(".attackBtn").hide();
            $("#resetGame").show();
            $("#playGame").hide();
        }
        
        // Check Loss Conditions
        if (playerObject.health < 1){
            $("#message").html("Game Over <br> You're Dead Meat!")
            $(".attackBtn").hide();
            $("#resetGame").show();
            $("#playGame").hide();
        }
    });
}

// Document Ready Close
});

