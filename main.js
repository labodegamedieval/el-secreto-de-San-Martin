import * as THREE from 'three';

let scene, camera, renderer;
let clock = new THREE.Clock();

init();
animate();

function init() {
  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212); // fondo oscuro realista

  // Cámara
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 5); // Altura media de vista en 1ª persona

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('escena-container').appendChild(renderer.domElement);

  // Luz ambiental + direccional (estilo atardecer)
  const ambientLight = new THREE.AmbientLight(0xbfa87e, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfde4b0, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Suelo básico (para probar)
  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x2e2a20 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Evento resize
  window.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  // Aquí se pueden animar cosas con delta

  renderer.render(scene, camera);
}
