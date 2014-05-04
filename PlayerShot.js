#pragma strict

var pos : Vector3;
var realWorldPos : Vector3;
var particle : GameObject;
var mainCamera : Camera;
var BurstMesh : GameObject;
var SheathBurst : SetVertexColors;

var reticleObj : GameObject;
var reticleChevrons : GameObject;
var reticleCamera : Camera;
var MyLayerMask : int;

var fireRate : float = 1;
var origFireRate : float = .2;
private var nextFire : float = 1;

function Start () {
	Application.targetFrameRate = 60;
	SheathBurst = BurstMesh.GetComponent(SetVertexColors);
	reticleChevrons.SetActive(false);
	// MyLayerMask = (1 << LayerMask.NameToLayer("PlayerLayer")) | (1 << LayerMask.NameToLayer("PlayerProjectileLayer")) | (1 << LayerMask.NameToLayer("EnemyProjectileLayer"));
	// MyLayerMask = ~MyLayerMask;
	MyLayerMask = (1 << LayerMask.NameToLayer("EnemyLayer")) | (1 << LayerMask.NameToLayer("sky"));
}

function Update () {

	if (Time.timeScale < 1.0) {fireRate = (origFireRate * 2 * Time.timeScale);}
	//else {fireRate = origFireRate;}

		for (var i = 0; i < Input.touchCount; ++i) {
			if (Input.GetTouch(i).phase == TouchPhase.Began || Input.GetTouch(i).phase == TouchPhase.Moved || Input.GetTouch(i).phase == TouchPhase.Stationary) {
				// Construct a ray from the current touch coordinates

				var ray = mainCamera.ScreenPointToRay (Input.GetTouch(i).position);
				var hit : RaycastHit;

				// Draw targeting reticle/sphere here and change color below,
				// if predicted path intersects an enemy, landscape, etc.

				reticleChevrons.SetActive(true);
				
				pos = Vector3.zero;

				//if (Physics.Raycast (ray.origin, Vector3.forward, 1000)) {
				if (Physics.Raycast (ray, hit, 5000, MyLayerMask)) {

					//reticleChevrons.transform.position = ray.origin;
					//reticleChevrons.transform.position = hit.point;
					//var myVector : Vector3 = Input.GetTouch(i).position,reticleCamera.nearClipPlane;
					var myVector : Vector3 = Input.GetTouch(i).position;
					var reticleChevronsPos : Vector3 = reticleCamera.ScreenToWorldPoint (myVector);
					reticleChevrons.transform.position = reticleChevronsPos;
					//reticleChevrons.transform.localPosition = Vector3(myVector.x, myVector.y, reticleCamera.nearClipPlane);

					#if UNITY_EDITOR
					Debug.DrawLine (ray.origin, hit.point, Color.yellow, .2, false);			
					//Debug.Log("Hit at " + hit.point);
					//Debug.Log("You hit " + hit.transform.name);
					//if (hit.transform.gameObject.tag == "Projectile") {return;}
					//Debug.Log("reticleChevronsPos = " + reticleChevronsPos + " and touch position is " + Input.GetTouch(i).position.x);
					#endif
					
					// Create a particle if hit
					//Instantiate (particle, transform.position, transform.rotation);
					
					var shotDirection = (transform.position - hit.point).normalized;
					var angle = Quaternion.FromToRotation (Vector3.up, shotDirection);
					//var Shot = Instantiate (particle, hit.point, angle);
					
					if (Time.time > nextFire) {
	     				nextFire = Time.time + fireRate;						
						//var Shot = Instantiate (particle, transform.position, angle);
						var Shot = PoolManager.Spawn(particle.name);

						Shot.transform.position = transform.position;
						Shot.transform.rotation = angle;
						
						//Shot.rigidbody.AddRelativeForce(shotDirection);
						
						// ShowShotBurst disabled in order to show damage instead
						//ShowShotBurst();
					}

				pos = hit.point;

				//reticleChevrons.transform.position = Input.GetTouch(i).position;
				//var o1o : Vector3 = Vector2(0,1)

				if (pos != Vector3.zero) {
					reticleObj.SetActive(true);
					reticleObj.transform.position = pos;

					// failed attempt at rotating reticle to reflect hit normal
					//reticleObj.transform.LookAt(hit.normal);
					//reticleObj.transform.rotation = Quaternion.LookRotation (Transform.TransformDirection (Vector3.forward), hit.normal);
				}

				}

				else {
					if (pos == Vector3.zero) {reticleObj.SetActive(false);}	
				}
			}

			else if (Input.GetTouch(i).phase == TouchPhase.Ended || Input.GetTouch(i).phase == TouchPhase.Canceled) 
				{
				reticleObj.SetActive(false);
				reticleChevrons.SetActive(false);
				}

		}

}

function ShowShotBurst() {
	// BurstMesh.renderer.enabled = true;
	// yield WaitForSeconds(0.2);
	// BurstMesh.renderer.enabled = false;
	//SheathBurst.UpdateColors();
	SheathBurst.FlashColors(0.5);
	//yield WaitForSeconds(0.2);
	//SheathBurst.RestoreColors();
}