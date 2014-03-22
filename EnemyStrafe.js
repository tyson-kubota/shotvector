#pragma strict

var origZpos : float;
// var waypointZ : float;
var mySpeed : float = 200;
var predictedPos : Vector3;
//var waypointTimeDelay : float = 1.0;

function Start () {
	origZpos = transform.position.z;
	//InvokeRepeating("SetWaypoint", 0.1, waypointTimeDelay);
}

function Update () {
	// predictedPos = PlayerLocation.pos;
	// waypointZ = predictedPos.z;
	
	// to update waypoint continuously
	// EnemyShot.waypointZ = PlayerLocation.pos.z;

	transform.position.z = Mathf.Lerp(transform.position.z, EnemyShot.waypointZ, Time.deltaTime);

	// transform.Translate(Vector3.right * Time.deltaTime * mySpeed);

	// depth = origZpos - (mvmtScale * Mathf.PerlinNoise(Time.time * zScale, origZpos));
	// var pos = transform.position;
	// pos.z = depth;
	// transform.position = pos;
}

function SetWaypoint () {
	predictedPos = PlayerLocation.pos;
	//waypointZ = predictedPos.z;	
}