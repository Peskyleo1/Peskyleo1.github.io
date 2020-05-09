
$( document ).ready(function() {
    toggleDarkMode();
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
        }else{
            //not checked by default
        }
    }catch{
        //unable to get all info. Try to populate with what you can.
        try{
            //getting the language
            $("#languages").val(userPrefs.language);
            console.log("language: " + userPrefs.language);
        }catch{
            //dont do anything
            console.log("failed getting language");
        }
        try{
            //getting favorite creams
            $("#Favorite1").val(userPrefs.favoriteCreams.c1);
            $("#Favorite2").val(userPrefs.favoriteCreams.c2);
            $("#Favorite3").val(userPrefs.favoriteCreams.c3);
        }catch{
            //dont do anything
            console.log("failed getting favorite creams");
        }
        try{
            //getting darkmode
            $('#darkModeSwitch').prop('checked', userPrefs.darkMode);
            if(userPrefs.darkMode == true){
                $('#darkModeSwitchParent').addClass("is-checked");
                $("body").toggleClass("dark-mode");
            }else{
                //not checked by default
            }
            console.log("darkmode: " + userPrefs.darkMode);
        }catch{
            //dont do anything
            console.log("failed getting darkmode");
        }
       
    }

});

function saveSettings(){
    try{
        //Will update existing options
        userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        userPrefs.language = $("#languages").val();
        userPrefs.favoriteCreams = {c1: $("#Favorite1").val(), c2: $("#Favorite2").val(), c3: $("#Favorite3").val()};
        userPrefs.darkMode = $('#darkModeSwitch').prop('checked');
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        $("#SaveButton").html("<i style='margin-top: -4px;' class='material-icons'>check</i> Saved");
        setTimeout(function(){ $("#SaveButton").html("<i style='margin-top: -4px;' class='material-icons'>save</i> Save"); }, 2000);
        
    }catch{
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
        
        console.log(userPrefs);
        window.localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
        $("#SaveButton").html("<i style='margin-top: -4px;' class='material-icons'>check</i> Saved");
        setTimeout(function(){ $("#SaveButton").html("<i style='margin-top: -4px;' class='material-icons'>save</i> Save"); }, 2000);
        
    }
}

function toggleDarkMode(){
    $("").toggleClass("dark-mode__");

    $("body").toggleClass("dark-mode__body");
    $("#SettingsDiv").toggleClass("dark-mode__Div");
    $("h6").toggleClass("dark-mode__h6");
    $(".form-control").toggleClass("dark-mode__formControl");
    $(".spacer").toggleClass("dark-mode__spacer");
}