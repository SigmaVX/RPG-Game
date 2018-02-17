// Create Objects For Salad Wariors

var grinder = {name: "Hoagies", health: 100, attack:5, counterAttack: 5};
var chopSuey = {name: "Chop Suey", health: 100, attack:5, counterAttack: 5};
var beans = {name: "Navy Beans", health: 100, attack:5, counterAttack: 5};
var meatloaf = {name: "Meatloaf", health: 100, attack:5, counterAttack: 5};
var sloppyJoe = {name: "Sloppy Joe", health: 100, attack:5, counterAttack: 5};


// DOM Elements
var saladBarHTML = document.getElementById("saladBar");
var lunchRoomHTML = document.getElementById("lunchRoom");

// Variable
var currentOpponent = ""; 

// To declair which object is the player
var player = "";

// To detect if players are in lunchroom
var picked = "";

// Dynamic text shown to users
var message = document.getElementById("message");

// Create & Place Player Cards
// To Do: Turn This Into A Function That Pass Along Object Names As a Parameter

function cardCreate(x, y, z, file ){
    var newDiv = $("<div>").html(x.name + "<br>" + "Health: " + x.health 
    + "<br>" + "Attack: " + x.attack + "<br>" + "Counter: " + x.counterAttack);
    $(newDiv).attr("class", "card col-2 text-center pl-1 pr-1");
    $(newDiv).attr("id", y );
    $("#saladBar").append(newDiv);
    var newImage = $("<img>").attr("src", file);
    $(newImage).attr("class", "img-fluid");
    $(newDiv).prepend(newImage);
    var attackButton = $("<button>").attr("class", "btn attackBtn");
    $(attackButton).html("Attack");
    $(attackButton).hide();
    $(newDiv).append(attackButton);
    var selectButton = $("<button>").attr("class", "btn selectBtn");
    $(selectButton).attr("id", z );
    $(selectButton).html("Select");
    $(newDiv).append(selectButton);
}

cardCreate(grinder, "grinder", "grinderBtn", "./assets/images/hoagie.jpg");
cardCreate(chopSuey, "chopSuey", "chopSueyBtn", "./assets/images/Chopsuey.png");
cardCreate(beans, "beans", "beansBtn", "./assets/images/beans.jpg");
cardCreate(meatloaf, "meatloaf", "meatloafBtn", "./assets/images/meatloaf.jpg");
cardCreate(sloppyJoe, "sloppyJoe", "sloppyJoeBtn", "./assets/images/sloppyjoe2.jpg");


// Start Of Game | Reset Key Metrics 
picked = false;
$(".s").text("Pick Your Produce");
$(player).attr("id", "");


 // Select The Player
 $(".selectBtn").on("click", function() {
    
    // Check That There Are No Other Cards In Area | Prevent Errors
    if(picked===false){
        var parentDiv = $(this).parent(); 
        $("#lunchRoom").append(parentDiv);
        picked = true;
        
        // This Assigns The Object To Player 
        var objectName = $(parentDiv).attr("id");
        console.log("object name log: " + objectName );
        player = Object.assign({}, objectName );
        console.log(player.name);
        
        
        $(parentDiv).attr("id", "player");
        $(".selectBtn").hide();
        $(".attackBtn").show();

          // Note the attr only has one attribute listed so JS konws to pass on data rather than store it
        //   $(fridgeMagnet).text($(this).attr("data-letter"));


    }
    else {
        // Do Nothing
        console.log("a: Nothing To Do");
        alert("Two Men Enter But Only One Can Be In The Lunchroom")
    }   


});

  



// Attack Function
// function attack(){
// $(this).attack

// maybe add ID to person that calls them opponent
// }

// Counter Attack Function

