#pragma strict

var BodyMesh : GameObject;
var BodyColor : SetVertexColors;
var BrainObj : GameObject;
private var Brain : EnemyBrain;
var PartDamage : int = 1;
var isBeingHit : boolean = false;
var myPoolObject : PoolObject;
var myTrailObject : TrailRenderer;
var myShotObject : CreateShot;

function Start () {
	BodyColor = BodyMesh.GetComponent(SetVertexColors);
	Brain = BrainObj.GetComponent(EnemyBrain);
}

// function OnTriggerEnter (other : Collider) {
// 	if (other.gameObject.tag == "Projectile") {
// 		HitBurst();
// 	}
// }

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Projectile") {
		if (Brain.alive == true) {HitBurst();}
		isBeingHit = true;
		DamageToBrain(PartDamage);

		myPoolObject = other.gameObject.GetComponent(PoolObject);
		myTrailObject = other.gameObject.GetComponent(TrailRenderer);
		myShotObject = other.gameObject.GetComponent(CreateShot);
		if (myPoolObject) {
			if (myShotObject.myMesh.renderer) {myShotObject.myMesh.renderer.enabled = false;}
			else {myShotObject.gameObject.SetActive(false);}
			//myPoolObject.gameObject.SetActive (false);
		}
		else {Destroy(other.gameObject);}
	}
}

function OnCollisionEnter (hit : Collision) {
	//Debug.Log("I got hit!");
	if (hit.gameObject.tag == "Projectile") {
		if (Brain.alive == true) {HitBurst();}
		isBeingHit = true;
		DamageToBrain(PartDamage);

		myPoolObject = hit.gameObject.GetComponent(PoolObject);
		myTrailObject = hit.gameObject.GetComponent(TrailRenderer);
		myShotObject = hit.gameObject.GetComponent(CreateShot);
		if (myPoolObject) {
			myShotObject.myMesh.renderer.enabled = false;
			//myPoolObject.gameObject.SetActive (false);
		}
		else {Destroy(hit.gameObject);}
	}
}

// function OnCollisionStay(hit : Collision) {
// 	if (isBeingHit == false) {
// 		if (hit.gameObject.tag == "Projectile") {
// 			if (Brain.alive == true) {HitBurst();}
// 			isBeingHit = true;
// 			DamageToBrain(PartDamage);
// 			Destroy(hit.gameObject);
// 		}		
// 	}
// }

function HitBurst() {
	BodyColor.FlashColors(0.5);
}


function DamageToBrain(damage : int) {
	Brain.ReceiveDamage(damage);
	isBeingHit = false;
}