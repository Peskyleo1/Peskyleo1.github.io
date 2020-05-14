var userPrefs;


//This function will wait for the html document to be fully loaded 
$( document ).ready(function() {
    setLanguage("it");
    try {
        //try getting user preferences
        //if there are user preferences hide first time mode items 
        //first time mode items:
            //-location asker box
            //-"thank you. now input skin" box
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        var skinType = userPrefs.skinType;
        if(userPrefs.darkMode == true){
            toggleDarkMode();
        }else{
            //leave page as is (day mode)
        }
    }catch (e){
        //if there are no user preferences set first time mode
        //first time mode: 
            //-ask for location
            //-ask for skin type
        var welcome = JSON.parse(window.localStorage.getItem("language")).Welcome.Title;
        $("#pageTitle").text(welcome);
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
            $("#LocationFoundData").text(position.coords.accuracy.toString());
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

    var language = JSON.parse(window.localStorage.getItem("language"));
    console.log(language);
    //if the item we touched is the first slider (#s1)...
    if(element.id == "s1"){
        //...if the slider value is 0...
        if(element.value == 0){
            //...show "Many"
            $("#t1").text(language.SkinOptions.Q1.O1);
        }
        if(element.value == 1){
            $("#t1").text(language.SkinOptions.Q1.O2);
        }
        if(element.value == 2){
            $("#t1").text(language.SkinOptions.Q1.O3);
        }
        if(element.value == 3){
            $("#t1").text(language.SkinOptions.Q1.O4);
        }
        if(element.value == 4){
            $("#t1").text(language.SkinOptions.Q1.O5);
        }
    }
    if(element.id == "s2"){
        if(element.value == 0){
            $("#t2").text(language.SkinOptions.Q2.O1);
        }
        if(element.value == 1){
            $("#t2").text(language.SkinOptions.Q2.O2);
        }
        if(element.value == 2){
            $("#t2").text(language.SkinOptions.Q2.O3);
        }
        if(element.value == 3){
            $("#t2").text(language.SkinOptions.Q2.O4);
        }
        if(element.value == 4){
            $("#t2").text(language.SkinOptions.Q2.O5);
        }
    }
    if(element.id == "s3"){
        if(element.value == 0){
            $("#t3").text(language.SkinOptions.Q3.O1);
        }
        if(element.value == 1){
            $("#t3").text(language.SkinOptions.Q3.O2);
        }
        if(element.value == 2){
            $("#t3").text(language.SkinOptions.Q3.O3);
        }
        if(element.value == 3){
            $("#t3").text(language.SkinOptions.Q3.O4);
        }
        if(element.value == 4){
            $("#t3").text(language.SkinOptions.Q3.O5);
        }
    }
    if(element.id == "s4"){
        if(element.value == 0){
            $("#t4").text(language.SkinOptions.Q4.O1);
        }
        if(element.value == 1){
            $("#t4").text(language.SkinOptions.Q4.O2);
        }
        if(element.value == 2){
            $("#t4").text(language.SkinOptions.Q4.O3);
        }
        if(element.value == 3){
            $("#t4").text(language.SkinOptions.Q4.O4);
        }
        if(element.value == 4){
            $("#t4").text(language.SkinOptions.Q4.O5);
        }
    }
    if(element.id == "s5"){
        if(element.value == 0){
            $("#t5").text(language.SkinOptions.Q5.O1);
        }
        if(element.value == 1){
            $("#t5").text(language.SkinOptions.Q5.O2);
        }
        if(element.value == 2){
            $("#t5").text(language.SkinOptions.Q5.O3);
        }
        if(element.value == 3){
            $("#t5").text(language.SkinOptions.Q5.O4);
        }
        if(element.value == 4){
            $("#t5").text(language.SkinOptions.Q5.O5);
        }
    }
    if(element.id == "s6"){
        if(element.value == 0){
            $("#t6").text(language.SkinOptions.Q6.O1);
        }
        if(element.value == 1){
            $("#t6").text(language.SkinOptions.Q6.O2);
        }
        if(element.value == 2){
            $("#t6").text(language.SkinOptions.Q6.O3);
        }
        if(element.value == 3){
            $("#t6").text(language.SkinOptions.Q6.O4);
        }
        if(element.value == 4){
            $("#t6").text(language.SkinOptions.Q6.O5);
        }
    }
    if(element.id == "s7"){
        if(element.value == 0){
            $("#t7").text(language.SkinOptions.Q7.O1);
        }
        if(element.value == 1){
            $("#t7").text(language.SkinOptions.Q7.O2);
        }
        if(element.value == 2){
            $("#t7").text(language.SkinOptions.Q7.O3);
        }
        if(element.value == 3){
            $("#t7").text(language.SkinOptions.Q7.O4);
        }
        if(element.value == 4){
            $("#t7").text(language.SkinOptions.Q7.O5);
        }
    }
    if(element.id == "s8"){
        if(element.value == 0){
            $("#t8").text(language.SkinOptions.Q8.O1);
        }
        if(element.value == 1){
            $("#t8").text(language.SkinOptions.Q8.O2);
        }
        if(element.value == 2){
            $("#t8").text(language.SkinOptions.Q8.O3);
        }
        if(element.value == 3){
            $("#t8").text(language.SkinOptions.Q8.O4);
        }
        if(element.value == 4){
            $("#t8").text(language.SkinOptions.Q8.O5);
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
    }catch (e){
        //will create the skinType "directory" and update skinType
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        var skinType = calculate();
        var skinTypeRounded = Math.round(skinType);
        userPrefs = {
            skinType: skinTypeRounded,
            favoriteCreams: {
                c1: "",
                c2: "",
                c3: ""
            },
            language: "",
            darkMode: false
        }
        
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        window.location.href = "index.html";
    }
}

function toggleDarkMode(){
    $("").toggleClass("dark-mode__");

    $("body").toggleClass("dark-mode__body");
    $("#AskForLocation").toggleClass("dark-mode__Div");
    $("#SelectSkin").toggleClass("dark-mode__Div");

    $("h3").toggleClass("dark-mode__h3");
    $("h4").toggleClass("dark-mode__h4");
    $("h5").toggleClass("dark-mode__h5");
    $("h6").toggleClass("dark-mode__h6");

    $(".form-control").toggleClass("dark-mode__formControl");
    $(".spacer").toggleClass("dark-mode__spacer");
    $(".mdl-tabs__tab-bar").toggleClass("dark-mode__mdl-tabs__tab-bar");
    $(".mdl-tabs__tab").toggleClass("dark-mode__mdl-tabs__tab");
    $(".modal-content").toggleClass("dark-mode__modal-content");
    $(".mdl-layout__drawer").toggleClass("dark-mode__mdl-layout__drawer");
    $(".mdl-navigation__link").toggleClass("dark-mode__mdl-navigation__link");
    $(".mdl-layout-title").toggleClass("dark-mode__mdl-layout-title");
}

function setLanguage(language){
    var lang = language;
    $.getJSON("../assets/data/languages.json", function(languagePack) {
        window.localStorage.setItem("language", JSON.stringify(languagePack[lang]));
        $("#PageTitle").text(languagePack[lang].SkinType);
        //MENU
        $("#CalculatorText").text(languagePack[lang].Calculator);
        $("#SkinTypeText").text(languagePack[lang].SkinType);
        $("#FAQText").text(languagePack[lang].FAQ);
        $("#SettingsText").text(languagePack[lang].Settings);
        $("#DownloadText").text(languagePack[lang].Download);
        //Errors
            //Titles
            $("#PermissionDeniedTitleCalc").text(languagePack[lang].LocationDenied.Title);
            $("#LocationUnavailableTitleCalc").text(languagePack[lang].LocationUnavailable.Title);
            $("#LocationTimeoutTitleCalc").text(languagePack[lang].LocationTimeout.Title);
            $("#UnknownLocationErrorTitleCalc").text(languagePack[lang].UnknownLocation.Title);
            $("#NoAltitudeTitleCalc").text(languagePack[lang].NoAltitude.Title);
            $("#LocationFoundTitle").text(languagePack[lang].LocationFound.Title);
            $("#LocationWelcome").text(languagePack[lang].Welcome.Title);
            $("#Part1Text").text(languagePack[lang].Skin.Title);
            $("#Part2Text").text(languagePack[lang].Skin.Title2);
            
            //Texts
            $("#PermissionDeniedTextCalc").text(languagePack[lang].LocationDenied.Text);
            $("#LocationUnavailableTextCalc").text(languagePack[lang].LocationUnavailable.Text);
            $("#LocationTimeoutTextCalc").text(languagePack[lang].LocationTimeout.Text);
            $("#LocationUnavailableText2Calc").text(languagePack[lang].LocationUnavailable.Text2);
            $("#LocationTimeoutText2Calc").text(languagePack[lang].LocationTimeout.Text2);
            $("#UnknownLocationErrorTextCalc").text(languagePack[lang].UnknownLocation.Text);
            $("#LocationFoundText1").text(languagePack[lang].LocationFound.Text1);
            $("#LocationFoundText2").text(languagePack[lang].LocationFound.Text2);
            $("#LocationFoundText3").text(languagePack[lang].LocationFound.Text3);
            $("#WelcomeText1").text(languagePack[lang].Welcome.Text1);
            $("#WelcomeText2").text(languagePack[lang].Welcome.Text2);
            $("#WelcomeText3").text(languagePack[lang].Welcome.Text3);
            $("#WelcomeText4").text(languagePack[lang].Welcome.Text4);
            $("#WelcomeText5").text(languagePack[lang].Welcome.Text5);
            $(".LocationText").text(languagePack[lang].Location);
            $(".SkinTypeText").text(languagePack[lang].SkinType);

            $("#Q1").text(languagePack[lang].Skin.Text1);
            $("#Q2").text(languagePack[lang].Skin.Text2);
            $("#Q3").text(languagePack[lang].Skin.Text3);
            $("#Q4").text(languagePack[lang].Skin.Text4);
            $("#Q5").text(languagePack[lang].Skin.Text5);
            $("#Q6").text(languagePack[lang].Skin.Text6);
            $("#Q7").text(languagePack[lang].Skin.Text7);
            $("#Q8").text(languagePack[lang].Skin.Text8);
            $("#keepGoingText").text(languagePack[lang].Skin.KeepGoing);
            $("#SaveSkinButton").text(languagePack[lang].Skin.SaveSkin);
        
            $("#t1").text(languagePack[lang].SkinOptions.Q1.O1);
            $("#t2").text(languagePack[lang].SkinOptions.Q2.O1);
            $("#t3").text(languagePack[lang].SkinOptions.Q3.O1);
            $("#t4").text(languagePack[lang].SkinOptions.Q4.O1);
            $("#t5").text(languagePack[lang].SkinOptions.Q5.O1);
            $("#t6").text(languagePack[lang].SkinOptions.Q6.O1);
            $("#t7").text(languagePack[lang].SkinOptions.Q7.O1);
            $("#t8").text(languagePack[lang].SkinOptions.Q8.O1);

        //Modal Common
        $(".closeButton").text(languagePack[lang].Close);

        //SkinTypeModal
        $("#SkinTypeModalTitle").text(languagePack[lang].WhySkinModal.Title);
        $("#SkinTypeModalTitle2").text(languagePack[lang].WhySkinModal.Title2);
        $("#SkinTypeModalText1").text(languagePack[lang].WhySkinModal.Text1);
        $("#SkinTypeModalText2").text(languagePack[lang].WhySkinModal.Text2);

        //Location Modal
        $("#LocationModalTitle").text(languagePack[lang].WhyLocationModal.Title);
        $("#LocationModalTitle2").text(languagePack[lang].WhyLocationModal.Title2);
        $("#LocationModalText1").text(languagePack[lang].WhyLocationModal.Text1);
        $("#LocationModalText2").text(languagePack[lang].WhyLocationModal.Text2);
        $("#LocationModalText3").text(languagePack[lang].WhyLocationModal.Text3);
        $("#LocationModalText4").text(languagePack[lang].WhyLocationModal.Text4);
        $("#LocationModalText5").text(languagePack[lang].WhyLocationModal.Text5);
        $("#LocationModalText6").text(languagePack[lang].WhyLocationModal.Text6);
        $("#LocationModalText7").text(languagePack[lang].WhyLocationModal.Text7);
        $("#LocationModalText8").text(languagePack[lang].WhyLocationModal.Text8);
        

    });
    
}