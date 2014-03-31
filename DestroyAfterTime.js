#pragma strict

var removeTime : float = 10.0;
private var myObject : GameObject;
var randomExpiry : boolean = false;
var myPoolObject : PoolObject;
var countingDown : boolean = false;

function Start () {
	myObject = gameObject;
	myPoolObject = myObject.GetComponent(PoolObject);
	if (myPoolObject) {
		if (!countingDown) {
			countingDown = true; 
			SetCompletion();
		}
	}
	else {
		if (randomExpiry == false) {Destroy(gameObject, removeTime);}
		else {Destroy(gameObject, Random.Range(.5f * removeTime, 2.0f * removeTime));}
	}
}

function SetCompletion() {
	yield WaitForSeconds (removeTime);
	//Debug.Log(gameObject.name + " completely despawned!");
	countingDown = false;
	PoolManager.Despawn(myPoolObject.gameObject);
}

function OnEnable () {
	myObject = gameObject;
	myPoolObject = myObject.GetComponent(PoolObject);
	if (myPoolObject && !countingDown) {
		countingDown = true;
		SetCompletion();
	}
}

function OnDisable() {
	//Debug.Log(gameObject.name + " has been disabled!");
}