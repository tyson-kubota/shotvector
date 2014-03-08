#pragma strict

// Movable, levitating object.
// https://docs.unity3d.com/Documentation/ScriptReference/RaycastHit-distance.html

// This works by measuring the distance to ground with a
// raycast then applying a force that decreases as the object
// reaches the desired levitation height.

// Vary the parameters below to
// get different control effects. For example, reducing the
// hover damping will tend to make the object bounce if it
// passes over an object underneath.

// Forward movement force.
var moveForce = 1.0;

// Torque for left/right rotation.
var rotateTorque = 1.0;

// Desired hovering height.
var hoverHeight = 4.0;

// The force applied per unit of distance below the desired height.
var hoverForce = 5.0;

// The amount that the lifting force is reduced per unit of upward speed.
// This damping tends to stop the object from bouncing after passing over
// something.
var hoverDamp = 0.5;



function Start () {
	// Fairly high drag makes the object easier to control.
	rigidbody.drag = 0.5;
	rigidbody.angularDrag = 0.5;
}


function FixedUpdate () {
	// Push/turn the object based on arrow key input.
	rigidbody.AddForce(Input.GetAxis("Vertical") * moveForce * transform.forward);
	rigidbody.AddTorque(Input.GetAxis("Horizontal") * rotateTorque * Vector3.up);
	
	var hit: RaycastHit;
	var downRay = new Ray(transform.position, -Vector3.up);
	
	// Cast a ray straight downwards.
	if (Physics.Raycast(downRay, hit)) {
		// The "error" in height is the difference between the desired height
		// and the height measured by the raycast distance.
		var hoverError = hoverHeight - hit.distance;
		
		// Only apply a lifting force if the object is too low (ie, let
		// gravity pull it downward if it is too high).
		if (hoverError > 0) {
			// Subtract the damping from the lifting force and apply it to
			// the rigidbody. 
			var upwardSpeed = rigidbody.velocity.y;
			var lift = hoverError * hoverForce - upwardSpeed * hoverDamp;
			rigidbody.AddForce(lift * Vector3.up);
		}
	}
}