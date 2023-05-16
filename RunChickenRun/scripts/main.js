document.addEventListener("DOMContentLoaded", Start);

var cena = new THREE.Scene();

var camera1, camera2;
var toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', toggleCamera);

var isCamera1Active = true;

// Definir a primeira câmera
var zoomFactor = 40; // Fator de zoom, 2 para dobrar o tamanho visível
var width = window.innerWidth;
var height = window.innerHeight;

var left = -(width / 2) / zoomFactor;
var right = (width / 2) / zoomFactor;
var topValue = (height / 2) / zoomFactor;
var bottom = -(height / 2) / zoomFactor;

var camera1 = new THREE.OrthographicCamera(left, right, topValue, bottom, -50, 50);
camera1.position.set(2, 4, 0);


var importer = new THREE.FBXLoader();

importer.load('./Javascript/objects/sketchfab.fbx', function(object){
  cena.add(object);

  object.rotateY(Math.PI / 2);

  object.position.set(2, 2, 2);
  object.set.scale(0.1);
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

function Tree(tronco_x, tronco_y, tronco_z, brush_x, brush_y, brush_z) {
  var tree = new THREE.Group();

  var log = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x421b01 })
  );

  log.position.set(tronco_x, tronco_y, tronco_z);
  tree.add(log);

  var green = new THREE.Mesh(
    new THREE.BoxGeometry(brush_x, brush_y, brush_z),
    new THREE.MeshStandardMaterial({ color: 0x5b7327 })
  );

  green.position.set(tronco_x - 0.05, tronco_y + 0.5, tronco_z - 0.05);
  tree.add(green);

  return tree;
}
//0, 0.04, -2.3
function AddPasseio(x, y, z) {
  var geometriaPasseio = new THREE.BoxGeometry(0.1, 0.1, 7);

  var passeioTextura = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

  var meshPasseio = new THREE.Mesh(geometriaPasseio, passeioTextura);
  meshPasseio.position.set(x, y, z);
  meshPasseio.rotateY(Math.PI / 2);

  cena.add(meshPasseio);

  var geometriaPasseio1 = new THREE.BoxGeometry(0.1, 0.1, 7);

  var passeioTextura1 = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

  var meshPasseio1 = new THREE.Mesh(geometriaPasseio1, passeioTextura1);
  meshPasseio1.position.set(x, y, z - 1.4);
  meshPasseio1.rotateY(Math.PI / 2);

  cena.add(meshPasseio1);
}

// -2       // 0.2      //-1.6
function Flower(x, y, z) {
  var flower = new THREE.Group();

  var bottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.6, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x2a4f19 })
  );
  bottom.position.set(x, y, z);
  flower.add(bottom);

  var top = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.16, 0),
    new THREE.MeshStandardMaterial({ color: 0xc957a7 })
  );
  top.position.set(x, y + 0.2, z);
  flower.add(top);

  return flower;
}

function Oak(x, y, z, dim){
  var texture = new THREE.TextureLoader().load("./Images/wood.jpg");

  var oak = new THREE.Mesh(
    new THREE.BoxGeometry(dim, 0.1, 1),
    new THREE.MeshStandardMaterial({ map: texture })
  );

  oak.position.set(x, y, z);

  return oak;
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

function Rodas() {
  var geometry = new THREE.CylinderGeometry(9, 9, 5);
  var material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  var roda = new THREE.Mesh(geometry, material);
  roda.rotation.x=Math.PI/2;
  return roda;
}

function Carro() {
  var carro = new THREE.Group();

  var rodatraseiradireita = Rodas();
  rodatraseiradireita.position.y = 6;
  rodatraseiradireita.position.x = -20;
  rodatraseiradireita.position.z = 13;
  carro.add(rodatraseiradireita);

  var rodatraseiraesquerda = Rodas();
  rodatraseiraesquerda.position.y = 6;  
  rodatraseiraesquerda.position.x = -20;
  rodatraseiraesquerda.position.z = -13;

  carro.add(rodatraseiraesquerda);

  var rodadianteiradireira = Rodas();
  rodadianteiradireira.position.y = 6;  
  rodadianteiradireira.position.x = 20;
  rodadianteiradireira.position.z = 13;

  carro.add(rodadianteiradireira);

  var rodadianteiraesquerda = Rodas();
  rodadianteiraesquerda.position.y = 6;  
  rodadianteiraesquerda.position.x = 20;
  rodadianteiraesquerda.position.z = -13;

  carro.add(rodadianteiraesquerda);

  var chasi = new THREE.Mesh(
    new THREE.BoxGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  chasi.position.y = 12;
  carro.add(chasi);

  var cockpit = new THREE.Mesh(
    new THREE.BoxGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cockpit.position.x = -6;
  cockpit.position.y = 25.5;
  carro.add(cockpit);

  return carro;
}

var lastRoadPosition = new THREE.Vector3();
var lastRoadQuaternion = new THREE.Quaternion();

function generateRandomRoad() {
  // Defina os valores mínimos e máximos para cada parâmetro da estrada
  var minLanes = 2;
  var maxLanes = 4;

  var offset = 10;

  // Gera valores aleatórios dentro desses limites para cada parâmetro da estrada
  var lanes = Math.floor(Math.random() * (maxLanes - minLanes + 1)) + minLanes;

  // Define a posição da estrada de forma aleatória, paralela à estrada anterior
  var normal = new THREE.Vector3(0, 0, 1);
  normal.applyQuaternion(lastRoadQuaternion);
  var position = new THREE.Vector3(lastRoadPosition.x, lastRoadPosition.y, lastRoadPosition.z);
  position.addScaledVector(normal, offset);

  // Cria a estrada com os valores aleatórios gerados
  var road = new Road(lanes, 1.5, 20, 0, 20, 5, 1.5);

  // Define a posição e a rotação da estrada para que fique paralela à estrada anterior
  road.position.copy(position);
  road.quaternion.copy(lastRoadQuaternion);

  // Atualiza a posição e a rotação da última estrada gerada
  lastRoadPosition.copy(road.position);
  lastRoadQuaternion.copy(road.quaternion);

  return road;
}




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

  // Definições iniciais Galinha


  //Definições iniciais Carro
  var carro = new Carro();
  carro.scale.set(0.03,0.03,0.03);
  carro.translateY(0.15);
  carro.translateZ(-0.2);

  cena.add(galinha);
  cena.add(carro);
  cena.add(arvore1);
  cena.add(flower1);
  cena.add(wood1);

  var xSpeed = 1;
  var zSpeed = 1;

  //movimento apenas por coordenadas, falta animar salto.
  //temos que mudar a rotação o centro de rotação da galinha não é o centro da galinha
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
      galinha.position.z -= zSpeed;
      galinha.rotation.y = Math.PI;
    } else if (keyCode == 83) {
      galinha.position.z += zSpeed;
      galinha.rotation.y = 2*Math.PI;
    } else if (keyCode == 65) {
      galinha.position.x -= xSpeed;
      galinha.rotation.y = -Math.PI/2;
    } else if (keyCode == 68) {
      galinha.position.x += xSpeed;
      galinha.rotation.y = Math.PI/2;
    }
  }
    /*} else if (keyCode == 32) {
      galinha.position.set(0, 0.3, -4);
    } 
  }*/ //para já espaço nao usar

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