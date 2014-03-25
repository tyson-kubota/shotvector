#pragma strict

var speed : float = 100.0;
var useTrailRenderer : boolean = false;
var myTrail : TrailRenderer;

function Start () {
//	floorObject = gameObject;
	//Transform.translate(floorObject.distance);
	if (useTrailRenderer) {
		myTrail = gameObject.GetComponent(TrailRenderer);
		if (gameObject.GetComponent(TrailRenderer)) {
			myTrail.enabled = true;
		}
	}
}

function FixedUpdate () {
	transform.Translate(Vector3.up * Time.deltaTime * speed);
}