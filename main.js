import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 46, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(0, 10, -250);
camera.lookAt(0, 0, 0);

const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const material = new THREE.MeshStandardMaterial({ 
  color: 0x5D3317,
  opacity: 1, 
  roughness: 0.5,
});

function renderSphere(position) {
  const geometry = new THREE.SphereGeometry(2, 16, 16);
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(position);
  scene.add(sphere);
}


//Iteration av rendering för  en enkel visualiserings scen

function render() {

  let x = -100;
  let y = -85;

  //Iteration för 48 figurer
  for(let i = 0; i < 492; i++){
    renderSphere(new THREE.Vector3(x, y, 0));

    x += 7;
    //När 12 figurer renderats ändras positioneringen på y-axeln, detta skapar en ny rad
    if((i + 1) % 41 === 0 ) {
      x = -100;
      y += 12;

    }
  }
}

render();
function animate() {
  requestAnimationFrame( animate );
  //scene.rotation.y += (0.01);
  renderer.render( scene, camera );
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});