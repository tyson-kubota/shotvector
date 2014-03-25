#pragma strict

var removeTime : float = 10.0;
var myObject : GameObject;
var randomExpiry : boolean = false;
var myPoolObject : PoolObject;

function Start () {
	myObject = gameObject;
	myPoolObject = gameObject.GetComponent(PoolObject);
	if (gameObject.GetComponent(PoolObject)) {
		myPoolObject.DespawnAfterSeconds(removeTime);
	}
	else {
		if (randomExpiry == false) {Destroy(gameObject, removeTime);}
		else {Destroy(gameObject, Random.Range(.5f * removeTime, 2.0f * removeTime));}
	}
}