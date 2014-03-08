#pragma strict

var origFixedDeltaTime : float;
var origTimeScale : float;
var inSloMo : boolean = false;

var start : float;
var end : float;
var physStart : float;
var physEnd : float;
var SlomoFactor : float = .25;

function Start () {
	origFixedDeltaTime = Time.fixedDeltaTime;
	origTimeScale = Time.timeScale;
}

function OnGUI()
{
 
    //makes a GUI button at coordinates 10, 100, and a size of 200x40
    if(GUI.Button (Rect (20,(Screen.height - 80),100,60),"Restart"))
    {
       //Loads a level
      Application.LoadLevel(Application.loadedLevel);
    }

    //makes a GUI button at coordinates 10, 100, and a size of 200x40
    if(GUI.Button (Rect ((Screen.width - 120),(Screen.height - 80),100,60),"Slomo"))
    {
    	if (inSloMo) {EndSloMo();}
    	else {BeginSloMo();}
    }

}

function BeginSloMo () {
	// Time.timeScale = .25 * Time.timeScale;
	// Time.fixedDeltaTime = origFixedDeltaTime * 4;
	LerpTime(true, 0.75);
	inSloMo = true;
}

function EndSloMo () {
	// Time.timeScale = origTimeScale;
	// Time.fixedDeltaTime = origFixedDeltaTime;
	LerpTime(false, .5);
	inSloMo = false;
}


function LerpTime (slowing : boolean, timer : float) {
    if (slowing) {
    	start = origTimeScale;
    	end = SlomoFactor * origTimeScale;
    	physStart = origFixedDeltaTime;
    	physEnd = (origFixedDeltaTime * SlomoFactor);
	}

	else {
		start = SlomoFactor * origTimeScale;
		end = origTimeScale;

		physStart = (origFixedDeltaTime * SlomoFactor);
    	physEnd = origFixedDeltaTime;
		}

    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        Time.timeScale = Mathf.Lerp(start, end, i);
        Time.fixedDeltaTime = Mathf.Lerp(physStart, physEnd, i);
        Debug.Log("my timescale is " + Time.timeScale);
        yield;
                
    	}

    yield WaitForSeconds (timer);
 
}