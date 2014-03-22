#pragma strict

var projectile : GameObject;
var startedShooting : boolean = false;
var timeBetweenShots : float = 2.0;
var inaccuracy : float = .2;
var aimAtPlayer : boolean = true;
static var waypointZ : float;
var useStrafeWaypoint : boolean = false;

var BrainObj : GameObject;
private var Brain : EnemyBrain;
var PartDamage : int = 1;
var isBeingHit : boolean = false;

function Start () {
	Brain = BrainObj.GetComponent(EnemyBrain);
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player" && startedShooting == false && Brain.alive) {
		startedShooting = true;
		InvokeRepeating("LaunchProjectile", 0.1, timeBetweenShots);
	}
}

// function OnBecameVisible () {
// 	if (startedShooting == false && Brain.alive) {
// 		startedShooting = true;
// 		InvokeRepeating("LaunchProjectile", 0.1, timeBetweenShots);
// 	}
// }

function OnBecameInvisible () {
	if (startedShooting == true) {
		StopLaunchingProjectile(false);
		startedShooting = false;
	}
}

function LaunchProjectile () {

	if (aimAtPlayer) {
		var tempForward = (transform.position - PlayerLocation.predictivePos).normalized;
	}
	else {tempForward = transform.right;}
	
	if (useStrafeWaypoint) {
		waypointZ = PlayerLocation.pos.z;
	}

	//Debug.Log(tempForward);
	var shotDirection : Vector3 = tempForward + Random.insideUnitSphere * inaccuracy;
	var angle = Quaternion.FromToRotation (Vector3.up, shotDirection);	

	if (Brain.alive) {
		var instance : GameObject = Instantiate(projectile, transform.position, angle);
		//Debug.Log("Launched!");
		//Debug.Log(shotDirection);
	    instance.transform.parent = transform;
		instance.transform.localPosition = Vector3(0,0,0);

		//to detach from parent, once positioned
		instance.transform.parent = null;
		
		//instance.rigidbody.velocity = randRot;
		//instance.rigidbody.velocity = PlayerLocation.pos;
		if (instance.rigidbody) {instance.rigidbody.velocity = shotDirection;}
	}
}

function StopLaunchingProjectile (dead : boolean) {
	CancelInvoke("LaunchProjectile");
	//if (dead) {isAlive = false;}
}

function OnTriggerExit (other : Collider) {
	if (other.gameObject.tag == "Player" && startedShooting == true) {
		StopLaunchingProjectile(false);
		startedShooting = false;
	}
}

// function OnCollisionEnter (hit : Collision) {
// 	if (hit.gameObject.tag == "Projectile") {
// 		if (Brain.alive == true) {HitBurst();}
// 		DamageToBrain(PartDamage);
// 		Destroy(hit.gameObject);
// 	}
// }

// function HitBurst() {
// 	BodyColor.FlashColors(0.5);
// }

// function DamageToBrain(damage : int) {
// 	Brain.ReceiveDamage(damage);
// }