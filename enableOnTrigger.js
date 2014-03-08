#pragma strict

//RenderSettings.fogColor = Color.blue;

var objectToEnable : GameObject;

function OnTriggerEnter (other : Collider) {
 if (other.gameObject.tag == "Player") {
     objectToEnable.SetActive(true);
 }
}