#pragma strict

var isVRMode : boolean = false;

var myObject : GameObject; // for VR, this should be the parent of the avatar game object
private var myTransform : Transform;
var ZTiltDist : float;
var ZStartingDist : float;
var tiltMultiplier : float = 200.0;
var origTilt : float = 200.0;
var offset: float;

function Start () {
	if (isVRMode) { 
		transform.localPosition.z = 95; // move player avatar closer to camera:
		myTransform = myObject.transform;
		ZStartingDist = myTransform.localPosition.z;
	}
}

function Update () {
	tiltMultiplier = (origTilt / Time.timeScale);
	ZTiltDist = (Input.acceleration.x * tiltMultiplier); // + ZStartingDist;
//	myTransform.localPosition.z = Mathf.Lerp (transform.localPosition.z, ZTiltDist, Time.deltaTime);
	offset = ZStartingDist - ZTiltDist;
	myTransform.position.z = Mathf.Lerp (transform.position.z, offset, Time.deltaTime);		
}