#pragma strict

//RenderSettings.fogColor = Color.blue;

var lerpTime : float;
var color1 : Color;
var color2 : Color;
var Backdrop : GameObject;

var colorA : Color;
var colorB : Color;

function OnTriggerEnter (other : Collider) {
 if (other.gameObject.tag == "Player") {
     LerpFog(lerpTime);
     if (Backdrop) {
        LerpBackdrop(lerpTime, colorA, colorB);
     }
 }
}

// function LerpFog() {
//     RenderSettings.fogColor = Color.Lerp (color1, color2, lerpTime);
// }

function LerpFog (timer : float) {

    var start = color1;
    var end = color2;
    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        RenderSettings.fogColor = Color.Lerp (color1, color2, i);
        yield;            
        }

    yield WaitForSeconds (timer);
 
}

function LerpBackdrop (timer : float, colorA : Color, colorB: Color) {
    var BackdropColors = Backdrop.GetComponent(SetVertexColors);
    BackdropColors.LerpColors(timer, color1, color2);
}