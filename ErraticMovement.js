#pragma strict

	// http://docs.unity3d.com/Documentation/ScriptReference/Mathf.PerlinNoise.html
	// "Bobbing" animation from 1D Perlin noise.

	// Range over which height varies.
	// var heightScale = 1.0;

	// // Distance covered per second along X axis of Perlin plane.
	// var xScale = 1.0;

	// function Update () {
	// 	var height = heightScale * Mathf.PerlinNoise(Time.time * xScale, 0.0);
	// 	var pos = transform.position;
	// 	pos.y = height;
	// 	transform.position = pos;
	// }

var depth : float;
var origZpos : float;
var mvmtScale = 1000.0;
var zScale = 0.5;

function Start () {
	origZpos = transform.position.z;
}

function Update () {
	depth = origZpos - (mvmtScale * Mathf.PerlinNoise(Time.time * zScale, origZpos));
	var pos = transform.position;
	pos.z = depth;
	transform.position = pos;
}