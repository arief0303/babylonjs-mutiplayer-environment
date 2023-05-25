import { ref, onMounted, onUnmounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import * as BABYLON from 'babylonjs'
import Stats from "stats-js";
import "babylonjs-loaders";
import { CharacterController } from "babylonjs-charactercontroller";
import * as Colyseus from "colyseus.js";
// import Player from './Player';
import CharacterCustomization from './CharacterCustomization';
import { setupCharacterPack } from './character_customize';
import PlayerMarker from './PlayerMarker';
import Joystick from './Joystick';

export default {
    setup() {
        const canvas = ref(null);
        let engine = null;
        let scene = null;
        let playerEntities = {};
        let playerMarkerEntities = {};
        const isFullscreen = ref(false);

        let statsFPS = new Stats();
        statsFPS.domElement.style.cssText = "position:absolute;top:3px;left:3px;";
        statsFPS.showPanel(0); // 0: fps,

        let statsMemory = new Stats();
        statsMemory.showPanel(2); //2: mb, 1: ms, 3+: custom
        statsMemory.domElement.style.cssText = "position:absolute;top:3px;left:84px;";

        //add stats for FPS and Memory usage
        document.body.appendChild(statsFPS.dom);
        document.body.appendChild(statsMemory.dom);


        const init = async () => {
            /* if (navigator.gpu) {
              engine = new BABYLON.WebGPUEngine(canvas.value)
              scene = new BABYLON.Scene(engine)
            } else {
              engine = new BABYLON.Engine(canvas.value)
              scene = new BABYLON.Scene(engine)
            } */
            engine = new BABYLON.Engine(canvas.value)
            scene = new BABYLON.Scene(engine)

            await loadMap("Full_Area-centered.glb");
            await loadPlayer(scene, engine, canvas);

            // create a light
            scene.createDefaultLight(true);
        }

        const loadMap = async (map) => {
            engine.displayLoadingUI();
            const importPromise = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/env/", map, scene);
            importPromise.meshes.forEach(m => {
                m.checkCollisions = true;
                m.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION; // set culling strategy to improve performance
                m.freezeWorldMatrix(); // freeze world matrix to save resources
            });
            importPromise.meshes[0].name = "map";
            engine.hideLoadingUI();
        }

        const loadPlayer = async (scene, engine, canvas) => {
            // Connect with Colyseus server
            let client = new Colyseus.Client("wss://bitaverse-server.immortal-universe.com:80");
            console.log("Connecting to Colyseus server...");
            let room = await client.joinOrCreate("my_room");
            console.log("Connected to Colyseus server!");
            room.state.players.onAdd((playerSocket, sessionId) => {
                let isCurrentPlayer = (sessionId === room.sessionId);
                // console.log("New player joined with sessionId:", sessionId);
                if (isCurrentPlayer) {
                    BABYLON.SceneLoader.ImportMesh("", "assets/player/", "chara_full.glb", scene, (meshes, particleSystems, skeletons, animationGroups) => {
                        let player = meshes[0];
                        player.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                        player.position = new BABYLON.Vector3(0, 0, 0);
                        player.checkCollisions = true;
                        player.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
                        player.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
                        player.rotation = player.rotationQuaternion.toEulerAngles();
                        player.rotationQuaternion = null;
                        let skeleton = skeletons[0];
                        player.skeleton = skeleton;
                        skeleton.enableBlending(0.1);
                        let characterCustomization = CharacterCustomization.getInstance();
                        characterCustomization.setCurrentAvatarPack("Female", "HeadFemaleBase", "BodyFemaleBase", "PantsFemaleBase");
                        let characterData = characterCustomization.getCurrentAvatarPack();
                        setupCharacterPack(meshes, characterData);
                        const myAgmap = {
                            "idle": animationGroups[3],
                            "walk": animationGroups[9],
                            "run": animationGroups[5],
                            "idleJump": animationGroups[4],
                            "runJump": animationGroups[4],
                            "dancing": animationGroups[0],
                            "happy": animationGroups[1],
                            "hello": animationGroups[2],
                            "salute": animationGroups[6],
                            "sitting": animationGroups[7],
                            "sleeping": animationGroups[8],
                        };
                        let myPlayerMarker = new PlayerMarker(scene, sessionId);
                        playerEntities[sessionId] = player;
                        playerMarkerEntities[sessionId] = myPlayerMarker;

                        //if the skeleton does not have any animation ranges then set them as below
                        // setAnimationRanges(skeleton);
                        //rotate the camera behind the player
                        let alpha = -player.rotation.y - 4.69;
                        let beta = Math.PI / 2.5;
                        let target = new BABYLON.Vector3(player.position.x, player.position.y + 1.5, player.position.z);
                        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", alpha, beta, 5, target, scene);
                        //standard camera setting
                        camera.wheelPrecision = 15;
                        camera.checkCollisions = true;
                        //make sure the keyboard keys controlling camera are different from those controlling player
                        //here we will not use any keyboard keys to control camera
                        camera.keysLeft = [];
                        camera.keysRight = [];
                        camera.keysUp = [];
                        camera.keysDown = [];
                        //how close can the camera come to player
                        camera.lowerRadiusLimit = 2;
                        //how far can the camera go from the player
                        camera.upperRadiusLimit = 10;
                        camera.attachControl(canvas, false);

                        //var CharacterController = org.ssatguru.babylonjs.component.CharacterController;
                        let cc = new CharacterController(player, camera, scene, myAgmap);
                        cc.setTurningOff(true);
                        //below makes the controller point the camera at the player head which is approx
                        //1.5m above the player origin
                        cc.setCameraTarget(new BABYLON.Vector3(0, 1.5, 0));
                        cc.setCameraElasticity(false);
                        //if the camera comes close to the player we want to enter first person mode.
                        cc.setNoFirstPerson(true);
                        //the height of steps which the player can climb
                        cc.setStepOffset(0.4);
                        //the minimum and maximum slope the player can go up
                        //between the two the player will start sliding down if it stops
                        cc.setSlopeLimit(30, 60);

                        //tell controller 
                        // - which animation range should be used for which player animation
                        // - rate at which to play that animation range
                        // - wether the animation range should be looped
                        //use this if name, rate or looping is different from default
                        cc.setIdleAnim("idle", 1, true);
                        cc.setTurnLeftAnim("turnLeft", 0.5, true);
                        cc.setTurnRightAnim("turnRight", 0.5, true);
                        cc.setWalkBackAnim("walkBack", 0.5, true);
                        cc.setIdleJumpAnim("idleJump", .5, false);
                        cc.setRunJumpAnim("runJump", 0.6, false);
                        //set the animation range name to "null" to prevent the controller from playing
                        //a player animation.
                        //here even though we have an animation range called "fall" we donot want to play 
                        //the fall animation
                        cc.setFallAnim("fall", 2, false);
                        cc.setSlideBackAnim("slideBack", 1, false)
                        animationGroups[0].stop(); //stop default animation from playing overlapping with idle anim
                        cc.start();

                        // Setup Joystick
                        new Joystick(cc);

                        // Render loop
                        engine.runRenderLoop(function () {
                            myPlayerMarker.setPosition(player.position.x, player.position.y + 2.25, player.position.z); // keep track of myPlayer.mesh marker
                            scene.render();

                            //update stats
                            statsFPS.update();
                            statsMemory.update();
                        });
                        player.onAfterWorldMatrixUpdateObservable.add(function () {
                            console.log("Player position changed to: " + player.position);
                            // Send position update to the server
                            room.send("updatePosition", {
                                x: player.position.x,
                                y: player.position.y,
                                z: player.position.z,
                                rx: player.rotation.x,
                                ry: player.rotation.y,
                                rz: player.rotation.z
                            });
                            room.send("updateAnimation", {
                                animstate: "walk"
                            });
                        });
                    });
                }
                else {
                    BABYLON.SceneLoader.ImportMesh("", "assets/player/", "chara_full.glb", scene, (meshes, particleSystems, skeletons, animationGroups) => {
                        //
                        // A player has joined!
                        //
                        console.log("A player has joined! Their unique session id is", sessionId);
                        let otherPlayer = meshes[0];
                        let otherPlayerMarker = new PlayerMarker(scene, sessionId);
                        otherPlayerMarker.setPosition(otherPlayer.position.x, otherPlayer.position.y + 2.25, otherPlayer.position.z);
                        otherPlayer.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                        otherPlayer.checkCollisions = true;
                        otherPlayer.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
                        otherPlayer.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
                        otherPlayer.rotation = otherPlayer.rotationQuaternion.toEulerAngles();
                        otherPlayer.rotationQuaternion = null;
                        let skeleton = skeletons[0];
                        otherPlayer.skeleton = skeleton;
                        skeleton.enableBlending(0.1);
                        const myAgmap = {
                            "idle": animationGroups[3],
                            "walk": animationGroups[9],
                            "run": animationGroups[5],
                            "idleJump": animationGroups[4],
                            "runJump": animationGroups[4],
                            "dancing": animationGroups[0],
                            "happy": animationGroups[1],
                            "hello": animationGroups[2],
                            "salute": animationGroups[6],
                            "sitting": animationGroups[7],
                            "sleeping": animationGroups[8],
                        };
                        let characterCustomization = CharacterCustomization.getInstance();
                        characterCustomization.setCurrentAvatarPack("Female", "HeadFemaleBase", "BodyFemaleBase", "PantsFemaleBase");
                        let characterData = characterCustomization.getCurrentAvatarPack();
                        setupCharacterPack(meshes, characterData);
                        animationGroups[0].stop(); //stop default index[0] animation from playing overlapping with idle anim
                        animationGroups[3].start(true);
                        playerEntities[sessionId] = otherPlayer;
                        playerMarkerEntities[sessionId] = otherPlayerMarker;
                        playerEntities[playerSocket.iduser].position.set(playerSocket.x, playerSocket.y, playerSocket.z);
                        playerEntities[playerSocket.iduser].rotation.set(playerSocket.rx, playerSocket.ry, playerSocket.rz);
                        playerMarkerEntities[sessionId].setPosition(playerSocket.x, playerSocket.y + 2.25, playerSocket.z);

                        // console.log("Player Entities: ", playerEntities)
                        playerSocket.onChange(() => {
                            // console.log("the room state has been updated:", state);
                            if (playerEntities[playerSocket.iduser] != undefined) {
                                // console.log("updateAnimation state", playerSocket.iduser, playerSocket.animstate);
                                if (playerSocket.animstate == "walk") {
                                    animationGroups[9].start();
                                }
                                playerEntities[playerSocket.iduser].position.set(playerSocket.x, playerSocket.y, playerSocket.z);
                                playerEntities[playerSocket.iduser].rotation.set(playerSocket.rx, playerSocket.ry, playerSocket.rz);
                                playerMarkerEntities[sessionId].setPosition(playerSocket.x, playerSocket.y + 2.25, playerSocket.z);
                            }
                        });
                    });
                }
                // 
                // schema callback: on player remove
                // 
                room.state.players.onRemove((player, sessionId) => {
                    if (playerEntities[sessionId]) {
                        playerEntities[sessionId].dispose();
                        playerMarkerEntities[sessionId].dispose();
                        delete playerMarkerEntities[sessionId];
                        delete playerEntities[sessionId];
                    }
                });
                // on room disconnection
                room.onLeave(code => {
                    console.log("room left");
                });
            });
        }

        const toggleFullscreen = () => {
            isFullscreen.value = !isFullscreen.value;

            if (isFullscreen.value) {
                // Enter fullscreen mode
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen mode
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        };

        const handleResize = () => {
            if (engine) {
                engine.resize()
            }
        }

        onMounted(() => {
            init()
            useEventListener(window, 'resize', handleResize)
        })

        onUnmounted(() => {
            engine.dispose()
        })

        return {
            canvas,
            isFullscreen,
            toggleFullscreen
        }
    },
}