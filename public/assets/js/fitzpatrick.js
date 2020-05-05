var userPrefs;


//This function will wait for the html document to be fully loaded 
$( document ).ready(function() {
    try {
        //try getting user preferences
        //if there are user preferences hide first time mode items 
        //first time mode items:
            //-location asker box
            //-"thank you. now input skin" box
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        var skinType = userPrefs.skinType;
    }catch{
        //if there are no user preferences set first time mode
        //first time mode: 
            //-ask for location
            //-ask for skin type
        console.log("No user info: Welcome!");
        $("#AskForLocation").css("display","inherit");
    }
    
});

function getLocation() {
    if (navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(showPosition);
      //console.log("Location: Fetching...");
        navigator.geolocation.getCurrentPosition(function(position) {
            //Asking for location to the user
            $("#AskForLocation").css("display","none");
            $("#LocationSuccess").css("display","inherit");
            $("#accuracyText").children("span").text(position.coords.accuracy.toString());
            console.log("Location Accuracy: " + position.coords.accuracy.toString());
            //showPosition(position);
        },
        function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.")
                  $("#LocationDenied").css("display","inherit");
                  break;
                case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.")
                  $("#LocationUnavailable").css("display","inherit");
                  break;
                case error.TIMEOUT:
                  console.log("The request to get user location timed out.")
                  $("#LocationTimeout").css("display","inherit");
                  break;
                case error.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.")
                  $("#UnknownLocationError").css("display","inherit");
                  break;
              }
        });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
}

//This function is run when any of the input fields on this page is changed
//the element parameter of the corrisponding trigger is passed into the function
//so that we can retrieve the id of the trigger. This will help us
//determine which slider has been changed and which <p> has to be 
//updated accordingly.
function showValue(element){
    /*
    Now we will check which slider has been moved by checking with an id
    system, and we will update the texts relating to the respective slider
    accordingly.
    ID nomenclature system on html:
    Sliders: start with an "s" and are followed by a number that increases
             by 1 for each slider.
    <p>'s  : start with a "t" and are followed by a number that increases
             by 1 for each text.

             The number following the sliders' and texts' ids are the same 
             for each slider-text pair.
    */

    //if the item we touched is the first slider (#s1)...
    if(element.id == "s1"){
        //...if the slider value is 0...
        if(element.value == 0){
            //...show "Many"
            $("#t1").text("Many");
        }
        if(element.value == 1){
            $("#t1").text("Several");
        }
        if(element.value == 2){
            $("#t1").text("A Few");
        }
        if(element.value == 3){
            $("#t1").text("Very Few");
        }
        if(element.value == 4){
            $("#t1").text("None");
        }
    }
    if(element.id == "s2"){
        if(element.value == 0){
            $("#t2").text("Red or Light Blonde");
        }
        if(element.value == 1){
            $("#t2").text("Blonde");
        }
        if(element.value == 2){
            $("#t2").text("Dark Blonde or Light Brown");
        }
        if(element.value == 3){
            $("#t2").text("Dark Brown");
        }
        if(element.value == 4){
            $("#t2").text("Black");
        }
    }
    if(element.id == "s3"){
        if(element.value == 0){
            $("#t3").text("Light Blue, Light Gray or Light Green");
        }
        if(element.value == 1){
            $("#t3").text("Blue, Gray or Green");
        }
        if(element.value == 2){
            $("#t3").text("Light Brown");
        }
        if(element.value == 3){
            $("#t3").text("Dark Brown");
        }
        if(element.value == 4){
            $("#t3").text("Brownish Black");
        }
    }
    if(element.id == "s4"){
        if(element.value == 0){
            $("#t4").text("Ivory White");
        }
        if(element.value == 1){
            $("#t4").text("Fair or Pale");
        }
        if(element.value == 2){
            $("#t4").text("Fair to Beige, with golden undertone");
        }
        if(element.value == 3){
            $("#t4").text("Olive or Light Brown");
        }
        if(element.value == 4){
            $("#t4").text("Dark Brown or Black");
        }
    }
    if(element.id == "s5"){
        if(element.value == 0){
            $("#t5").text("Never, I always burn");
        }
        if(element.value == 1){
            $("#t5").text("Rarely");
        }
        if(element.value == 2){
            $("#t5").text("Sometimes");
        }
        if(element.value == 3){
            $("#t5").text("Often");
        }
        if(element.value == 4){
            $("#t5").text("Always");
        }
    }
    if(element.id == "s6"){
        if(element.value == 0){
            $("#t6").text("Always burns, blisters and peels");
        }
        if(element.value == 1){
            $("#t6").text("Often burns, blisters and peels");
        }
        if(element.value == 2){
            $("#t6").text("Burns Moderately");
        }
        if(element.value == 3){
            $("#t6").text("Burns Rarely, if at all");
        }
        if(element.value == 4){
            $("#t6").text("Never burns");
        }
    }
    if(element.id == "s7"){
        if(element.value == 0){
            $("#t7").text("Very Sensitive");
        }
        if(element.value == 1){
            $("#t7").text("Sensitive");
        }
        if(element.value == 2){
            $("#t7").text("Normal");
        }
        if(element.value == 3){
            $("#t7").text("Resistant");
        }
        if(element.value == 4){
            $("#t7").text("Very resistant / Never has a problem");
        }
    }
    if(element.id == "s8"){
        if(element.value == 0){
            $("#t8").text("Not at all or very little");
        }
        if(element.value == 1){
            $("#t8").text("Lightly");
        }
        if(element.value == 2){
            $("#t8").text("Moderately");
        }
        if(element.value == 3){
            $("#t8").text("Deeply");
        }
        if(element.value == 4){
            $("#t8").text("My skin is naturally dark");
        }
    }
    calculate();
}


//This function gets the value of each slider, sums them together and 
//passes the result to changeColor function as a parameter
function calculate(){
    var s1 = Number($("#s1").val());
    var s2 = Number($("#s2").val());
    var s3 = Number($("#s3").val());
    var s4 = Number($("#s4").val());
    var s5 = Number($("#s5").val());
    var s6 = Number($("#s6").val());
    var s7 = Number($("#s7").val());
    var s8 = Number($("#s8").val());

    var total = (s1+s2+s3+s4+s5+s6+s7+s8)*1.125;

    changeColor(total);
    return total;
}

//Each value has a corresponding number. This function compares the "total"
//number from the previous function and sets the corrisponding colour 
//to the bottom bar.
function changeColor(value){
    //Color-Value database
    var c0 = "#ffffff";
    var c1 = "#f4f2f5";
    var c2 = "#ecebe9";
    var c3 = "#faf9f7";
    var c4 = "#fdfbe6";
    var c5 = "#fdf5e6";
    var c6 = "#fef6e5";
    var c7 = "#faefef";
    var c8 = "#f3eae5";
    var c9 = "#f4f1ea";
    var c10 = "#fbfcf4";
    var c11 = "#fcf8ed";
    var c12 = "#fef5e1";
    var c13 = "#fff9e1";
    var c14 = "#fff9e1";
    var c15 = "#f1e7c3";
    var c16 = "#efe1ad";
    var c17 = "#dfd193";
    var c18 = "#f2e197";
    var c19 = "#ebd69f";
    var c20 = "#ebd885";
    var c21 = "#e3c467";
    var c22 = "#e1c16a";
    var c23 = "#dfc17b";
    var c24 = "#deb877";
    var c25 = "#c7a464";
    var c26 = "#bc9763";
    var c27 = "#9c6b43";
    var c28 = "#8e583e";
    var c29 = "#794d30";
    var c30 = "#643116";
    var c31 = "#653020";
    var c32 = "#613121";
    var c33 = "#573228";
    var c34 = "#402015";
    var c35 = "#312528";
    var c36 = "#1a1c2d";

    //add "c" to the value passed in as a parameter in order to use it as
    //a call for one of the variable
    var color = "c" + Math.round(value);

    //set background to color
    //eval() is used convert a string to a variable name
    $("#SkinColorPreview").css("background-color", eval(color));
    $("#VLNumberText").text("Von Luschan Value: "+Math.round(value)+"pts");

    //Set a color for the text in order to make it readable on the background
    if(value < 18){
        $("#VLNumberText").css("color", "#5c5c5c");
    }else{
        $("#VLNumberText").css("color", "white");
    }
}

function saveSkin(){
    try{
        //will update the skinType item only
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        var skinType = calculate();
        var skinTypeRounded = Math.round(skinType);
        userPrefs.skinType = skinTypeRounded;
        
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        window.location.href = "index.html";
    }catch{
        //will create the skinType "directory" and update skinType
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        var skinType = calculate();
        var skinTypeRounded = Math.round(skinType);
        userPrefs = {
            skinType: skinTypeRounded
        }
        
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        window.location.href = "index.html";
    }
}