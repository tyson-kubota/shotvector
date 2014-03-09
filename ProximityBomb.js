#pragma strict
var BombMesh : GameObject;
var detonationRange : float = 3000;
var target : Transform;
var ExplosionObject : GameObject;

function Update() {
	if (target == null) {TargetSearch();}
	else {Explode();}
}

function TargetSearch() {
	var colliders : Collider[] = Physics.OverlapSphere (transform.position, detonationRange);

	for (var hit : Collider in colliders) {
		if (hit && hit.gameObject.tag == "Player") {
			target = hit.transform;

		}
	}
}

function Explode () {
	ExplosionObject.SetActive(true);
	ExplosionObject.transform.parent = null;
	
	BombMesh.SetActive(false);
}

