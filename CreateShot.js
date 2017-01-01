#pragma strict

var myMesh : GameObject;

function Start () {
	//CreateShot();
}

function OnEnable () {
	//CreateShot();
}

function CreateShot () {
	myMesh.GetComponent.<Renderer>().enabled = false;
	yield WaitForSeconds(0.25);
	myMesh.GetComponent.<Renderer>().enabled = true;
}