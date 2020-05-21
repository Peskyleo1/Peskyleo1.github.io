
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
    try {
        //getting info
        var userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        if (userPrefs.skinType == ""){
            window.location.href = "skin.html";
        }else{
            //we have data
        }
    }catch (e){
        //redirect
        window.location.href = "skin.html";
    }
    try{
        //get all info and populate page
        console.log("load.try");
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        console.log(userPrefs);
        $("#languages").val(userPrefs.language);
        $("#Favorite1").val(userPrefs.favoriteCreams.c1);
        $("#Favorite2").val(userPrefs.favoriteCreams.c2);
        $("#Favorite3").val(userPrefs.favoriteCreams.c3);
        $('#darkModeSwitch').prop('checked', userPrefs.darkMode);
        if(userPrefs.darkMode == true){
            $('#darkModeSwitchParent').addClass("is-checked");
            toggleDarkMode();
        }else{
            //not checked by default
        }
    }catch (e){
        //unable to get all info. Try to populate with what you can.
        try{
            //getting the language
            $("#languages").val(userPrefs.language);
            console.log("language: " + userPrefs.language);
        }catch (e){
            //dont do anything
            console.log("failed getting language");
        }
        try{
            //getting favorite creams
            $("#Favorite1").val(userPrefs.favoriteCreams.c1);
            $("#Favorite2").val(userPrefs.favoriteCreams.c2);
            $("#Favorite3").val(userPrefs.favoriteCreams.c3);
        }catch (e){
            //dont do anything
            console.log("failed getting favorite creams");
        }
        try{
            //getting darkmode
            $('#darkModeSwitch').prop('checked', userPrefs.darkMode);
            if(userPrefs.darkMode == true){
                $('#darkModeSwitchParent').addClass("is-checked");
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

function saveSettings(){
    var save = JSON.parse(window.localStorage.getItem("language")).Save;
    var saved = JSON.parse(window.localStorage.getItem("language")).Saved;
    try{
        //Will update existing options
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        userPrefs.language = $("#languages").val();
        userPrefs.favoriteCreams = {c1: $("#Favorite1").val(), c2: $("#Favorite2").val(), c3: $("#Favorite3").val()};
        userPrefs.darkMode = $('#darkModeSwitch').prop('checked');
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        setLanguage(userPrefs.language);
        $("#SaveButton").html(`<i style='margin-top: -4px;' class='material-icons'>check</i> ${saved}`);
        setTimeout(function(){ $("#SaveButton").html(`<i style='margin-top: -4px;' class='material-icons'>save</i> ${save}`); }, 2000);
        
    }catch (e){
        //If some options don't exist yet, they will be created and saved
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        userPrefs = {
            skinType: userPrefs.skinType,
            favoriteCreams: {
                c1: $("#Favorite1").val(),
                c2: $("#Favorite2").val(),
                c3: $("#Favorite3").val()
            },
            language: $("#languages").val(),
            darkMode: $('#darkModeSwitch').prop('checked')
        }
        setLanguage(userPrefs.language);
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        $("#SaveButton").html(`<i style='margin-top: -4px;' class='material-icons'>check</i> ${saved}`);
        setTimeout(function(){ $("#SaveButton").html(`<i style='margin-top: -4px;' class='material-icons'>save</i> ${save}`); }, 2000);
        
    }
}

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
        
        $("#PageTitle").text(languagePack[lang].Settings);
        //MENU
        $("#CalculatorText").text(languagePack[lang].Calculator);
        $("#SkinTypeText").text(languagePack[lang].SkinType);
        $("#FAQText").text(languagePack[lang].FAQ);
        $("#SettingsText").text(languagePack[lang].Settings);
        $("#DownloadText").text(languagePack[lang].Download);
        //Page Main Section Titles
        $("#LanguageText").text(languagePack[lang].Language);
        $("#SelectText").text(languagePack[lang].Select);
        $("#DarkModeText").text(languagePack[lang].DarkMode);
        $("#SkinTypeText1").text(languagePack[lang].SkinType);
        $("#FavoriteCreamsText").text(languagePack[lang].FavoriteCreams);
        //Buttons
        $("#SaveText").text(languagePack[lang].Save);
        $("#ChangeText").text(languagePack[lang].Change);
        

    });
    
}