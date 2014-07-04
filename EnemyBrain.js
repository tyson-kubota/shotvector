#pragma strict

var BodyObject : GameObject;
var BodyMeshCollider : GameObject;
var ExplosionBody : GameObject;
var ExplosionParticles : ParticleSystem;
var PoolableExplosionBody : GameObject;
var EnemyPoolObject : PoolObject;
var BodyMesh : GameObject;
var BodyColor : SetVertexColors;

var alive : boolean = true;
var ShotLauncher : EnemyShot;

var totalDamage : int = 0;
var MyHP : int;
var MaxHP : int;

private var MyLayerMask : int;
private var ExplosionCheckLayerMask : int;
var ExplosionPower : float = 3000.0;
var ExplosionRadius : int = 2000;
var explodeChildren : boolean = false;
private var hasAlreadyExploded : boolean = false;
var explodeDelay : float = 0.2;
//var explodeParent : GameObject;

function Awake () {
	MaxHP = MyHP;
	//BodyColor = BodyMesh.GetComponent(SetVertexColors);
	MyLayerMask = (1 << LayerMask.NameToLayer("EnemyLayer"));
	ExplosionCheckLayerMask = (1 << LayerMask.NameToLayer("ExplosionCheck"));
	if (transform.particleSystem) {ExplosionParticles = transform.particleSystem;}
}

function Start () {
	MyHP = MaxHP;
	//Debug.Log("I have [re]spawned");
	alive = true;
	if (BodyMesh) {BodyColor = BodyMesh.GetComponent(SetVertexColors);}
	BodyObject.SetActive(true);
	BodyMeshCollider.SetActive(true);
	if (PoolableExplosionBody) {PoolableExplosionBody.SetActive(false);}
	if (ExplosionParticles) {ExplosionParticles.Stop();}
}

// function OnTriggerEnter (other : Collider) {
// 	if (other.gameObject.tag == "Projectile") {
// 		HitBurst();
// 	}
// }

function OnCollisionEnter (hit : Collision) {
	if (hit.gameObject.tag == "Projectile") {
		DestroyBody();
		Destroy(hit.gameObject);
	}
}

function ReceiveDamage (damageReceived : int) {
	totalDamage = totalDamage + damageReceived;
	
	#if UNITY_EDITOR
		Debug.Log(BodyObject.name + " receiving " + damageReceived + " points of damage.");
	#endif

	if (totalDamage >= MyHP) {DestroyBody(); Die();}
}

function Die() {
	alive = false;
	totalDamage = 0;
	if (EnemyPoolObject) {
		yield WaitForSeconds(1.0);
		alive = true;
		PoolManager.Despawn(EnemyPoolObject.gameObject);
	}
	//Resurrect();
}

function Resurrect() {
	alive = true;
	totalDamage = 0;
	if (EnemyPoolObject) {
		PoolManager.Despawn(EnemyPoolObject.gameObject);
	}
}

function DestroyBody() {
	//BodyColor.FlashColors(0.5);
	if (ShotLauncher) {ShotLauncher.StopLaunchingProjectile(true);}
	BodyObject.SetActive(false);
	BodyMeshCollider.SetActive(false);
	
	if (ExplosionParticles) {ExplosionParticles.Play();}
	AddForceToExploded();
	if (explodeChildren == true && hasAlreadyExploded == false) {
		MultipleExplosions();
		hasAlreadyExploded = true;		
		#if UNITY_EDITOR
		Debug.Log("sent explosion message");
		#endif
		//explodeParent.SendMessage("DestroyChildren", SendMessageOptions.DontRequireReceiver);
	}
	
	if (PoolableExplosionBody) {
		PoolableExplosionBody.SetActive(true);
		if (PoolableExplosionBody.animation) {PoolableExplosionBody.animation.Play();}
	}
	else {ExplosionBody.SetActive(true);}
	
	if (BodyColor) {BodyColor.RestoreColors();}

	// if (EnemyPoolObject) {
	// 	yield WaitForSeconds(1.0);
	// 	PoolManager.Despawn(EnemyPoolObject.gameObject);
	// }
}

function AddForceToExploded() {
	var explosionPos = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, ExplosionRadius, MyLayerMask);
	
	for (var hit : Collider in colliders) {
		if (hit && hit.rigidbody) {
			hit.rigidbody.AddExplosionForce(ExplosionPower, explosionPos, ExplosionRadius, 3.0);
		}
		//hit.collider.gameObject.SendMessage("DestroyBody", SendMessageOptions.DontRequireReceiver);
	}
}

function MultipleExplosions() {

	var explosionPos = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, ExplosionRadius, ExplosionCheckLayerMask);
	
	for (var hit : Collider in colliders) {
		//if (hit && hit.rigidbody && hit != hit) {
       if (hit == collider || !hit) { // skip this collider and the null ones
            continue;
        }
        if (hit.rigidbody){
        	yield WaitForSeconds(explodeDelay);
			hit.gameObject.SendMessage("DestroyBody", SendMessageOptions.DontRequireReceiver );
			#if UNITY_EDITOR
			Debug.Log("Triggered multiple explosions");
			#endif
		}
		//hit.collider.gameObject.SendMessage("DestroyBody", SendMessageOptions.DontRequireReceiver);
	}
}