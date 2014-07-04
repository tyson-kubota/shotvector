#pragma strict
var BombMesh : GameObject;
var detonationRange : float = 3000;
var target : Transform;
var ExplosionObject : GameObject;
var alreadyExploded : boolean = false;
var PlayerLayer : int;

function Start() {
	PlayerLayer = LayerMask.NameToLayer("PlayerLayer");
}

function Update() {
	if (alreadyExploded == false) {
		if (target == null) {TargetSearch();}
		else {TryExploding();}
	}
}

function TargetSearch() {
	var colliders : Collider[] = Physics.OverlapSphere (transform.position, detonationRange);

	for (var hit : Collider in colliders) {
		if (hit && hit.gameObject.tag == "Player" && hit.gameObject.layer == PlayerLayer) {
			target = hit.transform;
		}
	}
}

function TryExploding () {
	if (alreadyExploded == false) {Explode();}
	else return;
}

function Explode () {
	if (ExplosionObject == null) {return;}
	else {
		alreadyExploded = true;
		ExplosionObject.SetActive(true);
		ExplosionObject.transform.parent = null;
		
		BombMesh.SetActive(false);
	}
}

