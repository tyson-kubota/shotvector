#pragma strict

var removeTime : float = 10.0;
var myObject : GameObject;
var randomExpiry : boolean = false;

function Start () {
	myObject = gameObject;
	if (randomExpiry == false) {Destroy(gameObject, removeTime);}
	else {Destroy(gameObject, Random.Range(.5f * removeTime, 2.0f * removeTime));}
}