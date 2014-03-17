#pragma strict

var removeTime : float = 1.0;
var myCollider : Collider;
var randomExpiry : boolean = false;

function Start () {
	myCollider = gameObject.GetComponent(Collider);
	if (randomExpiry == true) {
		var randomTime : float = Random.Range(.5f * removeTime, 2.0f * removeTime);
		yield WaitForSeconds(randomTime);
		DisableCollider ();
	}
	else {DisableCollider ();}
}

function DisableCollider () {myCollider.enabled = false;}