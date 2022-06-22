model_name = window.location.search.split("=")[1];
model_url = "/file-name/" + model_name;

let scene, camera, render, cube, gltfGlobal;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeebe5);
  scene.add(new THREE.AmbientLight(0xffffff, 7));
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 0.8;

  const gltfLoader = new THREE.GLTFLoader();

  gltfLoader.load(
    model_url,
    function (gltf) {
      scene.add(gltf.scene);

      gltfGlobal = gltf;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  // gltfGlobal.scene.rotation.x += 0;
  gltfGlobal.scene.rotation.y += 0.003;

  renderer.render(scene, camera);
}

init();
animate();
