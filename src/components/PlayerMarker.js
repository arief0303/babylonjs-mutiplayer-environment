import * as BABYLON from "babylonjs";
import * as GUI from 'babylonjs-gui';

export default class PlayerMarker {
    constructor(scene, sessionId) {
        this.scene = scene;
        this.sessionId = sessionId;
        this.playerMarker = null

        // Player Marker
        this.playerMarker = BABYLON.MeshBuilder.CreatePlane("playerMarker", { height: 0.5, width: 1 }, scene);
        this.playerMarker.billboardMode = 7;
        this.playerMarker.checkCollisions = false;
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.playerMarker);
        var marker = new GUI.TextBlock("marker", sessionId);
        marker.width = 1;
        marker.height = 0.5;
        marker.color = "#0DF0F5";
        marker.fontSize = 300;
        marker.fontFamily = "Rajdhani";
        advancedTexture.addControl(marker);
    }

    setPosition(x, y, z) {
        this.playerMarker.position.x = x;
        this.playerMarker.position.y = y;
        this.playerMarker.position.z = z;
    }

    dispose() {
        this.playerMarker.dispose();
    }
}
