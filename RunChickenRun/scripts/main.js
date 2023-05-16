document.addEventListener("DOMContentLoaded", Start);

var cena = new THREE.Scene();

var camera1, camera2;
var toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleCamera);

var isCamera1Active = true;

// Definir a primeira câmera
var zoomFactor = 40; // Fator de zoom, 2 para dobrar o tamanho visível
var width = window.innerWidth;
var height = window.innerHeight;

var left = -(width / 2) / zoomFactor;
var right = width / 2 / zoomFactor;
var topValue = height / 2 / zoomFactor;
var bottom = -(height / 2) / zoomFactor;

var camera1 = new THREE.OrthographicCamera(
  left,
  right,
  topValue,
  bottom,
  -50,
  50
);
camera1.position.set(2, 4, 0);

var importer = new THREE.FBXLoader();

importer.load("./Javascript/objects/sketchfab.fbx", function (object) {
  cena.add(object);

  object.rotateY(Math.PI / 2);

  object.position.set(5, 1, 1.7);
  object.scale.set(0.5, 0.5, 0.5);
});

// Definir a segunda câmera
var fov = 70; // Campo de visão em graus
var aspect = window.innerWidth / window.innerHeight;
var near = 0.1; // Distância mínima de renderização
var far = 100; // Distância máxima de renderização

var camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera2.position.set(0, 7, 0);

// Adicionar ambas as câmeras à cena
cena.add(camera1);
cena.add(camera2);

// Função para alternar entre as câmeras
function toggleCamera() {
  if (isCamera1Active) {
    camera1.enabled = false;
    camera2.enabled = true;
    isCamera1Active = false;
  } else {
    camera1.enabled = true;
    camera2.enabled = false;
    isCamera1Active = true;
  }
  // Atualizar a renderização da cena
  renderCameras();
}

function Galinha() {
  var galinha = new THREE.Group();

  var corpo = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );

  corpo.position.z = 10;
  corpo.castShadow = true;
  corpo.receiveShadow = true;
  galinha.add(corpo);

  var crista = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 4),
    new THREE.MeshPhongMaterial({ color: 0xff6949, flatShading: true })
  );

  crista.position.z = 10;
  crista.position.y = 6;
  crista.position.x = 0;
  crista.castShadow = true;
  crista.receiveShadow = true;
  galinha.add(crista);

  var olhod = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhod.position.z = 15;
  olhod.position.y = 2;
  olhod.position.x = 2;
  olhod.castShadow = true;
  olhod.receiveShadow = true;
  galinha.add(olhod);

  var olhoe = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhoe.position.z = 15;
  olhoe.position.y = 2;
  olhoe.position.x = -2;
  olhoe.castShadow = true;
  olhoe.receiveShadow = true;
  galinha.add(olhoe);

  var bico = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 2),
    new THREE.MeshPhongMaterial({ color: 0xff7800, flatShading: true })
  );

  bico.position.z = 15;
  bico.position.y = 0;
  bico.position.x = 0;
  bico.castShadow = true;
  bico.receiveShadow = true;
  galinha.add(bico);

  // bordas na corpo da galinha, neste momento off fica melhor
  //var geo = new THREE.EdgesGeometry(corpo.geometry);
  //var mat = new THREE.LineBasicMaterial({ color: 0x9c9c9c, flatShading: true });
  //var bordas = new THREE.LineSegments(geo, mat);
  //corpo.add(bordas);

  return galinha;
}

var galinha = new Galinha();
galinha.scale.set(0.05, 0.05, 0.05);
galinha.translateY(0.3);
galinha.translateZ(-5.0);

var velocidadeX = 1.5; // Exemplo de velocidade de movimento no eixo X
var velocidadeY = 1.5; // Exemplo de velocidade de movimento no eixo Y

function renderCameras() {
  // Renderizar a cena com a câmera ativa
  if (isCamera1Active) {
    camera1.position.x = galinha.position.x + 10;
    camera1.position.y = galinha.position.y + 10;
    camera1.position.z = galinha.position.z + 10;
    camera1.lookAt(galinha.position);
    renderer.render(cena, camera1);
  } else {
    camera1.position.x = galinha.position.x + 7;
    camera1.position.y = galinha.position.y + 7;
    camera1.position.z = galinha.position.z + 7;
    camera2.lookAt(galinha.position);
    renderer.render(cena, camera2);
  }
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 15, window.innerHeight - 80);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera1, renderer.domElement);
controls.update();

document.body.appendChild(renderer.domElement);

var lastRoadPosition = new THREE.Vector3();
var lastRoadQuaternion = new THREE.Quaternion();

function Start() {
  GenerateMap();

  // var firstRoad = new Road(2, 1.5, 0, 0, 5, 5, 1.5);
  // cena.add(firstRoad);

  // for (var i = 0; i < 9; i++) {
  //   var road = generateRandomRoad(firstRoad);
  //   cena.add(road);
  //   firstRoad = road;
  // }

  var arvore1 = new Tree(-2, 0.3, -2.5, 0.6, 0.8, 0.6);
  var flower1 = new Flower(2, 0.2, -2.5);
  var wood1 = new Oak(0, 0.05, -7, 2);

  //Definições iniciais Carro
  var carro = new Carro();
  carro.scale.set(0.03, 0.03, 0.03);
  carro.translateY(0.15);
  carro.translateZ(-0.2);

  cena.add(galinha);
  cena.add(carro);
  cena.add(arvore1);
  cena.add(flower1);
  cena.add(wood1);

  var xSpeed = 0.5;
  var zSpeed = 0.5;
  var isJumping = false;
  var jumpHeight = 1;
  var groundHeight = 0.3;  // Ajuste a altura do chão conforme necessário


  //movimento apenas por coordenadas, falta animar salto.
  //temos que mudar a rotação o centro de rotação da galinha não é o centro da galinha
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
      galinha.position.z -= zSpeed;
      galinha.rotation.y = Math.PI;
      
    } else if (keyCode == 83) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
      galinha.position.z += zSpeed;
      galinha.rotation.y = 2 * Math.PI;
    } else if (keyCode == 65) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
      galinha.position.x -= xSpeed;
      galinha.rotation.y = -Math.PI / 2;
    } else if (keyCode == 68) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
      galinha.position.x += xSpeed;
      galinha.rotation.y = Math.PI / 2;
      
    } else if (keyCode == 32) { // Tecla de salto (espaço)
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }

  function jump() {
    var initialPositionY = galinha.position.y; // Posição inicial em Y da galinha
    var jumpTime = 0.5; // Tempo total para completar o salto
    var jumpSpeed = jumpHeight / jumpTime; // Velocidade de salto (ajuste conforme necessário)

    var startTime = Date.now(); // Tempo de início do salto

    function updateJump() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Tempo decorrido desde o início do salto
      if (elapsedTime <= jumpTime) {
        var jumpDistance = jumpSpeed * elapsedTime; // Distância de salto alcançada até o momento

        // Atualiza a posição vertical da galinha
        galinha.position.y = initialPositionY + jumpDistance - 0.5 * 9.8 * elapsedTime * elapsedTime;

        // Verifica se a posição da galinha está abaixo do chão
        if (galinha.position.y <= groundHeight) {
          galinha.position.y = groundHeight; // Mantém a galinha no chão
          isJumping = false; // O salto foi concluído
        }

        // Chama recursivamente a função para atualizar o salto
        requestAnimationFrame(updateJump);
      } else {
        // O salto foi concluído
        isJumping = false;
      }
    }

    // Inicia o salto
    updateJump();
  }


  cena.add(controls);

  // criar os axis
  const axesHelper = new THREE.AxesHelper(10);
  cena.add(axesHelper);

  // cria a luz
  var luz = new THREE.DirectionalLight(0xffffff, 1);
  luz.position.set(-6, 4, 2);
  cena.add(luz);

  // cria o helper da luz
  var helper = new THREE.DirectionalLightHelper(luz, 5);
  cena.add(helper);

  // Chamar a função loop()
  requestAnimationFrame(loop);
}

function loop() {
  //controls.update();

  renderCameras();

  requestAnimationFrame(loop);
}
