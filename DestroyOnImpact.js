#pragma strict

//var removeTime : float = 10.0;
var myObject : GameObject;
var DestroyedByLayer : String;

function Start () {
	myObject = gameObject;
}

function OnCollisionEnter (hit : Collision) {
    if (hit.collider.gameObject.layer == LayerMask.NameToLayer(DestroyedByLayer)) {
    	Destroy(gameObject, .05);
    }

}