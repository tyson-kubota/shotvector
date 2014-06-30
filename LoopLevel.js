#pragma strict

var myPoolObject : PoolObject;
var myObject : GameObject;
var MyLayerMask : int;
var raycastDepth : int = 5000;
var nextChunkObj : GameObject;
var nextChunk : LoopedLevelChunk;
var prevChunk : LoopedLevelChunk;

function Start () {
    MyLayerMask = (1 << LayerMask.NameToLayer("LevelChunkLayer"));
}

function OnTriggerEnter (other : Collider) {
    // Instantiate(nextChunk, Vector3(other.gameObject.transform.position.x, 0, 0), Quaternion.identity);
    Debug.Log("you hit the divider!");
    //Instantiate(nextChunk, Vector3(transform.position.x, 0, 0), Quaternion.identity);
    var spawnedChunk : GameObject = PoolManager.Spawn(nextChunkObj.name);
    spawnedChunk.transform.position = Vector3(transform.position.x, 0, 0);
    spawnedChunk.transform.rotation = Quaternion.identity;

    //to detach from parent, once positioned
    spawnedChunk.transform.parent = null;
}

function OnTriggerExit (other : Collider) {
    prevChunk = other.gameObject.GetComponent(LoopedLevelChunk);
    if (prevChunk) {prevChunk.CanHide();}
}