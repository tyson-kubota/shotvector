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
var myParticles : ParticleSystem;

var myPoolObject : PoolObject;
var myShotObject : CreateShot;
var myEnviroHazard : EnviroHazard;

var PlayerShooter : PlayerShot;
var ShotUpgrade : ShotPowerup;
var myFireRate : float;
var upgradedFireRate : float;

var HealthToAdd : HealthPowerup;
var isAddingHealth : boolean = false;

var PctHP10 : GameObject;
var PctHP20 : GameObject;
var PctHP30 : GameObject;
var PctHP40 : GameObject;
var PctHP50 : GameObject;
var PctHP60 : GameObject;
var PctHP70 : GameObject;
var PctHP80 : GameObject;
var PctHP90 : GameObject;
static var HPRatio : float;
static var HPColor : Color;

var moveForwardScript : MoveForward;

function Start () {
	BodyColor = BodyMesh.GetComponent(SetVertexColors);
	HPColor = Color.white;
	myFireRate = PlayerShooter.fireRate;
	if (transform.GetComponent.<ParticleSystem>()) {
		myParticles = transform.GetComponent.<ParticleSystem>();
	}
}

function OnCollisionEnter (hit : Collision) {
	//Debug.Log("I got hit!");
	if ((hit.gameObject.tag == "ProjectileEnemy") && (!isAddingHealth)) {
		//Debug.Log("I got hit by an enemy shot!");
		//if (playerAlive == true) {HitBurst();}
		hitDamage = hit.gameObject.GetComponent(ProjectileDamage);
		
		if (hitDamage) {
			hitPos = hit.contacts[0].point;
			hitNormal = hit.contacts[0].normal;
			//ReceiveDamage(hitDamage.damage, hit);
			ReceiveDamage(hitDamage.damage);
		}

		myPoolObject = hit.gameObject.GetComponent(PoolObject);
		myShotObject = hit.gameObject.GetComponent(CreateShot);
		
		if (myPoolObject) {
			myShotObject.myMesh.GetComponent.<Renderer>().enabled = false;
			hitDamage.enabled = false;
		}
		else {Destroy(hit.gameObject);}

	}
}

function OnTriggerEnter (other : Collider) {
	//myEnviroHazard = null;
	if (other.gameObject.tag == "HealthPowerup") {
		HealthToAdd = other.gameObject.GetComponent(HealthPowerup);
		if (HealthToAdd) {AddHealth(HealthToAdd.nutrition);}
	}
	if (other.gameObject.tag == "ShotPowerup") {
		ShotUpgrade = other.gameObject.GetComponent(ShotPowerup);
		if (ShotUpgrade) {UpgradeShot(ShotUpgrade.newShot);}
	}
	else if ((other.gameObject.tag == "ProjectileEnemy") && (!isAddingHealth)) {
		hitDamage = other.gameObject.GetComponent(ProjectileDamage);

		if (hitDamage) {ReceiveDamage(hitDamage.damage);}

		myPoolObject = other.gameObject.GetComponent(PoolObject);
		myShotObject = other.gameObject.GetComponent(CreateShot);
		
		// if (other.gameObject.layer == LayerMask.NameToLayer("enviro-hazard")) {
		// 	myEnviroHazard = other.gameObject.GetComponent(EnviroHazard);
		// }
		if (myPoolObject) {
			//Trigger-projectiles should keep going, not disappear immediately
			//myShotObject.myMesh.renderer.enabled = false;
			hitDamage.enabled = false;
		}
		// else if (myEnviroHazard) {
		// 	other.gameObject.renderer.enabled = false;
		// 	myEnviroHazard.ShowEnviroDamage();
		// }
		else {Destroy(other.gameObject);}
	}

}

//function ReceiveDamage (damageReceived : int, thisHit : Collision) {
function ReceiveDamage (damageReceived : int) {	
	yield ReduceHP(damageReceived);
	
	// if using sequence of damaged player meshes
	ShowCurrentHP(currentHP, true);
	ShowDamageSparks(1.0);
	
	// or just damaged color lerping
	//ShowCurrentHP(currentHP, false);

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
	//totalDamage = totalDamage + damageReceived;
	currentHP = currentHP - damageReceived;
	if (currentHP <= 0) {currentHP = 0; DestroyBody(); playerAlive = false;}
	yield;
}

function AddHealth (health : int) {
	isAddingHealth = true;
	currentHP = Mathf.Min(maxHP, (currentHP + health));
	//totalDamage = totalDamage - health;
	ShowCurrentHP(currentHP, true);
	yield ShowShotDamage();
	isAddingHealth = false;
}

function UpgradeShot (newShot : GameObject) {
	isAddingHealth = true;
	PlayerShooter.particle = newShot;
	//if new weapon comes with modified fireRate, set it here 
	//(via boolean for ChangeFireRate).
	if (ShotUpgrade.ChangeFireRate) {
		upgradedFireRate = ShotUpgrade.upgradeFireRate;
		PlayerShooter.fireRate = upgradedFireRate;
		Debug.Log("time to upgrade to " + upgradedFireRate);
	}
	//start timer for new firerate here (store previous weapon and revert to it at end)
	//perform any physical consequences/animations/new mesh enabling too!
	//yield ShowShotDamage();
	isAddingHealth = false;
}

function DestroyBody() {
	Application.LoadLevel(Application.loadedLevel);
	//BodyColor.FlashColors(0.5);
	//BodyObject.SetActive(false);
	//BodyMeshCollider.SetActive(false);
}


function ShowDamageSparks( particleDuration : float ) {
	if (myParticles) {
		myParticles.Play();
		yield WaitForSeconds(particleDuration);
		myParticles.Stop();
	}
}


function ShowShotDamage() {
	BodyColor.FlashColorsPlayer(0.6);
	yield WaitForSeconds(0.1);
}

function ShowCurrentHP (currentHP : int, activateMesh : boolean) {
	HPRatio = ((currentHP*1.0) / maxHP);
	HPColor = HPColor * HPRatio;

	if (activateMesh) {
		PctHP90.SetActive(false);
		PctHP80.SetActive(false);
		PctHP70.SetActive(false);
		PctHP60.SetActive(false);
		PctHP50.SetActive(false);
		PctHP40.SetActive(false);
		PctHP30.SetActive(false);
		PctHP20.SetActive(false);
		PctHP10.SetActive(false);

		if (HPRatio == 1.0) {
			return;
		}

		else if (HPRatio >= .9) {
			PctHP90.SetActive(true);
			//Debug.Log("HP is at 90 or higher");
		}
		else if (HPRatio >= .8) {
			PctHP80.SetActive(true);
			//Debug.Log("HP is at 80 or higher");
		}
		else if (HPRatio >= .7) {
			PctHP70.SetActive(true);
			//Debug.Log("HP is at 70 or higher");
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
			#if UNITY_EDITOR
				Debug.Log("HP is at 10 or higher");
			#endif
		}
	}

	// for (var child : GameObject in transform.parent) {
 //        if (child.name != this.name)
 //        {
 //            Debug.Log ("Found sibling "+child.name);
 //        }
 //    }	
}