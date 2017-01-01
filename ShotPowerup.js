#pragma strict

var newShot : GameObject;
var particleDuration : float = 4.0;
var powerupShell : GameObject;
var ChangeFireRate : boolean = false;
var upgradeFireRate : float = 1.0;

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
		if (powerupShell.GetComponent.<Renderer>()) {
			powerupShell.GetComponent.<Renderer>().enabled = false;
		}
	}

}

function Particles ( myParticles : ParticleSystem ) {
	myParticles.Play();
	yield WaitForSeconds(particleDuration);
	myParticles.Stop();
}