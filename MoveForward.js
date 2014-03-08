#pragma strict

var speed : float = 100.0;

function Start () {
//	floorObject = gameObject;
	//Transform.translate(floorObject.distance);
}

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
}