#pragma strict

var nutrition : int = 5;
var particleDuration : float = 4.0;

function Start () {
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player") {
		if (GetComponent.<Animation>()) {GetComponent.<Animation>().Play();}
		if (transform.GetComponent.<ParticleSystem>()) {
			Particles(transform.GetComponent.<ParticleSystem>()); 
			transform.GetComponent.<Renderer>().enabled = false;
		}
	}

}

function Particles ( myParticles : ParticleSystem ) {
	myParticles.Play();
	yield WaitForSeconds(particleDuration);
	myParticles.Stop();
}