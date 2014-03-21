#pragma strict

var BodyMesh : GameObject;
var BodyColor : SetVertexColors;

var totalDamage : int = 0;
var maxHP : int = 10;
var currentHP : int = 10;
var playerAlive : boolean = true;

var hitMarker : GameObject;
var hitPos : Vector3;
var hitNormal : Vector3;
var hitDamage : ProjectileDamage;

var PctHP10 : GameObject;
var PctHP20 : GameObject;
var PctHP30 : GameObject;
var PctHP40 : GameObject;
var PctHP50 : GameObject;
var PctHP60 : GameObject;
var PctHP70 : GameObject;
var PctHP80 : GameObject;
var PctHP90 : GameObject;
var HPRatio : float;

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
			//ReceiveDamage(hitDamage.damage, hit);
			ReceiveDamage(hitDamage.damage);
		}
		Destroy(hit.gameObject);
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "ProjectileEnemy") {
		hitDamage = other.gameObject.GetComponent(ProjectileDamage);		
		//ReduceHP(hitDamage.damage);
		ReceiveDamage(hitDamage.damage);
	}
}

//function ReceiveDamage (damageReceived : int, thisHit : Collision) {
function ReceiveDamage (damageReceived : int) {	
	yield ReduceHP(damageReceived);
	ShowCurrentHP(currentHP, true);
	// if using individually-instantiated hit markers
	// var thisHitObject : GameObject = Instantiate (hitMarker, hitPos, Quaternion.identity);
	// thisHitObject.transform.parent = transform;
	// thisHitObject.transform.rotation = Quaternion.FromToRotation (transform.up, hitNormal) * transform.rotation;

	// if reducing speed each time player is hit
	//moveForwardScript.speed = .9 * moveForwardScript.speed;
	
	//thisHitObject.SetActive (false);
	yield ShowShotDamage();
	//thisHitObject.SetActive (true);

}

function ReduceHP (damageReceived : int) {
	totalDamage = totalDamage + damageReceived;
	currentHP = maxHP - totalDamage;
	if (currentHP <= 0) {DestroyBody(); playerAlive = false;}
	yield;
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

function ShowCurrentHP (currentHP : int, activateMesh : boolean) {
	HPRatio = ((currentHP*1.0) / maxHP);
	
	if (activateMesh) {
		if (HPRatio >= .9) {
		PctHP90.SetActive(true);
		Debug.Log("HP is at 90 or higher");
		}
		else if (HPRatio >= .8) {
		PctHP80.SetActive(true);
		Debug.Log("HP is at 80 or higher");
		}
		else if (HPRatio >= .7) {
		PctHP70.SetActive(true);
		Debug.Log("HP is at 70 or higher");
		}	
		else if (HPRatio >= .6) {
		PctHP60.SetActive(true);
		}
		else if (HPRatio >= .5) {
		PctHP50.SetActive(true);
		}
		else if (HPRatio >= .4) {
		PctHP40.SetActive(true);
		}	
		else if (HPRatio >= .3) {
		PctHP30.SetActive(true);
		}
		else if (HPRatio >= .2) {
		PctHP20.SetActive(true);
		}
		else if (HPRatio >= .1) {
		PctHP10.SetActive(true);
		}
	}
}