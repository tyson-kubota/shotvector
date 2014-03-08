#pragma strict

var myObject : GameObject;
var myTransform : Transform;
var XTiltDist : float;
var tiltMultiplier : float = 200.0;
var origTilt : float = 200.0;

function Start () {
	myTransform = myObject.transform;
}

function Update () {
	tiltMultiplier = (origTilt / Time.timeScale);
	XTiltDist = Input.acceleration.x * tiltMultiplier;
	myTransform.localPosition.x = Mathf.Lerp (transform.localPosition.x, XTiltDist, Time.deltaTime);
	
}