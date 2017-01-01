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
var PlayerLayer : int;

function Start () {
	BodyColor = BodyMesh.GetComponent(SetVertexColors);
	Brain = BrainObj.GetComponent(EnemyBrain);
    PlayerLayer = LayerMask.NameToLayer("PlayerLayer");

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
//		DamageToBrain(PartDamage);
		var tempDamage = other.gameObject.GetComponent(ProjectileDamage);
		DamageToBrain(Mathf.Max(PartDamage, tempDamage.damage));

		myPoolObject = other.gameObject.GetComponent(PoolObject);
		myTrailObject = other.gameObject.GetComponent(TrailRenderer);
		myShotObject = other.gameObject.GetComponent(CreateShot);
		if (myPoolObject) {
			if (myShotObject.myMesh.GetComponent.<Renderer>()) {myShotObject.myMesh.GetComponent.<Renderer>().enabled = false;}
			else {myShotObject.gameObject.SetActive(false);}
			//myPoolObject.gameObject.SetActive (false);
		}
		else {Destroy(other.gameObject);}
	}
	else if (other.gameObject.tag == "Despawner" && other.gameObject.layer == PlayerLayer) {
		//Debug.Log("dying via despawner trigger");
		Brain.Die();
	}

}

function OnCollisionEnter (hit : Collision) {
	//Debug.Log("I got hit!");
	if (hit.gameObject.tag == "Projectile") {
		if (Brain.alive == true) {HitBurst();}
		isBeingHit = true;
//		DamageToBrain(PartDamage);
		var tempDamage = hit.gameObject.GetComponent(ProjectileDamage);
		DamageToBrain(Mathf.Max(PartDamage, tempDamage.damage));

		myPoolObject = hit.gameObject.GetComponent(PoolObject);
		myTrailObject = hit.gameObject.GetComponent(TrailRenderer);
		myShotObject = hit.gameObject.GetComponent(CreateShot);
		if (myPoolObject) {
			myShotObject.myMesh.GetComponent.<Renderer>().enabled = false;
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