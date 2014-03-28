#pragma strict

var speed : float = 100.0;
var useTrailRenderer : boolean = false;
var myTrail : TrailRenderer;
var myTrailTime : float;
var origTrailTime : float;
var countingDown : boolean = false;

var EnemyLayer : int;

function Start () {
//	floorObject = gameObject;
	//Transform.translate(floorObject.distance);

	EnemyLayer = LayerMask.NameToLayer("EnemyLayer");
	if (useTrailRenderer) {
		//origTrailTime = myTrailTime;
		myTrail = gameObject.GetComponent(TrailRenderer);
		// if (myTrail && !countingDown) {
		// 	// Debug.Log("Shot called via Start");
		// 	TrailPool();
		// }
		if (myTrail) {
			TrailPool();
			myTrail.enabled = true;
		}
	}
}

function OnEnable () {
	if (useTrailRenderer) {
		myTrail = gameObject.GetComponent(TrailRenderer);
		// if (myTrail && !countingDown) {
		// 	// Debug.Log("Shot called via OnEnable");
		// 	TrailPool();
		// }
		if (myTrail) {TrailPool(); myTrail.enabled = true;}
	}
}

// function OnEnable () {
// 	if ((useTrailRenderer) && (!firstTime)) {
// 		if (myTrail) {
// 			//Debug.Log("it's not your first use of this shot");
// 			myTrail.time = myTrailOrigTime;
// 			myTrail.enabled = true;
// 			TrailPool();
// 		}
// 	}
// }

function OnCollisionEnter (hit : Collision) {
		if (myTrail && hit.gameObject.layer == EnemyLayer) {
			myTrail.time = 0.0;
			//myTrail.enabled = false;
		}
}

function OnTriggerEnter (other : Collider) {
		if (myTrail && other.gameObject.layer == EnemyLayer) {
			myTrail.time = 0.0;
			//myTrail.enabled = false;
		}
}

function FixedUpdate () {
	transform.Translate(Vector3.up * Time.deltaTime * speed);
}

function TrailPool() {
	countingDown = true;
	myTrailTime = origTrailTime;
	//yield WaitForSeconds(myTrailTime/2);
	//LerpTrail(myTrailTime/2);

	// myTrail.time = 0.0;
	// yield WaitForSeconds(myTrailTime/2);
	// LerpTrail(myTrailTime/2);
}

function LerpTrail (timer : float) {
	
	myTrail.time = myTrailTime;

    var start = myTrailTime;
    var end = 0.0;
    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        myTrail.time = Mathf.Lerp(start, end, i);
		//Debug.Log("Your trail time is " + myTrail.time);
        yield;
                
    	}

    yield WaitForSeconds (timer);
    countingDown = false;
}