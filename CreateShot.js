#pragma strict

var myMesh : GameObject;

function Start () {
	//CreateShot();
}

function OnEnable () {
	//CreateShot();
}

function CreateShot () {
	myMesh.renderer.enabled = false;
	yield WaitForSeconds(0.25);
	myMesh.renderer.enabled = true;
}