#pragma strict

var isSolid : boolean = false;
var readyToHide : boolean = false;
var myPoolObject : PoolObject;
var myObject : GameObject;

function OnBecameVisible () {
    if (isSolid == false) {
        isSolid = true;
        myPoolObject = myObject.GetComponent(PoolObject);
    }
}

function OnBecameInvisible () {
    if (isSolid == true && readyToHide == true) {
        isSolid = false;
        Debug.Log("Level chunk " + myPoolObject.name + " is now invisible." );
        yield WaitForSeconds(2.0);
        PoolManager.Despawn(myPoolObject.gameObject);
    }
}

function CanHide() {
	readyToHide = true;
}