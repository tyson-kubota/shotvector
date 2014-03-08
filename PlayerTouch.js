#pragma strict

var pos : Vector3;
var realWorldPos : Vector3;
var particle : GameObject;

function Start () {

}

function Update () {

// if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
// 	realWorldPos = Camera.main.ScreenToWorldPoint(pos);
// 	Debug.Log("Finger touch world point is " + realWorldPos);
// }

// if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)

	// var pos : Vector3 = fingerPos;
	// pos.z = 8;
	// var realWorldPos = Camera.main.ScreenToWorldPoint(pos);

	// {
	//     var fingerPos : Vector3 =  Input.GetTouch(0).position;
	//      transform.position = fingerPos;
	// }

	// var myRay : Ray = Camera.main.ScreenPointToRay( Input.touches[0].position );
	// var hitInfo : RaycastHit;
	// if (Physics.Raycast( myRay, hitInfo ))
	// {
	//     var worldSpaceHitPoint : Vector3 = hitInfo.point;
	// }

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
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(i).position);
				var hit : RaycastHit;

				// Draw targeting reticle/sphere here and change color below,
				// if predicted path intersects an enemy, landscape, etc.

				if (Physics.Raycast (ray, hit)) {
					Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow, 2);
					//Debug.Log("Explosion at " + transform.position);
					// Create a particle if hit
					//Instantiate (particle, transform.position, transform.rotation);
					
					var worldSpaceHitPoint : Vector3 = hit.point;
					var worldSpaceXYHitPoint : Vector3 = Vector3(worldSpaceHitPoint.x, worldSpaceHitPoint.y);
					var transformScreenPos : Vector3 = Vector3 (transform.position.x, transform.position.y, 0);
					//Instantiate (particle, worldSpaceHitPoint, transform.rotation);
					//var targetDir = worldSpaceXYHitPoint - transform.position;					
					//var targetAngle = Vector3.Angle(targetDir, transform.forward);
					//var targetRotation : Quaternion = Quaternion.Euler(0, 0, targetAngle);
					//var targetRotation = Quaternion.FromToRotation(Vector3.up, hit.point);

					var tapRotOrigin = Vector3(ray.origin.x, ray.origin.y, 0);
					var targetRotation = Quaternion.FromToRotation(Vector3.up, tapRotOrigin);
					//Instantiate (particle, worldSpaceXYHitPoint, targetRotation);
					Instantiate (particle, transformScreenPos, targetRotation);
				}
			}
		}

}