// Create Objects For Salad Bar Warriors
var saladbarWarriors = [
    grinder = {name: "Hoagies", health: 110, attack:3, counterAttack: 6},
    chopSuey = {name: "Chop Suey", health: 90, attack:5, counterAttack: 8},
    beans = {name: "Navy Beans", health: 50, attack:10, counterAttack: 14},
    meatloaf = {name: "Meatloaf", health: 120, attack:5, counterAttack: 12},
    sloppyJoe = {name: "Sloppy Joe", health: 100, attack:5, counterAttack: 10}];


// DOM Elements
var saladBarHTML = document.getElementById("saladBar");
var lunchRoomHTML = document.getElementById("lunchRoom");

// Dynamic Text Shown To Users
var message = document.getElementById("message");

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
        $(image).attr("class", "img-fluid");
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


// Start Of Game | Reset Key Metrics 
picked = false;
bonusAttack = 0;
currentOpponents = [];
$(playerCard).attr("id", "");
$(message).html("You Ready To Rumble? <br> Pick Your Salad Bar Warrior!")

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
    $(message).html(playerObject.name + " Attacks " + targetObject.name + " For " + totalPlayerAttack + "<br>What's You're Next Move?");
    

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
        $(message).html("You Win!");
    }
    
    // Check Loss Conditions
    if (playerObject.health < 1){
        $(message).html("Game Over <br> You're Dead Meat!")
        $(".attackBtn").hide();
    }


    
    // <!-- have a game reset -->
    // <!-- Add audio (optional)
    




});


