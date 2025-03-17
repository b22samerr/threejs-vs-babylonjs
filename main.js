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
  const seatGeometry = new THREE.BoxGeometry(3, 0.5, 3);
  const seat = new THREE.Mesh(seatGeometry, material);
  seat.position.set(0, 2.5, 0);
  group.add(seat);

  //Ryggstöd
  const backGeometry = new THREE.BoxGeometry(3, 3, 0.5);
  const back = new THREE.Mesh(backGeometry, material);
  back.position.set(0, 4, -1.25);
  group.add(back);

  //Stolsben Högerfram (hf)
  const hfGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
  const hf = new THREE.Mesh(hfGeometry, material);
  hf.position.set(1.25, 1.25, 1.25);
  group.add(hf);

  //Stolsben Vänsterfram (vf)
  const vfGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
  const vf = new THREE.Mesh(vfGeometry, material);
  vf.position.set(-1.25, 1.25, 1.25);
  group.add(vf);

  //Stolsben Högerbak (hb)
  const hbGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
  const hb = new THREE.Mesh(hbGeometry, material);
  hb.position.set(1.25, 1.25, -1.25);
  group.add(hb);

  //Stolsben Vänsterbak (vb)
  const vbGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
  const vb = new THREE.Mesh(vbGeometry, material);
  vb.position.set(-1.25, 1.25, -1.25);
  group.add(vb);

  group.position.set(x, y, z);
  scene.add(group);
}

//Iteration av rendering för  en enkel visualiserings scen
function renderChairs() {

  let x = -30;
  let y = -12;

  //Iteration för 48 figurer
  for(let i = 0; i < 48; i++){
    chair(x,y);

    x += 5;
    //När 12 figurer renderats ändras positioneringen på y-axeln, detta skapar en ny rad
    if((i + 1) % 12 === 0 ) {
      x = -28;
      y += 8;
    }
  }
}

renderChairs();

function animate() {
  requestAnimationFrame( animate );
  //scene.rotation.y += (0.01);
  renderer.render( scene, camera );
}

animate()