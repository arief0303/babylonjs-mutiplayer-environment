import * as BABYLON from "babylonjs";

/*
export default class Player {
    constructor(mesh, skeleton, name) {
        this.mesh = mesh
        this.mesh.name = name
        this.mesh.layerMask = 1;
        this.mesh.skeleton = skeleton;
        this.mesh.checkCollisions = true;
        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
        this.mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        this.mesh.rotation = this.mesh.rotationQuaternion.toEulerAngles();
        this.mesh.rotationQuaternion = null;
        this.mesh.rotation.y = Math.PI / 4;
    }
};
*/

export default class Player {
    constructor(currentPlayer, mesh, skeleton, id, name, position, animationGroups) {
        this.currentPlayer = currentPlayer;
        this.mesh = mesh;
        this.mesh.name = name
        this.mesh.layerMask = 1;
        this.mesh.skeleton = skeleton;
        this.mesh.checkCollisions = true;
        this.mesh.position = position;
        this.skeleton = skeleton;
        this.id = id;
        this.animationGroups = animationGroups;

        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
        // this.mesh.rotation = this.mesh.rotationQuaternion.toEulerAngles();
        this.mesh.rotationQuaternion = null;
        this.mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    }

    updatePosition(newPosition) {
        this.position = newPosition;
    }
}