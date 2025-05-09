import {ArcRotateCamera, FreeCamera, Engine, Scene, Vector3, HemisphericLight, CreateSphere, StandardMaterial, Color3, Color4, TransformNode } from "@babylonjs/core";



/** @type {HTMLCanvasElement} */
// @ts-ignore

const canvas = document.querySelector("#babylon-canvas");

const engine = new Engine(canvas, true);

const scene = new Scene(engine);

scene.clearColor = new Color4(0, 0, 0, 1);

const light = new HemisphericLight("light", new Vector3(0, 0, 0), scene);
light.intensity = 1.0;

const camera = new FreeCamera("camera1", new Vector3(2, 10, -60), scene)

camera.setTarget(Vector3.Zero());

camera.attachControl(canvas, true);

const material = new StandardMaterial("Material", scene);

material.specularColor = new Color3(0, 0, 0);

function renderSphere(position) {
    const sphere = CreateSphere("sphere", { diameter: 4, segments: 32 }, scene);
    sphere.position = position;
    sphere.material = material;
}

function render(){

    let x = -37;
    let y = -17;

    for (let i = 0; i < 48; i++){
        renderSphere(new Vector3(x,y,0));

        x += 7;

        if((i + 1) % 12 === 0) {
            x = -37;
            y += 12;

        }
    }
}

material.diffuseColor = new Color3(0.7, 0.8, 0.8);


window.addEventListener("resize", () => {
    engine.resize()

    
})

render();

engine.runRenderLoop(() => {
    scene.render() 
})
