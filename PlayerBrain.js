#pragma strict

var BodyMesh : GameObject;
var BodyColor : SetVertexColors;

var totalDamage : int = 0;
var maxHP : int = 10;
var playerAlive : boolean = true;

var hitMarker : GameObject;
var hitPos : Vector3;
var hitNormal : Vector3;
var hitDamage : ProjectileDamage;

var moveForwardScript : MoveForward;

function Start () {
	BodyColor = BodyMesh.GetComponent(SetVertexColors);
}

function OnCollisionEnter (hit : Collision) {
	//Debug.Log("I got hit!");
	if (hit.gameObject.tag == "ProjectileEnemy") {
		//Debug.Log("I got hit by an enemy shot!");
		//if (playerAlive == true) {HitBurst();}
		hitDamage = hit.gameObject.GetComponent(ProjectileDamage);
		if (hitDamage) {
			hitPos = hit.contacts[0].point;
			hitNormal = hit.contacts[0].normal;
			ReceiveDamage(hitDamage.damage, hit);
		}
		Destroy(hit.gameObject);
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "ProjectileEnemy") {
		hitDamage = other.gameObject.GetComponent(ProjectileDamage);		
		ReduceHP(hitDamage.damage);
	}
}

function ReceiveDamage (damageReceived : int, thisHit : Collision) {
	ReduceHP(damageReceived);
	var thisHitObject : GameObject = Instantiate (hitMarker, hitPos, Quaternion.identity);
	thisHitObject.transform.parent = transform;
	thisHitObject.transform.rotation = Quaternion.FromToRotation (transform.up, hitNormal) * transform.rotation;
	//moveForwardScript.speed = .9 * moveForwardScript.speed;
	thisHitObject.SetActive (false);
	yield ShowShotDamage();
	thisHitObject.SetActive (true);

}

function ReduceHP (damageReceived : int) {
	totalDamage = totalDamage + damageReceived;
	if (totalDamage >= maxHP) {DestroyBody(); playerAlive = false;}
}

function DestroyBody() {
	Application.LoadLevel(Application.loadedLevel);
	//BodyColor.FlashColors(0.5);
	//BodyObject.SetActive(false);
	//BodyMeshCollider.SetActive(false);
}
	
function ShowShotDamage() {
	BodyColor.FlashColors(0.6);
	yield WaitForSeconds(0.1);
}