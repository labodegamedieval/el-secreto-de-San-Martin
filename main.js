let scene, camera, renderer;
let clock = new THREE.Clock();

init();
animate();

function init() {
  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);

  // Cámara
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('escena-container').appendChild(renderer.domElement);

  // Luces
  const ambientLight = new THREE.AmbientLight(0xbfa87e, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfde4b0, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Suelo
  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x2e2a20 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Mostrar mensaje narrativo
  const mensaje = document.getElementById("mensaje-narrativo");
  const texto = document.getElementById("texto-narrativo");
  const boton = document.getElementById("continuar-btn");

  texto.innerText = `Muchos han caminado por esta plaza sin saber lo que esconde...
Pero solo quien escuche al viento y mire hacia donde apunta la luz...
podrá descubrir el mensaje que Gonzalo escondió siglos atrás.

¿Estás dispuesto a mirar con otros ojos?`;

  mensaje.classList.remove("oculto");

  boton.addEventListener("click", () => {
    mensaje.classList.add("oculto");
    // Aquí activaremos la brújula o el siguiente evento
    console.log("Mensaje aceptado. Activamos siguiente etapa.");
  });

  // Resize
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
  renderer.render(scene, camera);
}
