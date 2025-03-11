import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(0, 10, 20);
camera.lookAt(0, 5, 0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

//Stolsits
const seatGeometry = new THREE.BoxGeometry(6, 1, 6);
const seat = new THREE.Mesh(seatGeometry, material);
seat.position.set(0, 5, 0);
scene.add(seat);

//Ryggstöd
const backGeometry = new THREE.BoxGeometry(6, 6, 1);
const back = new THREE.Mesh(backGeometry, material);
back.position.set(0, 8, -2.5);
scene.add(back);

function animate() {
  requestAnimationFrame( animate );
  //scene.rotation.y += (0.01);
  renderer.render( scene, camera );
}

animate()