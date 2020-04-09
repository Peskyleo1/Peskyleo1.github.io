
//This function will wait for the html document to be fully loaded 
$( document ).ready(function() {
    
    
});


function showValue(element){
    if(element.id == "s1"){
        if(element.value == 0){
            $("#t1").text("Many");
            //$("#SkinColorPreview").css("background-color", V1);
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
}

function changeColor(value){
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

    var color = "c" + Math.round(value);
    console.log(eval(color));
    $("#SkinColorPreview").css("background-color", eval(color));
    $("#VLNumberText").text("Von Luschan Value: "+Math.round(value)+"pts");

    if(value < 18){
        $("#VLNumberText").css("color", "#5c5c5c");
    }else{
        $("#VLNumberText").css("color", "white");
    }
}