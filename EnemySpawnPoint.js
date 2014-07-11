#pragma strict

var EnemyObj : GameObject;
var EnemyObj2 : GameObject;
var hasSpawned : boolean = false;

function Start () {
    hasSpawned = false;
}

function OnTriggerEnter (other : Collider) {
    // Instantiate(nextChunk, Vector3(other.gameObject.transform.position.x, 0, 0), Quaternion.identity);

    //Instantiate(nextChunk, Vector3(transform.position.x, 0, 0), Quaternion.identity);
    if (other.gameObject.tag == "Player" && hasSpawned == false) {
        
        hasSpawned = true;

        #if UNITY_EDITOR
        Debug.Log("you hit the Enemy spawn point!");
        #endif
    
        var EnemyToSpawn : GameObject = Random.value < .65 ? EnemyObj : EnemyObj2;
        var spawnedEnemy : GameObject = PoolManager.Spawn(EnemyToSpawn.name);
        //spawnedEnemy.transform.position = Vector3(transform.position.x, 0, 0);
        spawnedEnemy.transform.localPosition = transform.position;
        //spawnedEnemy.transform.rotation = Quaternion.identity;

        //to detach from parent, once positioned
        spawnedEnemy.transform.parent = null;

        //hasSpawned = true;
    }
}

function OnTriggerExit (other : Collider) {
    if (other.gameObject.tag == "Player" && hasSpawned == true) {
        hasSpawned = false;
        #if UNITY_EDITOR
            Debug.Log("Spawn point has reset at " + transform.position );
        #endif        
    }
}