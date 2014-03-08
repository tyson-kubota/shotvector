#pragma strict

var BodyMesh : GameObject;
var BodyColor : SetVertexColors;
var BrainObj : GameObject;
private var Brain : EnemyBrain;
var PartDamage : int = 1;

function Start () {
	BodyColor = BodyMesh.GetComponent(SetVertexColors);
	Brain = BrainObj.GetComponent(EnemyBrain);
}

// function OnTriggerEnter (other : Collider) {
// 	if (other.gameObject.tag == "Projectile") {
// 		HitBurst();
// 	}
// }

function OnCollisionEnter (hit : Collision) {
	//Debug.Log("I got hit!");
	if (hit.gameObject.tag == "Projectile") {
		if (Brain.alive == true) {HitBurst();}
		DamageToBrain(PartDamage);
		Destroy(hit.gameObject);
	}
}

function HitBurst() {
	BodyColor.FlashColors(0.5);
}


function DamageToBrain(damage : int) {
	Brain.ReceiveDamage(damage);
}