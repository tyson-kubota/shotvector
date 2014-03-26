#pragma strict

var nutrition : int = 5;
var particleDuration : float = 4.0;

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
	}

}

function Particles ( myParticles : ParticleSystem ) {
	myParticles.Play();
	yield WaitForSeconds(particleDuration);
	myParticles.Stop();
}