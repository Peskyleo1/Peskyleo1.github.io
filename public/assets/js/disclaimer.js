
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
        //set english as default
        setLanguage("en");
    }
    try{
        //get all info and populate page
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        if(userPrefs.darkMode == true){
            toggleDarkMode();
        }else{
            //not checked by default
        }
    }catch (e){
        try{
            //getting darkmode
            if(userPrefs.darkMode == true){
                toggleDarkMode();
            }else{
                //not checked by default
            }
            console.log("darkmode: " + userPrefs.darkMode);
        }catch (e){
            //dont do anything
            console.log("failed getting darkmode");
        }
       
    }

});

function toggleDarkMode(){
    $("").toggleClass("dark-mode__");

    $("body").toggleClass("dark-mode__body");
    $("#SettingsDiv").toggleClass("dark-mode__Div");
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
        window.localStorage.setItem("language", JSON.stringify(languagePack[lang]));
        
        $("#PageTitle").text(languagePack[lang].Disclaimer);
        //MENU
        $("#CalculatorText").text(languagePack[lang].Calculator);
        $("#SkinTypeText").text(languagePack[lang].SkinType);
        $("#FAQText").text(languagePack[lang].FAQ);
        $("#SettingsText").text(languagePack[lang].Settings);
        $("#DownloadText").text(languagePack[lang].Download);
        //Page Main Section Titles
        $("#Title1").text(languagePack[lang].Disclaimer);
        $("#infoText").text(languagePack[lang].DisclaimerText);
        

    });
    
}