
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
    $(".QuestionDiv").toggleClass("dark-mode__Div");
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
        
        $("#PageTitle").text(languagePack[lang].FAQ);
        //MENU
        $("#CalculatorText").text(languagePack[lang].Calculator);
        $("#SkinTypeText").text(languagePack[lang].SkinType);
        $("#FAQText").text(languagePack[lang].FAQ);
        $("#SettingsText").text(languagePack[lang].Settings);
        $("#DownloadText").text(languagePack[lang].Download);
        //Titles
        $("#Title1").text(languagePack[lang].FAQs.Titles.Title1);
        $("#Title2").text(languagePack[lang].FAQs.Titles.Title2);
        $("#Title3").text(languagePack[lang].FAQs.Titles.Title3);
        $("#Title4").text(languagePack[lang].FAQs.Titles.Title4);
        $("#Title5").text(languagePack[lang].FAQs.Titles.Title5);
        $("#Title6").text(languagePack[lang].FAQs.Titles.Title6);
        $("#Title7").text(languagePack[lang].FAQs.Titles.Title7);
        $("#Title8").text(languagePack[lang].FAQs.Titles.Title8);
        $("#Title9").text(languagePack[lang].FAQs.Titles.Title9);
        $("#Title10").text(languagePack[lang].FAQs.Titles.Title10);
        $("#Title11").text(languagePack[lang].FAQs.Titles.Title11);
        $("#Title12").text(languagePack[lang].FAQs.Titles.Title12);
        $("#Title13").text(languagePack[lang].FAQs.Titles.Title13);
        $("#Title14").text(languagePack[lang].FAQs.Titles.Title14);
        $("#Title15").text(languagePack[lang].FAQs.Titles.Title15);
        $("#Title16").text(languagePack[lang].FAQs.Titles.Title16);
        //Texts 4911
        $("#Answer1-1").text(languagePack[lang].FAQs.Texts.Text1_1);
        $("#Answer2-1").text(languagePack[lang].FAQs.Texts.Text2_1);
        $("#Answer3-1").text(languagePack[lang].FAQs.Texts.Text3_1);

        $("#Answer4-1").text(languagePack[lang].FAQs.Texts.Text4_1);
        $("#Answer4-2").text(languagePack[lang].FAQs.Texts.Text4_2);
        $("#Answer4-3").text(languagePack[lang].FAQs.Texts.Text4_3);
        $("#Answer4-4").text(languagePack[lang].FAQs.Texts.Text4_4);

        $("#Answer5-1").text(languagePack[lang].FAQs.Texts.Text5_1);
        $("#Answer6-1").text(languagePack[lang].FAQs.Texts.Text6_1);
        $("#Answer7-1").text(languagePack[lang].FAQs.Texts.Text7_1);
        $("#Answer8-1").text(languagePack[lang].FAQs.Texts.Text8_1);

        $("#Answer9-1").text(languagePack[lang].FAQs.Texts.Text9_1);
        $("#Answer9-2").text(languagePack[lang].FAQs.Texts.Text9_2);
        $("#Answer9-3").text(languagePack[lang].FAQs.Texts.Text9_3);
        $("#Answer9-4").text(languagePack[lang].FAQs.Texts.Text9_4);

        $("#Answer10-1").text(languagePack[lang].FAQs.Texts.Text10_1);
        
        $("#Answer11-1").text(languagePack[lang].FAQs.Texts.Text11_1);
        $("#Answer11-2").text(languagePack[lang].FAQs.Texts.Text11_2);
        $("#Answer11-3").text(languagePack[lang].FAQs.Texts.Text11_3);
        $("#Answer11-4").text(languagePack[lang].FAQs.Texts.Text11_4);

        $("#Answer12-1").text(languagePack[lang].FAQs.Texts.Text12_1);
        $("#Answer13-1").text(languagePack[lang].FAQs.Texts.Text13_1);
        $("#Answer14-1").text(languagePack[lang].FAQs.Texts.Text14_1);
        $("#Answer15-1").text(languagePack[lang].FAQs.Texts.Text15_1);
        $("#Answer16-1").text(languagePack[lang].FAQs.Texts.Text16_1);
        //Buttons
        $(".Source1").text(languagePack[lang].Source);
        $(".Disclaimer").text(languagePack[lang].Disclaimer);
        

    });
    
}