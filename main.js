import { FreeCamera, Engine, Scene, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3, Color4 } from "@babylonjs/core";


// If you don't need the standard material you will still need to import it since the scene requires it.
// @ts-ignore

/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.querySelector("#babylon-canvas")

const engine = new Engine(canvas, true)

// This creates a basic Babylon Scene object (non-mesh)
const scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
const camera = new FreeCamera("camera1", new Vector3(-20, 10, 0), scene)

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero())

// This attaches the camera to the canvas
camera.attachControl(canvas, true)


scene.clearColor = new Color4(0, 0, 0, 1)

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7

// Our built-in 'sphere' shape.
const seat = MeshBuilder.CreateBox("seat", {
    width: 5,
    height: 5,
    depth: 1,
}, scene);

seat.position = new Vector3(0,0,0);

const material = new StandardMaterial("seatMaterial", scene);
material.diffuseColor = new Color3(0.7, 0.8, 0.8);
seat.material = material;


seat.rotation = new Vector3(Math.PI / 2, 0, 0);

window.addEventListener("resize", () => {
    engine.resize()
})

engine.runRenderLoop(() => {
    scene.render() 
})
