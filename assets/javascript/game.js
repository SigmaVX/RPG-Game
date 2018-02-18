// Create Objects For Salad Bar Warriors
var saladbarWarriors = [
    grinder = {name: "Hoagies", health: 100, attack:5, counterAttack: 5},
    chopSuey = {name: "Chop Suey", health: 100, attack:5, counterAttack: 5},
    beans = {name: "Navy Beans", health: 100, attack:5, counterAttack: 5},
    meatloaf = {name: "Meatloaf", health: 100, attack:5, counterAttack: 5},
    sloppyJoe = {name: "Sloppy Joe", health: 100, attack:5, counterAttack: 5}];


// DOM Elements
var saladBarHTML = document.getElementById("saladBar");
var lunchRoomHTML = document.getElementById("lunchRoom");

// Array Holding Competitors
var currentOpponents = []; 


// The Card For the Player Selected
var playerCard;

// Player Cards Location In Cards Array
var playerArraySpot;

// The Oject Connected To The Player Card
var player;

var target;

// To Detect If Players Are In The Lunchroom
var picked;

// Dynamic Text Shown To Users
var message = document.getElementById("message");

// Player Bonus Attack Power
var bonusAttack = 0;


// var newDiv = $("<div>").html(x.name + "<br>" + "Health: " + x.health 
// + "<br>" + "Attack: " + x.attack + "<br>" + "Counter: " + x.counterAttack);



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
$(player).attr("id", "");

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
        player = Object.assign({}, saladbarWarriors[playerArraySpot] );
        console.log(player.name);

        // Shows Attack and Hides Select Button
        $(playerCard).attr("id", "player");
        $(".selectBtn").hide();
        $(".attackBtn").show();

        // Builds Competitor Array With Loop - Just Adding Name
        for ( var i = 0; i < saladbarWarriors.length; i++){
            // currentOpponentsp.push(saladbarWarriors[i]);
            if (i !== playerArraySpot) {
                currentOpponents.push(saladbarWarriors[i].name);
             }    
        }
        console.log("Opponents Array: " + currentOpponents);
    }
    
    else {
        // Do Nothing
        console.log("a: Nothing To Do");
        alert("Two Men Enter But Only One Can Be In The Lunchroom")
    }   
});

// Attack Function
$(".attackBtn").on("click", function() {
    targetCard = $(this).parent(); 
    console.log(targetCard);

    // This Assigns The Object To Target Card
    var arraySpot = parseInt($(targetCard).attr("arraySpot"));
    console.log("Target's Array Spot: " + arraySpot );
    target = Object.assign({}, saladbarWarriors[arraySpot] );
    console.log("Target Name: " + target.name);

    // Assigns Damage To Players
    console.log("Target Health Before Attack: " + target.health);
    console.log("Player Health Before Attack: " + player.health);    
    console.log("Player Attack Before Attack: " + player.attack);
    
    target.health -= player.attack;
    // target.health -= bonusAttack;
    // bonusAttack += player.attack;
    player.health -= target.counterAttack;
    
    console.log("Target Health After Attack: " + target.health);
    console.log("Player Health After Attack: " + player.health);    
    console.log("Bonus After Attack: " + bonusAttack); 

    // Update HTML
    $("#grinderHealth").html("Health: " + target.health);


    // loop through cards to update metrics
    // for (var i = 0; i < saladbarWarriors.length; i++){
    // $(".card").html(saladbarWarriors[i].name + "<br>" + "Health: " + saladbarWarriors[i].health 
    // + "<br>" + "Attack: " + saladbarWarriors[i].attack + "<br>" + "Counter: " + saladbarWarriors[i].counterAttack);
    // }

});



// maybe add ID to person that calls them opponent
// }

// Counter Attack Function





// for scoring you can do a loop on all array but skip the one that is player with an if or a !===


    // <!-- display an attack buttons below each opponent person -->
    // <!-- attack amount increases with each use and reduces oponent HP -->
    // <!-- display action in message area and update numbers -->
    // <!-- opponent counter attacks immediately at constant rate-->
    // <!-- player card done with HP less than zero -->
    // <!-- game over when all cards are gone -->
    // <!-- have a game reset -->
    // <!-- Add audio (optional)
