#pragma strict

var pos : Vector3;
var realWorldPos : Vector3;
var particle : GameObject;
var mainCamera : Camera;

function Start () {

}

function Update () {

	// Debug.Log(hitInfo.point);

	// var hit : RaycastHit;
	// //if (Physics.Raycast(transform.position, Vector3.forward, hit)) {			
	// if (Physics.Raycast(realWorldPos, Vector3.forward, hit)) {					
	// 		// Find the line from the gun to the point that was clicked.
	// 		//var incomingVec = hit.point - gunObj.position;

	// 		// Use the point's normal to calculate the reflection vector.
	// 		//var reflectVec = Vector3.Reflect(incomingVec, hit.normal);

	// 		// Draw lines to show the incoming "beam" and the reflection.
	// 		Debug.DrawLine(transform.position, hit.point, Color.red);
	// 		Debug.Log("Line drawn at " + hit.point);
	// 		//Debug.DrawRay(hit.point, reflectVec, Color.green, 1.0f);

	// 		// rot = Quaternion.FromToRotation(Vector3.down, hit.normal);
	// 		// pos = hit.point;
	// 		// if (readyToSpawn) {
	// 		// 	readyToSpawn = false;
	// 		// 	InstantiateHitObject(prefabToSpawn, pos, rot);
	// 		// }
	// 	}	

		for (var i = 0; i < Input.touchCount; ++i) {
			if (Input.GetTouch(i).phase == TouchPhase.Began) {
				// Construct a ray from the current touch coordinates
				//var ray = Camera.main.ScreenPointToRay (Input.GetTouch(i).position);
				//var ray = transform.position;
				var ray = mainCamera.ScreenPointToRay (Input.GetTouch(i).position);
				//var fwd = transform.TransformDirection (Vector3.forward);				
				var hit : RaycastHit;

				// Draw targeting reticle/sphere here and change color below,
				// if predicted path intersects an enemy, landscape, etc.

				//if (Physics.Raycast (ray.origin, Vector3.forward, 1000)) {
				if (Physics.Raycast (ray, hit)) {
				//if (Physics.Raycast (transform.position, fwd, 10)) {					
					Debug.DrawLine (ray.origin, hit.point, Color.yellow, 10, false);					
					//Debug.DrawRay (ray.origin, ray.direction * 1000, Color.yellow, 2);
					Debug.Log("Hit at " + hit.point);
					// Create a particle if hit
					//Instantiate (particle, transform.position, transform.rotation);
					
					var worldSpaceHitPoint : Vector3 = hit.point;
					var transformScreenPos : Vector3 = Vector3 (transform.position.x, transform.position.y, transform.position.z);

					//Instantiate (particle, worldSpaceHitPoint, transform.rotation);
					//var targetAngle = Vector3.Angle(targetDir, transform.forward);
					//var targetRotation : Quaternion = Quaternion.Euler(0, 0, targetAngle);
					//var targetRotation = Quaternion.FromToRotation(Vector3.up, hit.point);

					//var tapRotOrigin = Vector3(ray.origin.x, ray.origin.y, 0);
					//var targetRotation = Quaternion.FromToRotation(Vector3.forward, tapRotOrigin);
					//Instantiate (particle, worldSpaceHitPoint, targetRotation);
					var shotDirection = (transform.position -hit.point).normalized;
					var angle = Quaternion.FromToRotation (Vector3.up, shotDirection);
					//var Shot = Instantiate (particle, worldSpaceHitPoint, Quaternion.LookRotation(hit.normal));
					var Shot = Instantiate (particle, worldSpaceHitPoint, angle);
					//Shot.rigidbody.AddForce(shotDirection); 
					//var angle = Vector3.Angle(shotDirection, Vector3.forward);
					
					//Shot.transform.LookAt(angle);
					//Shot.transform.LookAt(hit.normal);
				}
			}
		}

}