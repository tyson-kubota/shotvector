#pragma strict

var newShot : GameObject;
var particleDuration : float = 4.0;
var powerupShell : GameObject;

function Start () {
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player") {
		if (animation) {animation.Play();}
		if (transform.particleSystem) {
			Particles(transform.particleSystem); 
			transform.renderer.enabled = false;
		}
		if (powerupShell.renderer) {
			powerupShell.renderer.enabled = false;
		}
	}

}

function Particles ( myParticles : ParticleSystem ) {
	myParticles.Play();
	yield WaitForSeconds(particleDuration);
	myParticles.Stop();
}