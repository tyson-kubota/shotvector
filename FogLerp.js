#pragma strict

//RenderSettings.fogColor = Color.blue;

var lerpTime : float;
var color1 : Color;
var color2 : Color;
var Backdrop : GameObject;

var BackdropLerp : boolean = true;
var Randomize : boolean = false;

var colorA : Color;
var colorB : Color;

var colorC : Color;
var colorD : Color;

var colorE : Color;
var colorF : Color;

var colorG : Color;
var colorH : Color;

var PlayerLayer : int;

function Awake() {
    if (BackdropLerp) {Backdrop = GameObject.Find("backdrop-quad");}
    colorG = color1;
    colorH = color2;
}

function Start () {
    PlayerLayer = LayerMask.NameToLayer("PlayerLayer");
}

function OnTriggerEnter (other : Collider) {
 if (other.gameObject.tag == "Player" && other.gameObject.layer == PlayerLayer) {
     if (Randomize) {RandomizeColors();}
     LerpFog(lerpTime);
     if (Backdrop) {
        LerpBackdrop(lerpTime);
     }
 }
}

// function LerpFog() {
//     RenderSettings.fogColor = Color.Lerp (color1, color2, lerpTime);
// }

function LerpFog (timer : float) {

    //var start = color1;
    var averageColor = (color1 + color2) * .5;

    var start = RenderSettings.fogColor;
    var end = averageColor;
    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        RenderSettings.fogColor = Color.Lerp (start, end, i);
        yield;            
        }

    yield WaitForSeconds (timer);
 
}

function LerpBackdrop (timer : float) {
    var BackdropColors = Backdrop.GetComponent(SetVertexColors);
    BackdropColors.LerpColors(timer, color1, color2);
}

function RandomizeColors () {

        var ColorsToUse : int = Random.value < .5 ? 1 : 2;
        var ColorsToUse2 : int = Random.value < .5 ? 1 : 2;
        if (ColorsToUse == 1) {
            if (ColorsToUse2 == 1) { color1 = colorA; color2 = colorB;}
            else {color1 = colorC; color2 = colorD;}
        } 
        else {
            if (ColorsToUse2 == 1) { color1 = colorE; color2 = colorF;}
            else {color1 = colorG; color2 = colorH;}
        } 
}
