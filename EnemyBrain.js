#pragma strict

var BodyObject : GameObject;
var BodyMeshCollider : GameObject;
var ExplosionBody : GameObject;
var alive : boolean = true;
var ShotLauncher : EnemyShot;

var totalDamage : int = 0;
var MyHP : int;

private var MyLayerMask : int;
private var ExplosionCheckLayerMask : int;
var ExplosionPower : float = 3000.0;
var ExplosionRadius : int = 2000;
var explodeChildren : boolean = false;
private var hasAlreadyExploded : boolean = false;
var explodeDelay : float = 0.2;
//var explodeParent : GameObject;

function Start () {
	//BodyColor = BodyMesh.GetComponent(SetVertexColors);
	MyLayerMask = (1 << LayerMask.NameToLayer("EnemyLayer"));
	ExplosionCheckLayerMask = (1 << LayerMask.NameToLayer("ExplosionCheck"));
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
	if (totalDamage >= MyHP) {DestroyBody(); alive = false;}
}

function DestroyBody() {
	//BodyColor.FlashColors(0.5);
	if (ShotLauncher) {ShotLauncher.StopLaunchingProjectile(true);}
	BodyObject.SetActive(false);
	BodyMeshCollider.SetActive(false);
	ExplosionBody.SetActive(true);
	AddForceToExploded();
	if (explodeChildren == true && hasAlreadyExploded == false) {
		MultipleExplosions();
		hasAlreadyExploded = true;		
		#if UNITY_EDITOR
		Debug.Log("sent explosion message");
		#endif
		//explodeParent.SendMessage("DestroyChildren", SendMessageOptions.DontRequireReceiver);
	}
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