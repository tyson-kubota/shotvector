#pragma strict

var distanceFromFloor : float = 100.0;
//var floorObject : GameObject;
var adjustSpeed : float = 50;
var MyLayerMask : int;
var hoverError : float;

function Start () {
//	floorObject = gameObject;
	//Transform.translate(floorObject.distance);
	MyLayerMask = (1 << LayerMask.NameToLayer("landscape"));
}

function Update () {
	var hit : RaycastHit;
	if (Physics.Raycast (transform.position, -Vector3.up, hit, distanceFromFloor * 2, MyLayerMask)) {
		var distanceToGround = hit.distance;
		//Debug.Log ("There is something below the object!");
		var myYPos : float = (hit.point.y + distanceFromFloor);
		transform.position.y = Mathf.Lerp (transform.position.y, myYPos, Time.deltaTime);
	}
	//else {transform.Translate(-Vector3.up * Time.deltaTime * adjustSpeed, Camera.main.transform);}
	else {
			var myDownYPos : float = transform.position.y - adjustSpeed;
			transform.position.y = Mathf.Lerp (transform.position.y, myDownYPos, Time.deltaTime);
	}
}