#pragma strict

var particleDuration : float = 1.0;
var myParticles : ParticleSystem;
var myRenderer : Renderer;
var hitDamage : ProjectileDamage;
var hasDamaged : boolean = false;

function Start () {
	myRenderer = transform.gameObject.GetComponent.<Renderer>();
	if (transform.GetComponent.<ParticleSystem>()) {myParticles = transform.GetComponent.<ParticleSystem>();}
	hitDamage = gameObject.GetComponent(ProjectileDamage);
}

function ShowEnviroDamage () {
	if (myParticles) {
		myRenderer.enabled = false;
		myParticles.Play();
		yield WaitForSeconds(particleDuration);
		myParticles.Stop();
	}
}


function OnTriggerEnter (other : Collider) {

	if ((other.gameObject.tag == "Player") || (other.gameObject.tag == "Projectile")) {
		if (!hasDamaged) {
			hasDamaged = true;
			ShowEnviroDamage();
			hitDamage.enabled = false;
			Destroy(transform.gameObject);
		}
	}

}

function OnCollisionEnter (hit : Collision) {
	if ((hit.gameObject.tag == "Player") || (hit.gameObject.tag == "Projectile")) {
		if (!hasDamaged) {
			hasDamaged = true;
			ShowEnviroDamage();
			hitDamage.enabled = false;
			Destroy(transform.gameObject);
		}
	}
}