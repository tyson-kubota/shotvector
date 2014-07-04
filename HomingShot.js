#pragma strict
//var projectile : Rigidbody;
var projectile : Transform;
var projectileVelocity : float = 1200;
var homingRange : float = 3000;
var turn : float = 20;
var target : Transform;
var PlayerLayer : int;

function Start() {
	projectile = transform;
	PlayerLayer = LayerMask.NameToLayer("PlayerLayer");
}

function FixedUpdate()
{
	if(target == null || projectile == null)
		return;
	//projectile.velocity = transform.forward * projectileVelocity;
	//Debug.Log("your velocity is " + projectile.velocity);
	var targetRotation = Quaternion.LookRotation(target.position - transform.position);
	//projectile.MoveRotation(Quaternion.RotateTowards(transform.rotation, targetRotation, turn));
	projectile.rotation = targetRotation;
}

function Update() {
	if (target == null) {TargetSearch();}
}

function TargetSearch() {
	var colliders : Collider[] = Physics.OverlapSphere (transform.position, homingRange);

	for (var hit : Collider in colliders) {
	//for (var i = 0; i < colliders.Length; i++) {
		if (hit && hit.gameObject.tag == "Player" && hit.gameObject.layer == PlayerLayer) {
			//Debug.Log("you found a player target!");
			target = hit.transform;
		}
	}
}