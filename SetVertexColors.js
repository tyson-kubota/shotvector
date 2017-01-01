#pragma strict

var yZeroVal : Color;
var yOneVal : Color;

var origColor : Color;
var burstColor : Color;

var lerpableColor : Color;
var lerpableColorA : Color;
var lerpableColorB : Color;
var healthColor : Color;

var mesh : Mesh;
var uv : Vector2[];
var vertices : Vector3[];

	// Sets the vertex color to be red at the y=0 and green at y=1.
	// (Note that most builtin shaders don't display vertex colors, you can
	// use eg. a particle shader to see vertex colors)
	// function Start () {
	// 	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	// 	var vertices : Vector3[] = mesh.vertices;
	// 	var colors : Color[] = new Color[vertices.Length];
	// 	for (var i = 0; i < vertices.Length;i++)
	// 		colors[i] = Color.Lerp(yZeroVal, yOneVal, vertices[i].y);
	// 	mesh.colors = colors;
	// }

// http://answers.unity3d.com/questions/51283/is-there-a-way-to-make-a-gradient-material-white-to-black-in-Unity3D.html

function Start () 
{
    mesh = GetComponent(MeshFilter).mesh;
    vertices = mesh.vertices;
    uv = mesh.uv;
    var colors : Color32[] = new Color32[uv.Length];
 
    // Instead if vertex.y we use uv.x
    for (var i = 0; i < uv.Length;i++)
        colors[i] = Color.Lerp(yZeroVal,yOneVal, uv[i].x); 
 
    mesh.colors32 = colors;

    lerpableColorA = yZeroVal;
    lerpableColorB = yOneVal;
}

// function UpdateColors () {
//     var colors : Color32[] = new Color32[uv.Length];
  
//     // Instead if vertex.y we use uv.x
//     for (var i = 0; i < uv.Length;i++)
//         colors[i] = Color.Lerp(yTwoVal,yThreeVal, uv[i].x); 
 
//     mesh.colors32 = colors;
// }


function RestoreColors () {
    // var colors : Color32[] = new Color32[uv.Length];
  
    // for (var i = 0; i < uv.Length;i++)
    //     colors[i] = Color.Lerp(yZeroVal,yOneVal, uv[i].x); 
 
    // mesh.colors32 = colors;
    lerpableColor = origColor;
    gameObject.GetComponent.<Renderer>().material.SetColor ("_Color", lerpableColor);
}

// lerpedColor = Color.Lerp(Color.white, Color.black, Time.time);


function FlashColors (timer : float) {
    var colors : Color32[] = new Color32[uv.Length];

    var start = origColor;
    var end = burstColor;
    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        lerpableColor = Color.Lerp(end, start, i);
 		gameObject.GetComponent.<Renderer>().material.SetColor ("_Color", lerpableColor);
        yield;
                
    	}

    yield WaitForSeconds (timer);
 
}

function FlashColorsPlayer (timer : float) : IEnumerator {
    
    healthColor = Color.Lerp(burstColor, origColor, PlayerBrain.HPRatio);
    //Debug.Log("healthColor is" + healthColor);

    var colors : Color32[] = new Color32[uv.Length];

    var start = healthColor;
    var end = burstColor;
    var i = 0.0;
    var step = 1.0/timer;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        lerpableColor = Color.Lerp(end, start, i);
        gameObject.GetComponent.<Renderer>().material.SetColor ("_Color", lerpableColor);
        yield;
                
        }

    yield WaitForSeconds (timer);
 
}

// function LerpColors (timer : float, colorA: Color, colorB : Color) {
//     var colors : Color32[] = new Color32[uv.Length];

//     var startA = yZeroVal;
//     var startB = yOneVal;
//     var i = 0.0;
//     var step = 1.0/timer;
    
//     while (i <= 1.0) { 
//         i += step * Time.deltaTime;
//         lerpableColor = Color.Lerp(startA, colorA, i);
//         lerpableColor = Color.Lerp(startB, colorB, i);
//         gameObject.renderer.material.SetColor ("_Color", lerpableColor);
//         yield;
                
//         }

//     yield WaitForSeconds (timer);
 
// }

function LerpColors (timer : float, colorA: Color, colorB : Color) {
    mesh = GetComponent(MeshFilter).mesh;
    vertices = mesh.vertices;
    uv = mesh.uv;
    var colors : Color32[] = new Color32[uv.Length];
    var i = 0.0;
    var step = 1.0/timer;

    var startA = lerpableColorA;
    var startB = lerpableColorB;

     while (i <= 1.0) { 
        i += step * Time.deltaTime;
        lerpableColorA = Color.Lerp(startA, colorA, i);
        lerpableColorB = Color.Lerp(startB, colorB, i);
        for (var a = 0; a < uv.Length;a++)
        colors[a] = Color.Lerp(lerpableColorA,lerpableColorB, uv[a].x); 
        mesh.colors32 = colors;

        yield;
                
        }

        yield WaitForSeconds (timer);

}