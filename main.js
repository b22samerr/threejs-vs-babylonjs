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

const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const material = new THREE.MeshStandardMaterial({ color: 0x5D3317 });

function chair(x,y,z) {
  const group = new THREE.Group();

  //Stolsits
  const seatGeometry = new THREE.BoxGeometry(6, 1, 6);
  const seat = new THREE.Mesh(seatGeometry, material);
  seat.position.set(0, 5, 0);
  group.add(seat);

  //Ryggstöd
  const backGeometry = new THREE.BoxGeometry(6, 6, 1);
  const back = new THREE.Mesh(backGeometry, material);
  back.position.set(0, 8, -2.5);
  group.add(back);

  //Stolsben Högerfram (hf)
  const hfGeometry = new THREE.BoxGeometry(1, 4, 1);
  const hf = new THREE.Mesh(hfGeometry, material);
  hf.position.set(2.5, 2.5, 2.5);
  group.add(hf);

  //Stolsben Vänsterfram (vf)
  const vfGeometry = new THREE.BoxGeometry(1, 4, 1);
  const vf = new THREE.Mesh(vfGeometry, material);
  vf.position.set(-2.5, 2.5, 2.5);
  group.add(vf);

  //Stolsben Högerbak (hb)
  const hbGeometry = new THREE.BoxGeometry(1, 4, 1);
  const hb = new THREE.Mesh(hbGeometry, material);
  hb.position.set(2.5, 2.5, -2.5);
  group.add(hb);

  //Stolsben Vänsterbak (vb)
  const vbGeometry = new THREE.BoxGeometry(1, 4, 1);
  const vb = new THREE.Mesh(vbGeometry, material);
  vb.position.set(-2.5, 2.5, -2.5);
  group.add(vb);

  group.position.set(x, y, z);
  scene.add(group);
}

//rendera två stolar
chair(-8, 0, 0);  
chair(8, 0, 0);

function animate() {
  requestAnimationFrame( animate );
  // scene.rotation.y += (0.01);
  renderer.render( scene, camera );
}

animate()