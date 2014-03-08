#pragma strict

var myObject : GameObject;
var myTransform : Transform;
static var pos : Vector3;
static var predictivePos : Vector3;
var PlayerObj : GameObject; 
var myForwardScript : MoveForward; 
var myForwardSpeed : float;

function Start () {
	myTransform = myObject.transform;
	
	myForwardScript = PlayerObj.GetComponent(MoveForward);
	//myForwardSpeed = myForwardScript.speed;
}

function Update () {
	myForwardSpeed = myForwardScript.speed;
	pos = myTransform.position;
	//Debug.Log("playerpos is : " + pos);
	//predictivePos = Vector3((myTransform.position.x + myForwardSpeed), myTransform.position.y, myTransform.position.z);
	predictivePos = myTransform.position;
	predictivePos.x = myTransform.position.x + myForwardSpeed;
}