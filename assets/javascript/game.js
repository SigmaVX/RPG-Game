$( document ).ready(function() {

// Create Objects For Salad Bar Warriors
var saladbarWarriors = [
    grinder = {name: "Hoagies", health: 100, attack:6, counterAttack: 10},
    chopSuey = {name: "Chop Suey", health: 90, attack:7, counterAttack: 7},
    beans = {name: "Navy Beans", health: 50, attack:10, counterAttack: 15},
    meatloaf = {name: "Meatloaf", health: 150, attack:5, counterAttack: 8},
    sloppyJoe = {name: "Sloppy Joe", health: 110, attack:8, counterAttack: 12}];

// DOM Elements
var saladBarHTML = document.getElementById("saladBar");
var lunchRoomHTML = document.getElementById("lunchRoom");

// Dynamic Text Shown To Users
var message = document.getElementById("message");

// Text Shown Before Start
var startMessage = "";

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
var spanOne = $("<span>");
    $(spanOne).attr("class", "icons");
    $(spanOne).attr("id", "playSpan");
    $("#header").append(spanOne);

var spanTwo = $("<span>");
    $(spanTwo).attr("class", "icons");
    $(spanTwo).attr("id", "pauseSpan");
    $("#header").append(spanTwo);

var spanThree = $("<a>");
    $(spanThree).attr("class", "icons");
    $(spanThree).attr("id", "infoSpan");
    $(spanThree).attr("href", "info.html")
    $("#header").append(spanThree);

var playAudio = $("<i>");
    $(playAudio).attr("class", "fas fa-play-circle");
    $(playAudio).attr("id", "playAudio");
    $("#playSpan").append(playAudio);

var pauseAudio = $("<i>");
    $(pauseAudio).attr("class", "fas fa-pause-circle");
    $(pauseAudio).attr("id", "pauseAudio");
    $("#pauseSpan").append(pauseAudio);

var infoIcon = $("<i>");
    $(infoIcon).attr("class", "fas fa-question-circle");
    $(infoIcon).attr("id", "infoIcon");
    $("#infoSpan").append(infoIcon);

// var playAudio = $("<img>");
//     $(playAudio).attr("class", "icons img-fluid ");
//     $(playAudio).attr("id", "playAudio");
//     $(playAudio).attr("src", "./assets/images/play.png");
//     $("#header").append(playAudio);

// var pauseAudio = $("<img>");
//     $(pauseAudio).attr("class", "icons img-fluid");
//     $(pauseAudio).attr("id", "pauseAudio");
//     $(pauseAudio).attr("src", "./assets/images/pause.png");
//     $("#header").append(pauseAudio);

var messageRow = $("<div>").html("");
    $(messageRow).attr("class", "col-12 text-center");
    $(messageRow).attr("id", "message");
    $("#header").append(messageRow);
    $(messageRow).hide();


// Start Text Message & Box
var jumbotron = $("<div>");
    $(jumbotron).attr("class", "container jumbotron col-12 text-center");
    $(jumbotron).attr("id", "jumbotron");
    $("#content").append(jumbotron);

var jumboMessage = $("<h2>").html("A long time ago in a Salad Bar Far Far Away. . .<br>")
    $(jumboMessage).attr("class", "col-12 text-center");
    $(jumboMessage).attr("id", "jumboMessage");
    $(jumbotron).append(jumboMessage);

var playGame = $("<div>").html("Play Game");
    $(playGame).attr("class", "btn col-md-4");
    $(playGame).attr("id", "playGame");
    $(jumbotron).append(playGame);    

var resetGame = $("<div>").html("Reset Game");
    $(resetGame).attr("class", "btn col-md-4");
    $(resetGame).attr("id", "resetGame");
    $(jumbotron).append(resetGame);
    $(resetGame).hide();

var infoButton = $("<a>").html("Instructions");
    $(infoButton).attr("class", "btn col-md-4 ml-2");
    $(infoButton).attr("id", "infoButton");
    $(infoButton).attr("href", "info.html")
    $(jumbotron).append(infoButton);


// Play and Pause Audio - Is Not Native To JQ
// Is A Document Fucntion That We Access With Get (0) 
var audio = $("<audio>").attr("src", "./assets/audio/Lunchlady Land.mp3")
    $(audio).attr("id", "audio");
    $("#header").append(audio);
    // Atl Would Be - document.getElementById("audio").pause();

    $("#playSpan").on("click", function() {
        $("audio").get(0).play();
        document.getElementById("audio").volume = 0.95;
        // Atl Would Be - document.getElementById("audio").play();
    });

    $("#pauseSpan").on("click", function() {
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

// Info Box - Instructions
    var infobox = $("<div>");
    $(infobox).attr("class", "text-center");
    $(infobox).attr("id", "infobox");
    $("#infoarea").append(infobox);
    
    var heading = $("<h1>").html("Instructions");
    $(infobox).append(heading);
    
    var text = $("<p>").html("All is not well in the inter-galactic salad bar.  The prepared foods are feed up and all-out war is about to break out.  Pick your food and destroy all that would stand between you and your hunger. Choose wisely as each time you attack another food item they will counter attack.  Will you be the last item standing?  Start the game by selecting your player card.  Then attack the opposing cards. Each attack builds your attack bonus and helps to reduce your opponent's health. However, each time you attack you will be counter-attacked. Last card remaining wins!");
    $(infobox).append(text);

    var subheading = $("<h2>").html("Food Stats");
    $(infobox).append(subheading);
    
    var yetmoretext = $("<p>").html("<strong>Health</strong> - The Amount of Damage The Item Can Sustain<br><strong>Attack</strong> - The Amount of Damage The Item Can Deal To Others<br><strong>Counter</strong> - The Amount of Damage You Will Take If You Attack The Item");
    $(yetmoretext).attr("id", "infostats");
    $(infobox).append(yetmoretext);

    var subheadingtwo = $("<h3>").html("The Real Deal");
    $(infobox).append(subheadingtwo);

    var evenmoretext = $("<p>").html("This game showcases DOM manipulation and logic using jQuery as there is minimal use of HTML.  Almost everything you see here is generated by the jQuery and manipulated using functions. The code is scalable and set up using an array to hold objects.  Those objects create the cards and HTML while event listeners take the data and update the original objects and array.");
    $(infobox).append(evenmoretext);

    var gamereturn = $("<a>").html("Return To Game");
    $(gamereturn).attr("class", "btn col-md-4");
    $(gamereturn).attr("id", "gamereturn");
    $(gamereturn).attr("href", "./index.html");
    $(infobox).append(gamereturn);


// Game Function
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
        $(messageRow).show();
        $("#message").html("Produce Is Ready For A Rumble. <br> Pick Your Salad Bar Warrior!")
        console.log("Opponents Array At Reset: " + currentOpponents.length);
   
    var saladbarWarriors = [
        grinder = {name: "Hoagies", health: 100, attack:6, counterAttack: 10},
        chopSuey = {name: "Chop Suey", health: 90, attack:7, counterAttack: 7},
        beans = {name: "Navy Beans", health: 50, attack:10, counterAttack: 15},
        meatloaf = {name: "Meatloaf", health: 150, attack:5, counterAttack: 8},
        sloppyJoe = {name: "Sloppy Joe", health: 110, attack:8, counterAttack: 12}
    ];

    console.log("Array Objects At Reset: " + saladbarWarriors);

    // Create & Place Player Cards
    function cardCreate(x, y, z, file, spot, healthID ){
        var newDiv = $("<div>").html("");
        $(newDiv).attr("class", "card col-md-2 col-5 text-center pl-1 pr-1");
        $(newDiv).attr("id", y );
        $(newDiv).attr("arraySpot", spot );
        $("#saladBar").append(newDiv);
        
    // Add Metrics
    var name = $("<div>").html("<strong>" + x.name + "</strong>");
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

    var meButton = $("<button>").attr("class", "btn meBtn");
        $(meButton).html("My Warrior");
        $(newDiv).append(meButton);
        $(meButton).hide();
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

            // Shows Attack, Shows Me Button, Hides Select Button, Hides Divs
            $(playerCard).attr("id", "player");
    
            $(".selectBtn").hide();
            $(".attackBtn").show(); 
            $(".attack").hide();
            $(".counter").hide();
            
            // Hides Attack Button | Using Descendant Selector Syntax    
            $( "#player .attackBtn" ).hide();
            $( "#player .meBtn" ).show();   

            // Change Message
            $("#message").html(playerObject.name + " Will Fight For Your Honnor.<br>Attack Your Foes!");

            // Me Button Function
            $(".meBtn").on("click", function() {
                $("#message").html(playerObject.name + " Says:<br>'Let's Get To Fighting!'")
            });

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
        $("#message").html(playerObject.name + " Attacks " + targetObject.name + " For " + totalPlayerAttack + "<br>" + targetObject.name +" Counter Attacks For " + targetObject.counterAttack);
        

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
            $("#message").hide();
            $(".card").remove();
            $("#jumbotron").show();
            $("#resetGame").show();
            $("#playGame").hide();
            $("#jumboMessage").html(playerObject.name + " Wins!<br>...But Something Is Brewing. Ready For More?");
        }
        
        // Check Loss Conditions
        if (playerObject.health < 1){
            $("#message").hide();   
            $(".card").remove();
            $("#jumbotron").show();
            $("#resetGame").show();
            $("#playGame").hide();
            $("#jumboMessage").html("Game Over <br> You're Dead Meat!")
        }
    });
}

// Document Ready Close
});

