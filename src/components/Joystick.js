import { Mesh, Scene, Vector3, Camera } from 'babylonjs';
import { AdvancedDynamicTexture, Control, Ellipse } from 'babylonjs-gui';

export default class Joystick {

    /**
     * 
     * @param {Scene} scene 
     * @param {Camera} camera 
     * @param {Vector3} target 
     * @param {number} distance 
     * @param {any} canvas 
     */
    constructor(cc) {
        this.CreateJoystick(cc);
    }

    /**
     * Adds a sound to be loaded
     * @param {Camera} camera 
     * @param {Vector3} target 
     * @param {Scene} scene 
     * @param {number} distance 
     * @param {any} canvas 
     * @return {Mesh} polygon 
     */
    CreateJoystick = (cc) => {
        let adt = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let xAddPos = 0;
        let yAddPos = 0;
        let sideJoystickOffset = 50;
        let bottomJoystickOffset = -70;
        // let sideJoystickOffset = 70;
        // let bottomJoystickOffset = -140;
        let _this = this;

        let joystickContainer = this.makeThumbArea("joystickContainer", 2, "#FFFFFF", null);
        joystickContainer.height = "200px";
        joystickContainer.width = "200px";
        joystickContainer.isPointerBlocker = true;
        joystickContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        joystickContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        joystickContainer.alpha = 0.4;
        joystickContainer.left = sideJoystickOffset;
        joystickContainer.top = bottomJoystickOffset;

        let joystickInnerContainer = this.makeThumbArea("joystickInnerContainer", 4, "#FFFFFF", null);
        joystickInnerContainer.height = "80px";
        joystickInnerContainer.width = "80px";
        joystickInnerContainer.isPointerBlocker = true;
        joystickInnerContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        joystickInnerContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;


        let joystickPuck = this.makeThumbArea("joystickPuck",0, "#FFFFFF", "#FFFFFF");
          joystickPuck.height = "60px";
          joystickPuck.width = "60px";
          joystickPuck.isPointerBlocker = true;
          joystickPuck.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
          joystickPuck.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;


        joystickContainer.onPointerDownObservable.add(function(coordinates) {
          joystickPuck.isVisible = true;
          joystickPuck.floatLeft = coordinates.x-(joystickContainer._currentMeasure.width*.5)-sideJoystickOffset;
          joystickPuck.left = joystickPuck.floatLeft;
          joystickPuck.floatTop = adt._canvas.height - coordinates.y-(joystickContainer._currentMeasure.height*.5)+bottomJoystickOffset;
          joystickPuck.top = joystickPuck.floatTop*-1;
          joystickPuck.isDown = true;
          joystickContainer.alpha = 0.9;
        });

        joystickContainer.onPointerUpObservable.add(function(coordinates) {
          xAddPos = 0;
          yAddPos = 0;
          joystickPuck.isDown = false;
          joystickPuck.isVisible = false;
          joystickContainer.alpha = 0.4;
          _this.resetMovement(cc);
        });


        joystickContainer.onPointerMoveObservable.add(function(coordinates) {
          if (joystickPuck.isDown) {
              xAddPos = coordinates.x-(joystickContainer._currentMeasure.width*.5)-sideJoystickOffset;
              yAddPos = adt._canvas.height - coordinates.y-(joystickContainer._currentMeasure.height*.5)+bottomJoystickOffset;
              joystickPuck.floatLeft = xAddPos;
              joystickPuck.floatTop = yAddPos*-1;
              joystickPuck.left = joystickPuck.floatLeft;
              joystickPuck.top = joystickPuck.floatTop;
              console.log(yAddPos);
              if(yAddPos > 0 && yAddPos > Math.abs(xAddPos))
              {
                _this.resetMovement(cc);
                cc.walk(true);
              }
              if(yAddPos < 0 && Math.abs(yAddPos) > Math.abs(xAddPos))
              {
                _this.resetMovement(cc);
                cc.walkBack(true);
              }
              if(xAddPos > 0 && xAddPos > Math.abs(yAddPos))
              {
                _this.resetMovement(cc);
                cc.turnRight(true);
              }
              if(xAddPos < 0 && Math.abs(xAddPos) > Math.abs(yAddPos))
              {
                _this.resetMovement(cc);
                cc.turnLeft(true);
              }
              // console.log(yAddPos);
              
          }
        });

        // console.log(screen.width);
        // check if mobile
        if (screen.width < 1024) {
          adt.addControl(joystickContainer);
          joystickContainer.addControl(joystickInnerContainer);
          joystickContainer.addControl(joystickPuck);
          joystickPuck.isVisible = false;
        }
    }

    makeThumbArea = (name, thickness, color, background, curves) => {
        let rect = new Ellipse();
            rect.name = name;
            rect.thickness = thickness;
            rect.color = color;
            rect.background = background;
            rect.paddingLeft = "0px";
            rect.paddingRight = "0px";
            rect.paddingTop = "0px";
            rect.paddingBottom = "0px";
        return rect;
      }

    resetMovement = (cc) => {
        cc.walk(false);
        cc.walkBack(false);
        cc.turnLeft(false);
        cc.turnRight(false);
    }

}