let scene, camera, renderer, arToolkitSource, arToolkitContext;
let markerRoot, loadedModel;

init();
animate();

function init() {
    // Configuração da cena, câmera, renderer e AR
    scene = new THREE.Scene();
    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    arToolkitSource = new THREEx.ArToolkitSource({ sourceType: 'webcam' });

    arToolkitSource.init(function onReady() {
        onResize();
    });

    window.addEventListener('resize', onResize);

    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://cdn.rawgit.com/artoolkit/artoolkit5/5.3.1/doc/patterns/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    markerRoot = new THREE.Group();
    scene.add(markerRoot);

    // Carregando o modelo GLTF
    let loader = new THREE.GLTFLoader();
    loader.load('treasure/scene.gltf', function(gltf) {
        loadedModel = gltf.scene;
        loadedModel.scale.set(0.5, 0.5, 0.5); // Ajuste a escala conforme necessário
        markerRoot.add(loadedModel);
    }, undefined, function(error) {
        console.error(error);
    });
}

function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);

    renderer.render(scene, camera);
}

// Código para interação com objetos 3D
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

let selectedObject = null;
let mouse = new THREE.Vector2();

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(markerRoot.children);
    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
    }
}

function onDocumentMouseMove(event) {
    if (selectedObject) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObjects(markerRoot.children);
        if (intersects.length > 0) {
            selectedObject.position.copy(intersects[0].point);
        }
    }
}

function onDocumentMouseUp(event) {
    selectedObject = null;
}
