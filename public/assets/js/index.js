
window.onload = function onLoad() {
    var circle = new ProgressBar.Circle('#progress', {
        color: '#ffab41',
        duration: 1000,
        easing: 'linear'
    });

    //circle.animate(1);
};


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
        populateFavoriteCreams();
        if(userPrefs.darkMode == true){
            toggleDarkMode();
        }else{
            //leave page as is (day mode)
        }
        getLocation();
        
    }catch (e){
        //if first time using the app and there are no userPrefs redirect to
        //skin.html that will act as an onboarding page
        window.location.href = "skin.html";
    }

});

function populateFavoriteCreams(){
    var userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
        if(userPrefs.favoriteCreams.c1 == ""){
            //dont populate c1
        }else{
            $("#QS2").text(userPrefs.favoriteCreams.c1);
            $("#QS2").attr("href", "#fav1");
        }
        if(userPrefs.favoriteCreams.c2 == ""){
            //dont populate c2
        }else{
            $("#QS3").text(userPrefs.favoriteCreams.c2);
            $("#QS3").attr("href", "#fav1");
        }
        if(userPrefs.favoriteCreams.c3 == ""){
            //dont populate c3
        }else{
            $("#QS4").text(userPrefs.favoriteCreams.c3);
            $("#QS4").attr("href", "#fav1");
        }
}

//When called, this function will ask user for location
function getLocation() {
    if (navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(showPosition);
      //console.log("Location: Fetching...");
        navigator.geolocation.getCurrentPosition(function(position) {
            //Asking for location to the user
            console.log("Location: Fetching...");
            $("#LoadingQuickInfo").prepend("<span>Location: Fetching...</span><br><br>");
            showPosition(position);
        },
        function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation. Auto mode wont work.")
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
      $("#LoadingQuickInfo").prepend("<span>Geolocation is not supported by this browser</span><br><br>");
    }
}
//This is run after having the location
function showPosition(position) {

    //---------- Position Retrieval ----------
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    $("#LoadingQuickInfo").prepend(`<span>Latitude: ${position.coords.latitude}</span><br><br>`);
    $("#LoadingQuickInfo").prepend(`<span>Longitude: ${position.coords.longitude}</span><br><br>`);

    //---------- Weather Retrieval ----------
    getWeather(position);
    
    
}

function getAltitude(position, callback) {
    try{
        //On some browsers/devices it is not possible to retrieve the altitude via
        //location services. The altitude will therefore be null in that case.

        //Condition to see if i'm able to retrieve the altitude or not via location services
        if(position.coords.altitude == null){
            //Unable to fetch altitude via location services
            console.log("Altitude: Unable to fetch via location services");
            console.log("Altitude: Fetching via altitude API...")
            $("#LoadingQuickInfo").prepend("<span>Altitude: Unable to fetch via location services</span><br><br>");
            $("#LoadingQuickInfo").prepend("<span>Altitude: Fetching via altitude API...</span><br><br>");

            //Will fetch altitude by getting terrain elevation for fetched coordinates
            //(global terrain elevation data from NASA's "Aster30m" dataset. 
            //hosted on opentopodata API.)
            try{
                $.get('https://cors-anywhere.herokuapp.com/https://api.opentopodata.org/v1/aster30m?locations='+position.coords.latitude+','+position.coords.longitude+'&interpolation=cubic', function(responseText) {
                    //Altitude fetched from terrain data API
                    console.log("Altitude: " + responseText.results[0].elevation);
                    $("#LoadingQuickInfo").prepend(`<span>Altitude: ${responseText.results[0].elevation}m</span><br><br>`);

                    //Callback function called instead of returning. This will make sure
                    //we have an altitude value before adding altitude data to Weather.Location
                    callback(responseText.results[0].elevation);
                }).fail(function() {
                    $("#NoAltitude").css("display", "inherit");
                    console.log("no alt");
                    callback(Number("0"));
                });
            }catch (e){
                $("#NoAltitude").css("display", "inherit");
                console.log("no alt");
                callback(Number("0"));
            }
        }else{
            //Altitude found via location services
            console.log("Altitude: " + position.coords.altitude);
            console.log("Location: FOUND");
            $("#LoadingQuickInfo").prepend(`<span>Altitude: ${position.coords.altitude}</span><br><br>`);
            $("#LoadingQuickInfo").prepend(`<span>Location: FOUND</span><br><br>`);
            
            callback(responseText.results[0].elevation);
        }
    }catch (e){
        callback(position.coords.altitude);
    }
}

function getWeather(position){
    /*
    It is important to limit API calls in order to reduce costs/bandwidth usage.
    We will therefore first check if we have some weather data locally.
        -If we don't, the API will be called and weather data will be saved for the first time.
        -If we do, we need to check how recent it is.
            -If it is older than 20minutes, we will have to call the weather API again and save the
            data locally
            -If it is less then 20minutes old, we will use it.
    */

    //Check if we were able to find weather data in our localStorage
    var success = JSON.parse(window.localStorage.getItem("weatherData"));
    if(success){
        //Data found in local storage
        console.log("Retrieving Data: Successful. Data found in Local Storage");
        $("#LoadingQuickInfo").prepend("<span>Retrieving Data: Successful. Data found in Local Storage</span><br><br>");
        //---------- Weather Data Age Check ----------
        //Get a new weather update from the server only if your local data is older than 20mins
        //(this should reduce number of calls from API to an acceptable UV precision)

        //converting "20" minutes to seconds, as we will be adressing time as "epoch"
        var timeDifference = 20 * 60;
        //the weather API gives us an UTC offset for the location we fetched weather for. And it must be factored in the age
        //var utcOffset = JSON.parse(window.localStorage.getItem("weatherData")).location.utc_offset;
        //getting the current date will give us an "epoch" in milliseconds
        var currentDatems = new Date().getTime().toString();
        //we will convert the millisecond "epoch" in seconds by slicing it
        var currentDate = Number(currentDatems.slice(0, -3));
        //we will get the storedDate by factoring in the UTC offset
        var storedDate = JSON.parse(window.localStorage.getItem("weatherData")).DownloadTime;
        //verify is stored data is older than 1200seconds (20 minutes)
        if (currentDate-storedDate <= timeDifference){
            //Data is acceptably up to date. We will use the locally stored data.
            console.log("Weather Data: FOUND");
            console.log("Time since last download: " + (currentDate-storedDate).toString() + "sec");
            console.log("Time since last download: Acceptable");
            console.log(JSON.parse(window.localStorage.getItem("weatherData")));
            $("#LoadingQuickInfo").prepend("<span>Weather Data: FOUND</span><br><br>");
            $("#LoadingQuickInfo").prepend(`<span>Time since last download: ${(currentDate-storedDate).toString()}sec</span><br><br>`);
            $("#LoadingQuickInfo").prepend(`<span>Time since last download: Acceptable</span><br><br>`);
            $("#AutoCalculateBlock").css("display", "inherit");
            AutoCalculate();
            return JSON.parse(window.localStorage.getItem("weatherData"));
        }else{
            //Data is too old to be reliable. New API call required. Will save new data to localStorage
            console.log("Weather Data: Outdated");
            $("#LoadingQuickInfo").prepend("<span>Weather Data: Outdated</span><br><br>");
            getWeatherFromServer(position);
        }
    }else{
        //No data found in localstorage
        console.log("Retrieving Local Data: Failed. No data found in Local Storage");
        console.log("Retrieving Data: Will contact server");
        $("#LoadingQuickInfo").prepend("<span>Retrieving Local Data: Failed. No data found in Local Storage</span><br><br>");
        $("#LoadingQuickInfo").prepend("<span>Retrieving Data: Will contact server</span><br><br>");
        getWeatherFromServer(position);
    }
}

function getWeatherFromServer(position){
    console.log("Weather Data: Downloading");
    $("#LoadingQuickInfo").prepend("<span>Weather Data: Downloading</span><br><br>");
    //var altitude = getAltitude(position);
    getAltitude(position, async function(altitude){
            //---------- Send Position To Server => Get Response From Server ----------
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const api_url = `weather/${latitude},${longitude}`;
            const response = await fetch(api_url);
            const weatherData = await response.json();

            //Will add altitude and Time of download to Object
            weatherData.alt = altitude;
            //getting the current date will give us an "epoch" in milliseconds
            var currentDatems = new Date().getTime().toString();
            //we will convert the millisecond "epoch" in seconds by slicing it
            var currentDate = Number(currentDatems.slice(0, -3));
            weatherData.DownloadTime = currentDate;
            console.log(weatherData);
            window.localStorage.setItem("weatherData", JSON.stringify(weatherData));
            console.log(JSON.parse(window.localStorage.getItem("weatherData")));
            console.log("Weather Data: DOWNLOADED");
            $("#LoadingQuickInfo").prepend("<span>Weather Data: DOWNLOADED</span><br><br>");
            $("#AutoCalculateBlock").css("display", "inherit");
            AutoCalculate();
            //returns weatherData with altitude in the json block
            return weatherData;


        /*
        $.get('https://api.weatherstack.com/current?access_key={WEATHERSTACK_API_KEY}&query='+position.coords.latitude+','+position.coords.longitude+'', function(responseText) {
            
            var weatherData = responseText;
            weatherData.location.alt = altitude;
            console.log(altitude);
            window.localStorage.setItem("weatherData", JSON.stringify(weatherData));
            console.log(JSON.parse(window.localStorage.getItem("weatherData")));
            console.log("Weather Data: DOWNLOADED");
            return weatherData;
            
            //location.reload();
        });*/
    })
    /*
    $.get('https://api.weatherstack.com/current?access_key=9b964313622d273fb5ba99ba046f4d3e&query='+position.coords.latitude+','+position.coords.longitude+'', function(responseText) {
            
            var weatherData = responseText;
            weatherData.location.alt = altitude;
            console.log(altitude);
            window.localStorage.setItem("weatherData", JSON.stringify(weatherData));
            console.log(JSON.parse(window.localStorage.getItem("weatherData")));
            console.log("Weather Data: DOWNLOADED");
            
            //location.reload();
        });
        */
}

//The textbox that will display a calculated number gets this background color
var FocusColor = "rgb(255, 255, 235)";
var AttentionColor = "rgb(249, 182, 182)";

function focused(element){
    if(element.id == "HoursField" || element.id == "MinutesField"){
        $('#CreamSPFField').css("background-color", "white");
        $('#HoursField').css("background-color", FocusColor);
        $('#MinutesField').css("background-color", FocusColor);
    }else if(element.id == "CreamSPFField"){
        $('#CreamSPFField').css("background-color", FocusColor);
        $('#HoursField').css("background-color", "white");
        $('#MinutesField').css("background-color", "white");
    }
}

//---------- THIS PART JUST SHOWS SLIDER VALUE ON TEXT ELEMENT ----------
//Slider and SliderValue texts are arranged in a systematic ID manner.
//They both use the title's name as prefix (ex: Altitude-)
//And as a suffix for the ID they use either "-Value" or "-Slider" depending
//on weather they represent the Text (<p>) element or the Slider (<input>) element
//While the slider is changing value the following function is executed
function readValue(element){
    CalculateTime(element);
    //The "element" parameter returns the html tag as an object.

    //We now read the ID of the object (ex: id returns "AltitudeSlider")
    //then replaces "Slider" with "Value" (ex: "AltitudeSlider" --> "AltitudeValue")
    var rootID = element.id.replace('Slider', 'Value');

    //The SkinType Slider / Value combination requires separate logic as it has to
    //display not only the value but also the Skintype attributed to each value
    //SkinType is the only set of elements that include "Skin" in their ID
    //so thats how we're going to differentiate it
    if(element.id.includes("Skin")){

        
        //value 0-6 : I
        if(0 <= element.value && element.value <= 6){
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick I";
        }
        //value 7-13 : II
        else if (7 <= element.value && element.value <= 13){
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick II";
        }
        //value 14-20 : III
        else if (14 <= element.value && element.value <= 20){
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick III";
        }
        //value 21-27 : IV
        else if (21 <= element.value && element.value <= 27){
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick IV";
        }
        //value 28-34 : V
        else if (28 <= element.value && element.value <= 34){
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick V";
        }
        //value 34-36 : VI
        else{
            document.getElementById(rootID).innerHTML=element.value + "pts : Fitzpatrick VI";
        }
    }else if(element.id.includes("Altitude")){
        $('#AltitudeValue').text(element.value + "m" +" / "+ Math.round(Number(element.value)*3.28084) + "ft");
        
    }
    //For all other sliders / Values that are not related to SkinType
    else{
        document.getElementById(rootID).innerHTML=element.value;
        
    }
}

function CalculateTime(element){
    //---------- OLD SKIN TYPE ----------
    /*
    The old skin types were only 6 as described below. The new skin types has
    36 types of skin and it interpolates between the old 6 to find correct values
    */
    //Type I: 0.67
    //Type II: 1
    //Type III: 2
    //Type IV: 3
    //Type V: 4
    //Type VI: 5

    /*
    var SkinType = $('#SkinTypeSlider').val()-1;
    var PhototypeCoefficient = ((SkinType)*1.47);
    */
   //---------- NEW SKIN TYPE ----------
   /*
   The new skin type uses a formula to find an adequate divisor number for each
   of the 36 types of skin in order to convert it to an interpolation of the
   6 old types of skin. The divisor number function is required as the divisor
   number is not constant for all values.
   */
    var x = $('#SkinTypeSlider').val();
    //The function is a 6th degree polynoial and it has been divided into 
    //smaller components that will be reassembled to keep the code clean.
    var a = 4.089994072*Math.pow(10, -7)*Math.pow(x, 6);
    var b = -4.500373901*Math.pow(10, -5)*Math.pow(x, 5);
    var c = 0.001799907*Math.pow(x, 4);
    var d = -2.994985323*Math.pow(10, -2)*Math.pow(x, 3);
    var e = 0.126626476*Math.pow(x, 2);
    var f = 1.337951012*x;
    var g = -2.06500772*Math.pow(10, -9);
    //Reassembly of the function
    var fx = (a+b+c+d+e+f+g);

    //---------- Skin Type ----------
    //The skin type interpolation happens by dividing the "36 numbers" skin type (x)
    //by the divisor (fx) value we found previously
    var SkinType = (x / fx);
    var PhototypeCoefficient = ((SkinType)*1.47);

    //---------- SPF ----------
    //Cream Sun Protection Factor
    //No Cream: 1
    //Very High Cream Protection: 50
    var CreamSPF = $('#CreamSPFField').val();

    //---------- UV Index ----------
    //UltraViolet Index
    //Low: 1-2
    //Moderate: 3-5
    //High: 6-7
    //Very High: 8-10
    //Extreme: 11+
    var UVIndex = $('#UVIndexSlider').val();

    //---------- Altitude ----------
    //Altitude (in meters)
    var Altitude = $('#AltitudeSlider').val();

    //UV increases by 12% every 1000 meters in the atmosphere
    var AltitudeCoefficient = (((Altitude/1000)-1)*0.12)+1;

    //---------- Ground Reflection Coefficient ----------
    //Descrpition: reflectivity of the ground multiplies the value of the UV light absorbed by a factor depending on the surface's albedo
    //Ground Does Not Reflect: 1
    //Ground Reflects (On Water or Snow): 2
    //TO ADD: Implement Albedo Calculator: https://en.wikipedia.org/wiki/Albedo
    //Checks if the checkbox is checked and converts bool to int (True = 2 | False = 1)
    var ReflectingGroungCoefficient = Number($('#ReflectiveStatus').prop('checked'))+1;

    //---------- Time ----------
    //Get textfield value strings and convert them to numbers
    //this will then be used to get a decimal hour value which will be fed into the equation
    var HoursField = Number($('#HoursField').val());
    var MinutesField = Number($('#MinutesField').val());
    

    if(element.id == "HoursField" || element.id == "MinutesField"){
        //INPUT FROM HOURSFIELD OR MINUTESFIELD
        $('#CreamSPFField').css("background-color", FocusColor);
        $('#HoursField').css("background-color", "white");
        $('#MinutesField').css("background-color", "white");

        
    }else if (element.id == "CreamSPFField"){
        //INPUT FROM SPF FIELD

        $('#CreamSPFField').css("background-color", "white");
        $('#HoursField').css("background-color", FocusColor);
        $('#MinutesField').css("background-color", FocusColor);
        
    }

    if($('#CreamSPFField').css("background-color") == FocusColor)
    {
        var InputTime= HoursField + MinutesField/60;
        //---------- Equations ----------
        var CalculatedSPF = (InputTime*UVIndex*AltitudeCoefficient*ReflectingGroungCoefficient)/PhototypeCoefficient;
        //Round number to nearest interger (Math.ceil)
        $('#CreamSPFField').val(Math.ceil(CalculatedSPF));

        //In case of infinity or NaN set placeholder accordingly
        if(Number.isNaN(CalculatedSPF)){
            $('#CreamSPFField').attr("placeholder", "NaN");
        }
        if(CalculatedSPF === Infinity) {
            $('#CreamSPFField').attr("placeholder", "∞");
        }
        if(CalculatedSPF === -Infinity) {
            $('#CreamSPFField').attr("placeholder", "Stay in shaded areas");
        }
    }else{
        //---------- Equations ----------
        //Result from the equation gives time in Decimal Hours
        var DecimalTime = (PhototypeCoefficient * CreamSPF) / (UVIndex * AltitudeCoefficient * ReflectingGroungCoefficient);
        
        //Conversion from decimal hours to minutes
        var Minutes = DecimalTime * 60;

        //---------- Printing Results in appropriate textfields ----------
        $('#MinutesField').val(Math.round((Number(DecimalTime-Math.trunc(DecimalTime)))*60));
        //Reads what is before the decimal number and posts it to the hours Field
        $('#HoursField').val(parseInt(DecimalTime, 10));

        //If time is greater than 2 hours turn the box red to indicate attention is required
        if(Number(Minutes) > 120){
            $('#HoursField').css("background-color", AttentionColor);
            $('#MinutesField').css("background-color", AttentionColor);
            $('#HourInfo').text("error");
        }else{
            $('#HoursField').css("background-color", "white");
            $('#MinutesField').css("background-color", "white");
            $('#HourInfo').text("info_outline");
        }
        //In case of infinity or NaN set placeholder accordingly
        if(Number.isNaN(Minutes)){
            $('#MinutesField').attr("placeholder", "NaN");
            $('#HoursField').attr("placeholder", "NaN");
        }
        if(Minutes === Infinity) {
            $('#MinutesField').attr("placeholder", "∞");
            $('#HoursField').attr("placeholder", "∞");
        }
    }

    //For Debugging
    /*
    console.clear();
    console.log("UVIndex: " + UVIndex);
    console.log("Altitude: " + Altitude);
    console.log("Reflective: " + ReflectingGroungCoefficient);
    console.log("SkinType: " + SkinType);
    console.log("SPF: " + CreamSPF);
    console.log("Minutes: " + Minutes);
    */
}

function getSPF(){
    var spf = Number($('#QSText').text());
    if(isNaN(spf)) {
        return 1;
        
    }else{
        return spf;
    }
    
}

//Just a duplicate of the Calculate() function with small edits 
function AutoCalculate(element){
    $("#LoadingContentDiv").css("display", "none");
    var userPrefs = JSON.parse(window.localStorage.getItem("userPrefs"));
    var weatherData = JSON.parse(window.localStorage.getItem("weatherData"));
    //---------- NEW SKIN TYPE ----------
   /*
   The new skin type uses a formula to find an adequate divisor number for each
   of the 36 types of skin in order to convert it to an interpolation of the
   6 old types of skin. The divisor number function is required as the divisor
   number is not constant for all values.
   */
  //x has to be a value between 0 and 36
  var x = userPrefs.skinType;
  //The function is a 6th degree polynoial and it has been divided into 
  //smaller components that will be reassembled to keep the code clean.
  var a = 4.089994072*Math.pow(10, -7)*Math.pow(x, 6);
  var b = -4.500373901*Math.pow(10, -5)*Math.pow(x, 5);
  var c = 0.001799907*Math.pow(x, 4);
  var d = -2.994985323*Math.pow(10, -2)*Math.pow(x, 3);
  var e = 0.126626476*Math.pow(x, 2);
  var f = 1.337951012*x;
  var g = -2.06500772*Math.pow(10, -9);
  //Reassembly of the function
  var fx = (a+b+c+d+e+f+g);

  //---------- Skin Type ----------
  //The skin type interpolation happens by dividing the "36 numbers" skin type (x)
  //by the divisor (fx) value we found previously
  var SkinType = (x / fx);
  var PhototypeCoefficient = ((SkinType)*1.47);

  //---------- SPF ----------
  //Cream Sun Protection Factor
  //No Cream: 1
  //Very High Cream Protection: 50
  var CreamSPF = getSPF();

  //---------- UV Index ----------
  //UltraViolet Index
  //Low: 1-2
  //Moderate: 3-5
  //High: 6-7
  //Very High: 8-10
  //Extreme: 11+
  //trunc-ed uv seems to be more reliable considering the API
  var UVIndex = Math.trunc(weatherData.result.uv);

  //---------- Altitude ----------
  //Altitude (in meters)
  var Altitude = weatherData.alt;

  //UV increases by 12% every 1000 meters in the atmosphere
  var AltitudeCoefficient = (((Altitude/1000)-1)*0.12)+1;

  //---------- Ground Reflection Coefficient ----------
  //Descrpition: reflectivity of the ground multiplies the value of the UV light absorbed by a factor depending on the surface's albedo
  //Ground Does Not Reflect: 1
  //Ground Reflects (On Water or Snow): 2
  //TO ADD: Implement Albedo Calculator: https://en.wikipedia.org/wiki/Albedo
  //Checks if the checkbox is checked and converts bool to int (True = 2 | False = 1)
  var ReflectingGroungCoefficient = Number($('#AutoReflectiveStatus').prop('checked'))+1;

  //---------- Time ----------
  //Get textfield value strings and convert them to numbers
  //this will then be used to get a decimal hour value which will be fed into the equation
  var HoursField = Number($('#AutoHoursField').val());
  var MinutesField = Number($('#AutoMinutesField').val());
  
    try{
        //works when the function is called by pressing a button
        if(element.id == "AutoHoursField" || element.id == "AutoMinutesField"){
            //Input from Time Fields (user asks for spf)
            var InputTime= HoursField + MinutesField/60;
            //---------- Equations ----------
            var CalculatedSPF = (InputTime*UVIndex*AltitudeCoefficient*ReflectingGroungCoefficient)/PhototypeCoefficient;
            //Round number to nearest interger (Math.ceil)
            $('#QSText').text(Math.ceil(CalculatedSPF));

            //In case of infinity or NaN set placeholder accordingly
            if(Number.isNaN(CalculatedSPF)){
                $('#QSText').text("NaN");
            }
            if(CalculatedSPF === Infinity) {
                $('#QSText').text("∞");
            }
            if(CalculatedSPF === -Infinity) {
                $('#QSText').text("Stay in shaded areas");
            }
            
        }else{
            //Input from buttons (user asks for time)
            //---------- Equations ----------
            //Result from the equation gives time in Decimal Hours
            var DecimalTime = (PhototypeCoefficient * CreamSPF) / (UVIndex * AltitudeCoefficient * ReflectingGroungCoefficient);
            
            //Conversion from decimal hours to minutes
            var Minutes = DecimalTime * 60;

            //---------- Printing Results in appropriate textfields ----------
            $('#AutoMinutesField').val(Math.round((Number(DecimalTime-Math.trunc(DecimalTime)))*60));
            //Reads what is before the decimal number and posts it to the hours Field
            $('#AutoHoursField').val(parseInt(DecimalTime, 10));

            //If time is greater than 2 hours turn the box red to indicate attention is required
            if(Number(Minutes) > 120){
                $('#AutoHoursField').css("background-color", `${AttentionColor} !important`);
                $('#AutoMinutesField').css("background-color", `${AttentionColor} !important`);
                $('#AutoHourInfo').text("error");
            }else{
                $('#AutoHoursField').css("background-color", "white");
                $('#AutoMinutesField').css("background-color", "white");
                $('#AutoHourInfo').text("info_outline");
            }
            //In case of infinity or NaN set placeholder accordingly
            if(Number.isNaN(Minutes)){
                $('#AutoMinutesField').attr("placeholder", "NaN");
                $('#AutoHoursField').attr("placeholder", "NaN");
            }
            if(Minutes === Infinity) {
                $('#AutoMinutesField').attr("placeholder", "∞");
                $('#AutoHoursField').attr("placeholder", "∞");
            }
        }
    }catch (e){
        //works when the function is called by loading the page
        //Input from page load (user asks for time)
            //---------- Equations ----------
            //Result from the equation gives time in Decimal Hours
            var DecimalTime = (PhototypeCoefficient * CreamSPF) / (UVIndex * AltitudeCoefficient * ReflectingGroungCoefficient);
            
            //Conversion from decimal hours to minutes
            var Minutes = DecimalTime * 60;

            //---------- Printing Results in appropriate textfields ----------
            $('#AutoMinutesField').val(Math.round((Number(DecimalTime-Math.trunc(DecimalTime)))*60));
            //Reads what is before the decimal number and posts it to the hours Field
            $('#AutoHoursField').val(parseInt(DecimalTime, 10));

            //If time is greater than 2 hours turn the box red to indicate attention is required
            if(Number(Minutes) > 120){
                $('#AutoHoursField').css("background-color", AttentionColor);
                $('#AutoMinutesField').css("background-color", AttentionColor);
                $('#AutoHourInfo').text("error");
            }else{
                $('#AutoHoursField').css("background-color", "white");
                $('#AutoMinutesField').css("background-color", "white");
                $('#AutoHourInfo').text("info_outline");
            }
            //In case of infinity or NaN set placeholder accordingly
            if(Number.isNaN(Minutes)){
                $('#AutoMinutesField').attr("placeholder", "NaN");
                $('#AutoHoursField').attr("placeholder", "NaN");
            }
            if(Minutes === Infinity) {
                $('#AutoMinutesField').attr("placeholder", "∞");
                $('#AutoHoursField').attr("placeholder", "∞");
            }

    }

    //For Debugging
    /*
    console.clear();
    console.log("UVIndex: " + UVIndex);
    console.log("Altitude: " + Altitude);
    console.log("Reflective: " + ReflectingGroungCoefficient);
    console.log("SkinType: " + SkinType);
    console.log("SPF: " + CreamSPF);
    console.log("Minutes: " + Minutes);
    */
}

function QuickSelectSPF(element){
    if(Number(element.text) > 1){
        $("#QSText").text(element.text);
        AutoCalculate();
    }else{
        $("#QSText").text(element.text);
        setLanguage("it");
        AutoCalculate();
    }
    
}

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
    var lang = language;
    $.getJSON("../assets/data/languages.json", function(languagePack) {
        
        $("#PageTitle").text(languagePack[lang].Daisy);
        $("#AutoText").text(languagePack[lang].Auto);
        $("#ManualText").text(languagePack[lang].NerdMode);
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
            $("#LoadingTextTitle").text(languagePack[lang].Loading.Title);
            //Texts
            $("#PermissionDeniedTextCalc").text(languagePack[lang].LocationDenied.Text);
            $("#LocationUnavailableTextCalc").text(languagePack[lang].LocationUnavailable.Text);
            $("#LocationTimeoutTextCalc").text(languagePack[lang].LocationTimeout.Text);
            $("#UnknownLocationErrorTextCalc").text(languagePack[lang].UnknownLocation.Text);
            $("#NoAltitudeTextCalc").text(languagePack[lang].NoAltitude.Text);
            $("#NoAltitudeText2Calc").text(languagePack[lang].NoAltitude.Text2);
            $("#LoadingTextText").text(languagePack[lang].Loading.Text);
        //Auto Mode
        $("#CreamTextAuto").text(languagePack[lang].Cream);
        $("#TimeTextAuto").text(languagePack[lang].Time);
        $("#ReflectiveTextAuto").text(languagePack[lang].ReflectiveIcons);
        $("#QSText").text(languagePack[lang].WithoutSunscreen);
        //Manual Mode
        $("#UVIndexTextManual").text(languagePack[lang].UVIndex);
        $("#AltitudeTextManual").text(languagePack[lang].Altitude);
        $("#ReflectiveTextManual").text(languagePack[lang].ReflectiveSurface);
        $("#SkinTextManual").text(languagePack[lang].SkinType);
        $("#SPFTextManual").text(languagePack[lang].CreamSPF);
        $("#TimeTextManual").text(languagePack[lang].MaximumExposureTime);
        $("#CreamSPFField").attr("placeholder", languagePack[lang].NoCreamPlaceholder);
        $("#HoursField").attr("placeholder", languagePack[lang].Hours);
        $("#MinutesField").attr("placeholder", languagePack[lang].Minutes);
        //Modal Common
        $(".UnitText").text(languagePack[lang].Unit);
        $(".TypeText").text(languagePack[lang].Type);
        $(".UsageText").text(languagePack[lang].Usage);
        $(".DescriptionText").text(languagePack[lang].Description);
        $(".closeButton").text(languagePack[lang].Close);
        $(".sourceButton").text(languagePack[lang].Source);
        $(".findButton").text(languagePack[lang].Find);

        $(".InputTypeText").text(languagePack[lang].Input);
        $(".InputResult").text(languagePack[lang].InputResult);
        $(".orText").text(languagePack[lang].orText);
        //Modal Titles
        $("#UVModalTitle").text(languagePack[lang].UVModal.UVModalTitle);
        $("#AltitudeModalTitle").text(languagePack[lang].Altitude);
        $("#ReflectiveModalTitle").text(languagePack[lang].ReflectiveSurface);
        $("#SkinTypeModalTitle").text(languagePack[lang].SkinType);
        $("#SPFModalTitle").text(languagePack[lang].CreamSPF);
        $("#TimeModalTitle").text(languagePack[lang].Time);
        //UVModal
        $("#UVUnit").text(languagePack[lang].UVIndex);
        $("#LowText").text(languagePack[lang].Low);
        $("#ModerateText").text(languagePack[lang].Moderate);
        $("#HighText").text(languagePack[lang].High);
        $("#VeryHighText").text(languagePack[lang].VeryHigh);
        $("#ExtremeText").text(languagePack[lang].Extreme);
        $("#UVText1").text(languagePack[lang].UVModal.UVModalText1);
        $("#UVText2").text(languagePack[lang].UVModal.UVModalText2);
        //AltitudeModal
        $("#MetersUnit").text(languagePack[lang].UVIndex);
        $("#AltitudeModalText1").text(languagePack[lang].AltitudeModal.AltitudeText1);
        $("#AltitudeModalText2").text(languagePack[lang].AltitudeModal.AltitudeText2);
        $("#AltitudeModalText3").text(languagePack[lang].AltitudeModal.AltitudeText3);
        $("#AltitudeModalText4").text(languagePack[lang].AltitudeModal.AltitudeText4);
        $("#AltitudeModalText5").text(languagePack[lang].AltitudeModal.AltitudeText5);
        //ReflectiveModal
        $("#ReflectiveUnit").text(languagePack[lang].ReflectiveModal.ReflectiveUnit);
        $("#ReflectiveModalText1").text(languagePack[lang].ReflectiveModal.ReflectiveText1);
        $("#ReflectiveModalText2").text(languagePack[lang].ReflectiveModal.ReflectiveText2);
        $("#ReflectiveModalText3").text(languagePack[lang].ReflectiveModal.ReflectiveText3);
        $("#ReflectiveModalText4").text(languagePack[lang].ReflectiveModal.ReflectiveText4);
        $("#ReflectiveModalText5").text(languagePack[lang].ReflectiveModal.ReflectiveText5);
        $("#ReflectiveModalText6").text(languagePack[lang].ReflectiveModal.ReflectiveText6);
        //SkinModal
        $("#SkinModalText1").text(languagePack[lang].SkinModal.SkinText1);
        $("#SkinModalText2").text(languagePack[lang].SkinModal.SkinText2);
        //SPFModal
        $("#SPFModalUnit").text(languagePack[lang].CreamSPFModal.CreamSPFUnit);
        $("#SPFModalText1").text(languagePack[lang].CreamSPFModal.CreamSPFText1);
        $("#SPFModalText2").text(languagePack[lang].CreamSPFModal.CreamSPFText2);
        $("#SPFModalText3").text(languagePack[lang].CreamSPFModal.CreamSPFText3);
        $("#SPFModalText4").text(languagePack[lang].CreamSPFModal.CreamSPFText4);
        $("#SPFModalText5").text(languagePack[lang].CreamSPFModal.CreamSPFText5);
        $(".SPFModalNoProt").text(languagePack[lang].CreamSPFModal.NoProt);
        $(".SPFModalLowProt").text(languagePack[lang].CreamSPFModal.LowProt);
        $(".SPFModalMedProt").text(languagePack[lang].CreamSPFModal.MedProt);
        $(".SPFModalHiProt").text(languagePack[lang].CreamSPFModal.HiProt);
        $(".SPFModalVHiProt").text(languagePack[lang].CreamSPFModal.VHiProt);
        //TimeModal
        $("#TimeModalUnit").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeUnit);
        $("#TimeModalText1").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText1);
        $("#TimeModalText2").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText2);
        $("#TimeModalText3").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText3);
        $("#TimeModalText4").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText4);
        $("#TimeModalText5").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText5);
        $("#TimeModalText6").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText6);
        $("#TimeModalText7").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText7);
        $("#TimeModalText8").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText8);
        $("#TimeModalText9").text(languagePack[lang].MaximumExposureTimeModal.MaximumExposureTimeText9);

    });
    
}