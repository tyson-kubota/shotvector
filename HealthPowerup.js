#pragma strict

var nutrition : int = 5;

function Start () {
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player") {
		if (animation) {animation.Play();}
	}

}
