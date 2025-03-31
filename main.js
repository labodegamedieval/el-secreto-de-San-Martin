let scene, camera, renderer;
let clock = new THREE.Clock();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let llave;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('escena-container').appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xbfa87e, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfde4b0, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x2e2a20 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // === LLAVE FLOTANTE ===
  const llaveGeo = new THREE.BoxGeometry(0.5, 0.2, 0.1);
  const llaveMat = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffff66 });
  llave = new THREE.Mesh(llaveGeo, llaveMat);
  llave.position.set(0, 1.5, 0);
  llave.visible = false;
  scene.add(llave);

  const mensaje = document.getElementById("mensaje-narrativo");
  const texto = document.getElementById("texto-narrativo");
  const boton = document.getElementById("continuar-btn");

  texto.innerText = `Muchos han caminado por esta plaza sin saber lo que esconde...\nPero solo quien escuche al viento y mire hacia donde apunta la luz...\npodrá descubrir el mensaje que Gonzalo escondió siglos atrás.\n\n¿Estás dispuesto a mirar con otros ojos?`;
  mensaje.classList.remove("oculto");

  boton.addEventListener("click", () => {
    mensaje.classList.add("oculto");
    document.getElementById("brujula").classList.remove("oculto");

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", updateBrujula, true);
        } else {
          alert("No se concedió permiso para usar la brújula.");
        }
      }).catch(console.error);
    } else {
      window.addEventListener("deviceorientation", updateBrujula, true);
    }
  });

  window.addEventListener("resize", () => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}

function updateBrujula(event) {
  const alpha = event.alpha;
  const brujulaImg = document.getElementById("brujula-img");
  const brujulaBox = document.getElementById("brujula");
  const mensajeSecreto = document.getElementById("mensaje-secreto");

  if (alpha !== null && !isNaN(alpha)) {
    brujulaImg.style.transform = `rotate(${-alpha}deg)`;
    document.getElementById("alpha-valor").textContent = alpha.toFixed(1);

    const objetivo = 0; // Norte real
    const margen = 15;

    if (alpha > (objetivo - margen) && alpha < (objetivo + margen)) {
      brujulaBox.classList.add("acertado");
      mensajeSecreto.classList.remove("oculto");
      llave.visible = true;
    } else {
      brujulaBox.classList.remove("acertado");
      mensajeSecreto.classList.add("oculto");
      llave.visible = false;
    }
  }
}

window.addEventListener("click", function (event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([llave]);

  if (intersects.length > 0 && llave.visible) {
    const fragmento = document.getElementById("fragmento-mensaje");
    const texto = document.getElementById("texto-fragmento");
    fragmento.classList.remove("oculto");
    texto.innerText = `\"Donde el agua canta, el secreto empieza...\"`;
    llave.visible = false;
  }
});

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  renderer.render(scene, camera);
}
