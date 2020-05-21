

//This function will wait for the html document to be fully loaded 
$( document ).ready(function() {
    
    try{
        //setting language
        var language = JSON.parse(window.localStorage.getItem("userPrefs")).language;
        if(language == ""){
            setLanguage("en");
        }else{
            setLanguage(language);
        }
    }catch (e){
        //set english
        setLanguage("en");
    }
    try{
        //try getting userPrefs
        var userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        if(userPrefs.darkMode == true){
            toggleDarkMode();
        }else{
            //leave page as is (day mode)
        }
        
    }catch (e){
        //if first time using the app and there are no userPrefs redirect to
        //skin.html that will act as an onboarding page
        window.location.href = "skin.html";
    }

});

function toggleDarkMode(){
    $("").toggleClass("dark-mode__");

    $("body").toggleClass("dark-mode__body");
    $("#AutoCalculateBlock").toggleClass("dark-mode__Div");
    $("#ManualCalculateBlock").toggleClass("dark-mode__Div");
    $("#LoadingContentDiv").toggleClass("dark-mode__Div");

    $("h3").toggleClass("dark-mode__h3");
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
    $(".mdl-layout__content").toggleClass("dark-mode__mdl-layout__content");
}

function setLanguage(language){
    var lang = language || "en";
    $.getJSON("../assets/data/languages.json", function(languagePack) {
        
        $("#PageTitle").text(languagePack[lang].Download);
        //MENU
        $("#CalculatorText").text(languagePack[lang].Calculator);
        $("#SkinTypeText").text(languagePack[lang].SkinType);
        $("#FAQText").text(languagePack[lang].FAQ);
        $("#SettingsText").text(languagePack[lang].Settings);
        $("#DownloadText").text(languagePack[lang].Download);
        
    });
    
}