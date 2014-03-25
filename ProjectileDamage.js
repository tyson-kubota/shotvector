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
	myGameObject.rigidbody.isKinematic = true;
	yield WaitForSeconds(Time.deltaTime);
	myGameObject.rigidbody.isKinematic = false;
}