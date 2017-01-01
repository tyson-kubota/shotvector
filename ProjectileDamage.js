#pragma strict

var damage : int = 1;
var myGameObject : GameObject;

function Start () {
	myGameObject = gameObject;
	//if (myGameObject.rigidbody) {ToggleKinematic();}
}

function Update () {
}

function ToggleKinematic() {
	myGameObject.GetComponent.<Rigidbody>().isKinematic = true;
	yield WaitForSeconds(Time.deltaTime);
	myGameObject.GetComponent.<Rigidbody>().isKinematic = false;
}