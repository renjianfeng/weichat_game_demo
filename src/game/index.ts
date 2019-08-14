import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

const SCREEN = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const WIDTH = 14; // number of squares vertical
const HEIGHT = SCREEN.height / SCREEN.width * WIDTH; // number of squares horizontal
const CELLSIZE = 20; // size of one square
// draw everything twice as big and make it smaller to get clean lines even on a retina screen
const SCALE = 2.0;

export class Game {
  private canvas: HTMLCanvasElement;
  constructor() {
    this.canvas = canvas as HTMLCanvasElement;
    document.body.appendChild(this.canvas);
  }

  start() {


    const engine: any = new BABYLON.Engine(this.canvas, true, {
      disableWebGL2Support: true
    }, false); // Generate the BABYLON 3D engine
    //engine.setSize(window.innerWidth, window.innerHeight);
    engine.setHardwareScalingLevel(0.5)
    /******* Add the create scene function ******/
    const createScene = () => {
      // Create the scene space
      const scene = new BABYLON.Scene(engine);

      // Add a camera to the scene and attach it to the canvas
      const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
      camera.attachControl(canvas, true);

      // Add lights to the scene
      const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
      const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

      // Add and manipulate meshes in the scene
      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
      sphere.isPickable =true;
     
      var gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
      var button = GUI.Button.CreateSimpleButton("button", "Clicks: 0");
      button.top = "0px";
      button.left = "0px";
      button.width = "150px";
      button.height = "50px";
      button.cornerRadius = 20;
      button.thickness = 4;
      button.children[0].color = "#DFF9FB";
      button.children[0].fontSize = 24;
      button.color = "#FF7979";
      button.background = "#EB4D4B";

      scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        console.log(pickResult)
        if (pickResult.hit) {
            console.log(pickResult.pickedPoint);
        }
    };
  
      var clicks = 0;
      button.onPointerClickObservable.add(function () {
          clicks++;
          if (clicks % 2 == 0) {
          button.background = "#EB4D4B";
          } else {
          button.background = "#007900";
          }
          button.children[0].text = "Clicks: " + clicks;
      });
  
      gui.addControl(button);    

      return scene;
    };
    /******* End of the create scene function ******/
    const scene = createScene(); //Call the createScene function
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
