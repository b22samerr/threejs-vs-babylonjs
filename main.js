import {ArcRotateCamera, FreeCamera, Engine, Scene, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3, Color4 } from "@babylonjs/core";



/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.querySelector("#babylon-canvas")

const engine = new Engine(canvas, true)

const scene = new Scene(engine);

//const camera = new FreeCamera("camera1", new Vector3(-20, 10, 20), scene)


//camera.setTarget(Vector3.Zero())


//camera.attachControl(canvas, true)


scene.clearColor = new Color4(0, 0, 0, 1)

// skapar ljus
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)

const material = new StandardMaterial("ChairMaterial", scene);

//Säte
const seat = MeshBuilder.CreateBox("seat", {
    width: 4.5,
    height: 5,
    depth: 0.8,
}, scene);

seat.position = new Vector3(0,0,0);
seat.material = material;
seat.rotation = new Vector3(Math.PI / 2, 0, 0);

//Ryggstöd
const back = MeshBuilder.CreateBox("back", {
    width: 4.5,
    height: 5,
    depth: 1,
}, scene);

back.position = new Vector3(0,2.7,-2);
back.material = material;

//Stolsben
const hf = MeshBuilder.CreateBox("hf", {
    width: 1,
    height: 3,
    depth: 1,
}, scene);

hf.position = new Vector3(1.75,-1.9,2);
hf.material = material;

const vf = MeshBuilder.CreateBox("vf", {
    width: 1,
    height: 3,
    depth: 1,
}, scene);

vf.position = new Vector3(-1.75,-1.9,2);
vf.material = material;

const hb = MeshBuilder.CreateBox("hb", {
    width: 1,
    height: 3,
    depth: 1,
}, scene);

hb.position = new Vector3(1.75,-1.9,-2);
hb.material = material;

const vb = MeshBuilder.CreateBox("vb", {
    width: 1,
    height: 3,
    depth: 1,
}, scene);

vb.position = new Vector3(-1.75,-1.9,-2);
vb.material = material;

material.diffuseColor = new Color3(0.7, 0.8, 0.8);

//Justerbar kamera
const camera = new ArcRotateCamera(
    "arcCamera",
    Math.PI / 2,
    Math.PI / 2,
    10,
    new Vector3(0,0,0),
    scene

);
camera.attachControl(canvas, true);


window.addEventListener("resize", () => {
    engine.resize()
})

engine.runRenderLoop(() => {
    scene.render() 
})
