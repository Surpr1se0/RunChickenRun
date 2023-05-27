document.addEventListener("DOMContentLoaded", Start);

var contador = 0;
var cena = new THREE.Scene();

var camera1, camera2;
var toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleCamera);

var luz;
var isCamera1Active = true;
var isCamera2Active = false;
var iscamera3Active = false;

// Definir a primeira câmera
var zoomFactor = 60; // Fator de zoom, 2 para dobrar o tamanho visível
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

// Definir a segunda câmera
var fov = 70; // Campo de visão em graus
var aspect = window.innerWidth / window.innerHeight;
var near = 0.1; // Distância mínima de renderização
var far = 100; // Distância máxima de renderização

var camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera2.position.set(0, 7, 0);

// Definir a terceira câmera
var fov = 30; // Campo de visão em graus
var aspect = window.innerWidth / window.innerHeight;
var near = 0.1; // Distância mínima de renderização
var far = 100; // Distância máxima de renderização

var camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera3.position.set(0, 7, 0);

// Adicionar ambas as câmeras à cena
cena.add(camera1);
cena.add(camera2);
cena.add(camera3);

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

var textura_direita = new THREE.TextureLoader().load(
  "./Images/skybox_dia/right.jpg"
);
var textura_esquerda = new THREE.TextureLoader().load(
  "./Images/skybox_dia/left.jpg"
);
var textura_cima = new THREE.TextureLoader().load(
  "./Images/skybox_dia/top.jpg"
);
var textura_baixo = new THREE.TextureLoader().load(
  "./Images/skybox_dia/bottom.jpg"
);
var textura_tras = new THREE.TextureLoader().load(
  "./Images/skybox_dia/back.jpg"
);
var textura_frente = new THREE.TextureLoader().load(
  "./Images/skybox_dia/front.jpg"
);

var materialArray = [];

materialArray.push(new THREE.MeshBasicMaterial({ map: textura_direita }));
materialArray.push(new THREE.MeshBasicMaterial({ map: textura_esquerda }));
materialArray.push(new THREE.MeshBasicMaterial({ map: textura_cima }));
materialArray.push(new THREE.MeshBasicMaterial({ map: textura_baixo }));
materialArray.push(new THREE.MeshBasicMaterial({ map: textura_tras }));
materialArray.push(new THREE.MeshBasicMaterial({ map: textura_frente }));

for (var i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

var skyboxGeo = new THREE.BoxGeometry(50, 50, 50); // alterar conforme o tamanho do mapa

var skybox = new THREE.Mesh(skyboxGeo, materialArray);

cena.add(skybox);

function Tree(tronco_x, tronco_y, tronco_z, brush_x, brush_y, brush_z) {
  var tree = new THREE.Group();

  var log = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x421b01 })
  );
  log.castShadow = true;
  log.position.set(tronco_x, tronco_y, tronco_z);
  tree.add(log);

  var green = new THREE.Mesh(
    new THREE.BoxGeometry(brush_x, brush_y, brush_z),
    new THREE.MeshStandardMaterial({ color: 0x5b7327 })
  );

  green.castShadow = true;
  green.position.set(tronco_x - 0.05, tronco_y + 0.5, tronco_z - 0.05);
  tree.add(green);
  var boundingBox = new THREE.Box3().setFromObject(tree);
  tree.boundingBox = boundingBox;

  return tree;
}
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

function Flower(x, y, z) {
  var flower = new THREE.Group();

  var bottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.6, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x2a4f19 })
  );
  bottom.castShadow = true;

  bottom.position.set(x, y, z);
  flower.add(bottom);

  var top = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.16, 0),
    new THREE.MeshStandardMaterial({ color: 0xc957a7 })
  );
  top.position.set(x, y + 0.2, z);
  top.castShadow = true;
  flower.add(top);

  return flower;
}

function Oak(x, y, z, dim) {
  var texture = new THREE.TextureLoader().load("./Images/wood.jpg");

  var oak = new THREE.Mesh(
    new THREE.BoxGeometry(dim, 0.1, 1),
    new THREE.MeshStandardMaterial({ map: texture })
  );

  oak.position.set(x, y, z);

  return oak;
}

function Rodas() {
  var geometry = new THREE.CylinderGeometry(9, 9, 31);
  var material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  var roda = new THREE.Mesh(geometry, material);

  roda.rotation.x = Math.PI / 2;
  roda.castShadow = true;
  return roda;
}

function Carro() {
  var carro = new THREE.Group();

  var rodastraseiras = Rodas();
  rodastraseiras.position.y = 6;
  rodastraseiras.position.x = -18;
  carro.add(rodastraseiras);

  var rodasfrente = Rodas();
  rodasfrente.position.y = 6;
  rodasfrente.position.x = 18;
  carro.add(rodasfrente);

  var chasi = new THREE.Mesh(
    new THREE.BoxGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  chasi.position.y = 12;
  chasi.castShadow = true;
  carro.add(chasi);

  var cockpit = new THREE.Mesh(
    new THREE.BoxGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cockpit.position.x = -6;
  cockpit.position.y = 25.5;
  carro.add(cockpit);

  var boundingBox = new THREE.Box3().setFromObject(carro);
  carro.boundingBox = boundingBox;

  var farolFrontalEsquerdo = new THREE.SpotLight(0xffffff, 1); // Cor branca
  farolFrontalEsquerdo.position.set(27, 5, -2); // Posição relativa ao carro
  farolFrontalEsquerdo.target.position.set(100, 0, 0); // Alvo para a luz (apontando para a frente)
  farolFrontalEsquerdo.angle = Math.PI / 3; // Ângulo de abertura do farol
  farolFrontalEsquerdo.penumbra = 0.2; // Suavidade das bordas do feixe de luz
  farolFrontalEsquerdo.distance = 150; // Alcance do farol

  var farolFrontalDireito = new THREE.SpotLight(0xffffff, 1); // Cor branca
  farolFrontalDireito.position.set(27, 5, -20); // Posição relativa ao carro
  farolFrontalDireito.target.position.set(100, 0, 0); // Alvo para a luz (apontando para a frente)
  farolFrontalDireito.angle = Math.PI / 3; // Ângulo de abertura do farol
  farolFrontalDireito.penumbra = 0.2; // Suavidade das bordas do feixe de luz
  farolFrontalDireito.distance = 150; // Alcance do farol

  carro.add(farolFrontalEsquerdo);
  carro.add(farolFrontalEsquerdo.target);
  carro.add(farolFrontalDireito);
  carro.add(farolFrontalDireito.target);

  // Farol traseiro vermelho
  var farolTraseiro = new THREE.SpotLight(0xff0000, 0.1); // Cor vermelha
  farolTraseiro.position.set(-30, 0, -5); // Posição relativa ao carro
  farolTraseiro.target.position.set(-100, 0, 0); // Alvo para a luz (apontando para a frente)

  carro.add(farolTraseiro);
  carro.add(farolTraseiro.target);

  return carro;
}

function Truck(color1, color2) {
  var truck = new THREE.Group();

  var rodastraseiras = Rodas();
  rodastraseiras.position.y = 5;
  rodastraseiras.position.x = -7;
  truck.add(rodastraseiras);

  var rodastraseiras1 = Rodas();
  rodastraseiras1.position.y = 10;
  rodastraseiras1.position.x = -130;
  rodastraseiras1.position.z = 7;

  truck.add(rodastraseiras1);

  var rodasfrente1 = Rodas();
  rodasfrente1.position.y = 10;
  rodasfrente1.position.x = -50;
  rodasfrente1.position.z = 7;
  truck.add(rodasfrente1);

  var cabine = new THREE.Mesh(
    new THREE.BoxGeometry(40, 50, 40),
    new THREE.MeshLambertMaterial({ color: color1 })
  );
  cabine.position.y = 35;
  cabine.position.x = -8;
  cabine.position.z = -7;

  truck.add(cabine);

  var cabine1 = new THREE.Mesh(
    new THREE.BoxGeometry(20, 15, 45),
    new THREE.MeshLambertMaterial({ color: 0x4f4e4e })
  );
  cabine1.position.y = 40;
  cabine1.position.x = 4;
  cabine1.position.z = -8;
  truck.add(cabine1);

  var galera = new THREE.Mesh(
    new THREE.BoxGeometry(120, 70, 50),
    new THREE.MeshLambertMaterial({ color: color2 })
  );
  galera.position.x = -90;
  galera.position.y = 45;
  galera.position.z = -5;

  truck.add(galera);

  var farolFrontalEsquerdo = new THREE.SpotLight(0xffffff, 1); // Cor branca
  farolFrontalEsquerdo.position.set(27, 5, -2); // Posição relativa ao carro
  farolFrontalEsquerdo.target.position.set(100, 0, 0); // Alvo para a luz (apontando para a frente)
  farolFrontalEsquerdo.angle = Math.PI / 3; // Ângulo de abertura do farol
  farolFrontalEsquerdo.penumbra = 0.2; // Suavidade das bordas do feixe de luz
  farolFrontalEsquerdo.distance = 150; // Alcance do farol

  var farolFrontalDireito = new THREE.SpotLight(0xffffff, 1); // Cor branca
  farolFrontalDireito.position.set(27, 5, -20); // Posição relativa ao carro
  farolFrontalDireito.target.position.set(100, 0, 0); // Alvo para a luz (apontando para a frente)
  farolFrontalDireito.angle = Math.PI / 3; // Ângulo de abertura do farol
  farolFrontalDireito.penumbra = 0.2; // Suavidade das bordas do feixe de luz
  farolFrontalDireito.distance = 150; // Alcance do farol

  truck.add(farolFrontalEsquerdo);
  truck.add(farolFrontalEsquerdo.target);
  truck.add(farolFrontalDireito);
  truck.add(farolFrontalDireito.target);

  // Farol traseiro vermelho
  var farolTraseiro = new THREE.SpotLight(0xff0000, 0.1); // Cor vermelha
  farolTraseiro.position.set(-30, 0, -5); // Posição relativa ao carro
  farolTraseiro.target.position.set(-100, 0, 0); // Alvo para a luz (apontando para a frente)
  truck.add(farolTraseiro);
  truck.add(farolTraseiro.target);

  var boundingBox = new THREE.Box3().setFromObject(truck);
  truck.boundingBox = boundingBox;

  return truck;
}

// Centro de rotação da galinha errado tentar corrigir
function Galinha() {
  var galinha = new THREE.Group();

  var corpo = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );

  corpo.position.z = 10;
  corpo.castShadow = true;
  galinha.add(corpo);

  var crista = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 4),
    new THREE.MeshPhongMaterial({ color: 0xff6949, flatShading: true })
  );

  crista.position.z = 10;
  crista.position.y = 6;
  crista.position.x = 0;
  crista.castShadow = true;
  galinha.add(crista);

  var olhod = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhod.position.z = 15;
  olhod.position.y = 2;
  olhod.position.x = 2;
  galinha.add(olhod);

  var olhoe = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhoe.position.z = 15;
  olhoe.position.y = 2;
  olhoe.position.x = -2;
  galinha.add(olhoe);

  var bico = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 2),
    new THREE.MeshPhongMaterial({ color: 0xff7800, flatShading: true })
  );

  bico.position.z = 15;
  bico.position.y = 0;
  bico.position.x = 0;
  galinha.add(bico);

  var boundingBox = new THREE.Box3().setFromObject(galinha);
  galinha.boundingBox = boundingBox;

  return galinha;
}

function renderizarMuro() {
  var muroMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

  // Muro esquerdo
  var muroEsquerdo = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 66),
    muroMaterial
  );
  var boundingBox = new THREE.Box3().setFromObject(muroEsquerdo);
  muroEsquerdo.boundingBox = boundingBox;
  muroEsquerdo.position.set(16, 0, 5);

  return muroEsquerdo;
}

function renderizarMuroDireito() {
  var muroMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

  // Muro esquerdo
  var muroEsquerdo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 66),
    muroMaterial
  );
  var boundingBox = new THREE.Box3().setFromObject(muroEsquerdo);
  muroEsquerdo.boundingBox = boundingBox;
  muroEsquerdo.position.set(-16, 0, 5);

  return muroEsquerdo;
}

function renderizarMuroCima() {
  var muroMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

  // Muro esquerdo
  var muroEsquerdo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 62),
    muroMaterial
  );
  var boundingBox = new THREE.Box3().setFromObject(muroEsquerdo);
  muroEsquerdo.boundingBox = boundingBox;
  muroEsquerdo.position.set(0, 0, -25);
  muroEsquerdo.rotation.y = Math.PI / 2;

  return muroEsquerdo;
}

function renderizarMuroBaixo() {
  var muroMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

  // Muro esquerdo
  var muroEsquerdo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 62),
    muroMaterial
  );
  var boundingBox = new THREE.Box3().setFromObject(muroEsquerdo);
  muroEsquerdo.boundingBox = boundingBox;
  muroEsquerdo.position.set(0, 0, 39);
  muroEsquerdo.rotation.y = Math.PI / 2;

  return muroEsquerdo;
}

function renderCameras() {
  // Renderizar a cena com a câmera ativa
  var maxX = 3;
  var minY = -3;

  var toggleButton = document.getElementById("toggleButton");

  if (isCamera1Active) {
    if (minY <= galinha.position.x && galinha.position.x <= maxX) {
      // A câmera segue a galinha
      camera1.position.x = galinha.position.x + 10;
      camera1.position.y = galinha.position.y + 10;
      camera1.position.z = galinha.position.z + 10;
  
      lastPositionX = galinha.position.x; 
      lastPositionY = galinha.position.y;
      lastPositionZ = galinha.position.z;
      camera1.lookAt(galinha.position);

    } else {
      // A câmera fica presa na última posição antes de ultrapassar maxX
      camera1.position.x = lastPositionX + 10;
      camera1.position.y = galinha.position.y + 10;
      camera1.position.z = galinha.position.z + 10;
      camera1.lookAt(lastPositionX, lastPositionY, camera1.position.z -10);
    }
  
    renderer.render(cena, camera1);

    toggleButton.addEventListener("click", function () {
      isCamera1Active = false;
      isCamera2Active = true;
      isCamera3Active = false;
    });
  } else if (isCamera2Active) {
    camera1.position.x = galinha.position.x + 7;
    camera1.position.y = galinha.position.y + 7;
    camera1.position.z = galinha.position.z + 7;

    camera2.position.x = galinha.position.x + 0;
    camera2.position.y = galinha.position.y + 3;
    camera2.position.z = galinha.position.z + 6;
    camera2.lookAt(galinha.position);
    renderer.render(cena, camera2);

    toggleButton.addEventListener("click", function () {
      isCamera1Active = false;
      isCamera2Active = false;
      isCamera3Active = true;
    });
  } else if (isCamera3Active) {
    camera3.position.x = galinha.position.x + 0;
    camera3.position.y = galinha.position.y + 20;
    camera3.position.z = galinha.position.z + 0;
    camera3.lookAt(galinha.position);
    renderer.render(cena, camera3);

    toggleButton.addEventListener("click", function () {
      isCamera1Active = true;
      isCamera2Active = false;
      isCamera3Active = false;
    });
  }
}

function Lamp() {
  var lamp = new THREE.Group();

  var bottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 4, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
  );

  bottom.castShadow = true;
  bottom.position.set(0, 0, 0);
  lamp.add(bottom);

  var top = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.1, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
  );

  var PointLight = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 0),
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  top.position.set(0.2, 2, 0);
  top.castShadow = true;
  PointLight.position.set(0.25, -0.1, 0);
  top.add(PointLight);
  lamp.add(top);

  // Adicionar foco de luz
  var spotLight = new THREE.SpotLight(0xfaf386, 1, 10, Math.PI / 3, 0.5);
  spotLight.position.set(0, 3, 0);
  spotLight.target.position.set(0, 0, 0);
  lamp.add(spotLight);
  lamp.add(spotLight.target);

  lamp.rotation.y = Math.PI / 2;
  return lamp;
}

var importer = new THREE.FBXLoader();

importer.load("./Javascript/objects/sketchfab.fbx", function (object) {
  cena.add(object);

  object.rotateY(Math.PI / 2);

  object.position.set(5, 1, 1.7);
  object.scale.set(0.5, 0.5, 0.5);
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera1, renderer.domElement);
controls.update();

document.body.appendChild(renderer.domElement);

var galinha = new Galinha();
cena.add(galinha);
galinha.scale.set(0.05, 0.05, 0.05);
galinha.position.set(0, 0.3, -5.0);

var velocidadeX = 1.5; // Exemplo de velocidade de movimento no eixo X
var velocidadeY = 1.5; // Exemplo de velocidade de movimento no eixo Y

var woods = [
  { x: -3, y: 0.05, z: -7, lenght: 2 },
  { x: 3, y: 0.05, z: -7, lenght: 2 },

  { x: -3, y: 0.05, z: -26, lenght: 2 },
  { x: 2.5, y: 0.05, z: -26, lenght: 2 },
  { x: 5, y: 0.05, z: -26, lenght: 2 },

  { x: -3, y: 0.05, z: 18, lenght: 2 },
  { x: 2.5, y: 0.05, z: 18, lenght: 2 },
  { x: 5, y: 0.05, z: 18, lenght: 2 },
];
for (var i = 0; i < woods.length; i++) {
  var wood = new Oak(woods[i].x, woods[i].y, woods[i].z, woods[i].lenght);
  cena.add(wood);
}

var flowers = [
  { x: 2, y: 0.2, z: -2.5 },
  { x: 2, y: 0.2, z: -33 },
  { x: 4, y: 0.2, z: -27 },
  { x: 4, y: 0.2, z: -27.4 },
  { x: 6, y: 0.2, z: -24.5 },
  { x: 6, y: 0.2, z: -24.9 },
  { x: 8, y: 0.2, z: -18 },
  { x: 10, y: 0.2, z: -11.1 },
  { x: 10, y: 0.2, z: -11.8 },
  { x: 12, y: 0.2, z: -8 },
  { x: 12, y: 0.2, z: -8.3 },
  { x: 12, y: 0.2, z: -8.7 },
  { x: 14, y: 0.2, z: -6.2 },
  { x: 14, y: 0.2, z: -6.6 },
  { x: 16, y: 0.2, z: -2.5 },
  { x: 18, y: 0.2, z: 3.2 },
  { x: 20, y: 0.2, z: 3.5 },
  { x: 22, y: 0.2, z: 8 },
  { x: 22, y: 0.2, z: 8.8 },
  { x: 24, y: 0.2, z: 16.3 },
  { x: 24, y: 0.2, z: 16.7 },
  { x: 26, y: 0.2, z: 20.1 },
  { x: 26, y: 0.2, z: 20.4 },
  { x: 28, y: 0.2, z: 26.5 },
  { x: 30, y: 0.2, z: 29 },
  { x: 32, y: 0.2, z: 36.2 },
  { x: 32, y: 0.2, z: 36.5 },
  { x: 32, y: 0.2, z: 36.9 },
];
for (var i = 0; i < flowers.length; i++) {
  var flower = new Flower(flowers[i].x, flowers[i].y, flowers[i].z);
  cena.add(flower);
}

var arvores = [];

var objetos = [
  { x: -7, y: 0.3, z: -33, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 3, y: 0.3, z: -33, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -9, y: 0.3, z: -33, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: -33, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -12, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -4, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 1, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 4, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 8, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 16, y: 0.3, z: -27, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -2, y: 0.3, z: -24, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 4, y: 0.3, z: -24, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 7, y: 0.3, z: -24, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: -24, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -0, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 1, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -7, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 2, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 20, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 5, y: 0.3, z: -18, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -8, y: 0.3, z: -11, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 10, y: 0.3, z: -11, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -5, y: 0.3, z: -8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 8, y: 0.3, z: -8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 2, y: 0.3, z: -8, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 1, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 8, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 5, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -15, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -4, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: -6, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -11, y: 0.3, z: -2.5, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -7, y: 0.3, z: -2.5, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 7, y: 0.3, z: 3.5, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 5, y: 0.3, z: 3, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 20, y: 0.3, z: 3.5, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 12, y: 0.3, z: 3.5, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 9, y: 0.3, z: 3, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 4, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 7, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 6, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -9, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 10, y: 0.3, z: 8, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 2, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -5, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 8, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -11, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -9, y: 0.3, z: 16, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 8, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 3, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 2, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 3, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 6, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 1, y: 0.3, z: 20, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 5, y: 0.3, z: 26, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -15, y: 0.3, z: 26, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 11, y: 0.3, z: 26, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: 26, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 15, y: 0.3, z: 26, width: 0.6, height: 0.8, depth: 0.6 },

  { x: 20, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -2, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -6.5, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 7, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 9, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -6, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 6, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 8, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 6, y: 0.3, z: 29, width: 0.6, height: 0.8, depth: 0.6 },

  { x: -6, y: 0.3, z: 36, width: 0.6, height: 0.8, depth: 0.6 },
  { x: -1, y: 0.3, z: 36, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 5, y: 0.3, z: 36, width: 0.6, height: 0.8, depth: 0.6 },
  { x: 0, y: 0.3, z: 36, width: 0.6, height: 0.8, depth: 0.6 },
];

for (var i = 0; i < objetos.length; i++) {
  var obj = objetos[i];
  var arvore = new Tree(obj.x, obj.y, obj.z, obj.width, obj.height, obj.depth);
  arvores.push(arvore);
  cena.add(arvore);
}

// Definir as posições das lâmpadas
var lampPositions = [
  { x: 10, y: 0, z: -3 },
  { x: 0, y: 0, z: -3 },
  { x: -10, y: 0, z: -3 },

  { x: 10, y: 0, z: 3 },
  { x: 0, y: 0, z: 3 },
  { x: -10, y: 0, z: 3 },

  { x: 13, y: 0, z: 8 },
  { x: 3, y: 0, z: 8 },
  { x: -13, y: 0, z: 8 },

  { x: 13, y: 0, z: 16 },
  { x: 3, y: 0, z: 16 },
  { x: -13, y: 0, z: 16 },
];

// Criar e adicionar as lâmpadas à cena
lampPositions.forEach(function (position) {
  var lamp = new Lamp();
  lamp.position.set(position.x, position.y, position.z);
  cena.add(lamp);
});

var muro = new renderizarMuro();
var muro_dir = new renderizarMuroDireito();
var muro_cima = new renderizarMuroCima();
var muro_baixo = new renderizarMuroBaixo();

cena.add(muro);
cena.add(muro_dir);
cena.add(muro_baixo);
cena.add(muro_cima);

//Definições iniciais Carro
var carro = new Carro(0x78b14b);
carro.scale.set(0.03, 0.03, 0.03);
carro.position.set(-30, 0.15, -0.2);
cena.add(carro);

var carro1 = new Carro(0x063970);
carro1.scale.set(0.03, 0.03, 0.03);
carro1.position.set(-30, 0.15, 1.4);
cena.add(carro1);

var truck = new Truck(0xd45b45);
truck.scale.set(-0.03, 0.03, 0.03);
truck.position.set(0, 0.15, -4.5);
cena.add(truck);

function detectCollision(obj1, obj2) {
  var box1 = obj1.boundingBox.clone().applyMatrix4(obj1.matrixWorld);
  var box2 = obj2.boundingBox.clone().applyMatrix4(obj2.matrixWorld);

  return box1.intersectsBox(box2);
}

function checkCollisions() {
  for (var i = 0; i < arvores.length; i++) {
    var arvore = arvores[i];
    if (
      detectCollision(galinha, arvore) ||
      detectCollision(galinha, muro) ||
      detectCollision(galinha, muro_dir) ||
      detectCollision(galinha, muro_baixo) ||
      detectCollision(galinha, muro_cima)
    ) {
      // Colisão detectada entre a galinha e a árvore
      console.log("Colisão detectada!");
      // Faça aqui o que deseja fazer em caso de colisão
    }
    if (detectCollision(galinha, carro)) {
      console.log("Colisao so com o carro!");
      var retryButton = document.getElementById("retryButton");
      var endGameElement = document.getElementById("endGame");

      endGameElement.style.visibility = "visible";

      retryButton.addEventListener("click", function () {
        // Recarregar a página
        contador = 0;
        location.href = location.href;
      });
    }
  }
}

function Start() {
  GenerateMap();

  cena.add(galinha);

  var xSpeed = 0.5;
  var zSpeed = 0.5;
  var isJumping = false;
  var jumpHeight = 1;
  var groundHeight = 0.3; // Ajustar a altura do chão conforme necessário

  //temos que mudar a rotação o centro de rotação da galinha não é o centro da galinha
  document.addEventListener("keydown", onDocumentKeyDown, false);

  var galinhaX = galinha.position.x;
  var galinhaZ = galinha.position.z;

  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    var novaPosicaoX = galinha.position.x;
    var novaPosicaoZ = galinha.position.z;

    if (keyCode == 87) {
      if (!isJumping) {
        isJumping = true;
        jump();

        novaPosicaoZ -= zSpeed;
        galinha.rotation.y = Math.PI;

        contador++;
        var contagemElemento = document.getElementById("contagem");
        contagemElemento.textContent = contador / 2;
      }
    } else if (keyCode == 83) {
      if (!isJumping) {
        isJumping = true;
        jump();

        novaPosicaoZ += zSpeed;
        galinha.rotation.y = 2 * Math.PI;
      }
    } else if (keyCode == 65) {
      if (!isJumping) {
        isJumping = true;
        jump();

        galinha.rotation.y = -Math.PI / 2;

        novaPosicaoX -= xSpeed;
      }
    } else if (keyCode == 68) {
      if (!isJumping) {
        isJumping = true;
        jump();
        galinha.rotation.y = Math.PI / 2;
        novaPosicaoX += xSpeed;
      }
    } else if (keyCode == 32) {
      // Tecla de salto (espaço)
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }

    var colisaoDetectada = false;
    var colisaoMuro = false;
    var colisaoCarro = false;

    // Verifique colisões antes de atualizar a posição
    for (var i = 0; i < arvores.length; i++) {
      var arvore = arvores[i];
      if (
        detectCollision(galinha, arvore) ||
        detectCollision(galinha, muro) ||
        detectCollision(galinha, muro_baixo) ||
        detectCollision(galinha, muro_cima) ||
        detectCollision(galinha, muro_dir)
      ) {
        colisaoDetectada = true;
        colisaoMuro = true;

        break;
      }
      if (detectCollision(galinha, carro)) {
        console.log("Colisao so com o carro!");
        colisaoCarro = true;

        break;
      }
    }

    if (!colisaoMuro && !colisaoDetectada && !colisaoCarro) {
      // Atualize a posição da galinha com as novas posições se não houver colisão
      galinha.position.x = novaPosicaoX;
      galinha.position.z = novaPosicaoZ;

      // Atualize as variáveis de posição
      galinhaX = novaPosicaoX;
      galinhaZ = novaPosicaoZ;
    } else {
      // Restaure as posições para a posição original antes do movimento
      galinha.position.x = galinhaX;
      galinha.position.z = galinhaZ;
    }
  }

  function jump() {
    var initialPositionY = galinha.position.y; // Posição inicial em Y da galinha
    var jumpTime = 0.5; // Tempo total para completar o salto
    var jumpSpeed = jumpHeight / jumpTime; // Velocidade de salto

    var startTime = Date.now(); // Tempo de início do salto

    function updateJump() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Tempo decorrido desde o início do salto
      if (elapsedTime <= jumpTime) {
        var jumpDistance = jumpSpeed * elapsedTime; // Distância de salto alcançada até o momento

        // Atualiza a posição vertical da galinha
        galinha.position.y =
          initialPositionY +
          jumpDistance -
          0.5 * 9.8 * elapsedTime * elapsedTime;

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

  function animatecar() {
    var velocidadeX = 0.2;
    var limiteX = 30;
    var limiteXInverso = -30;
    var posicaoInicialX = -30;
    var posicaoInicialXInverso = 30;

    carro.position.x += velocidadeX; //velocidade 
    carro1.position.x += 0.4;
    truck.position.x -= 0.1;

    // Verifica se o carro ultrapassou o limite do mapa
    if (carro.position.x >= limiteX
      && carro1.position.x >= limiteX 
      && truck.position.x <= limiteXInverso) {
      carro.position.x = posicaoInicialX;
      carro1.position.x = posicaoInicialX;
      truck.position.x = posicaoInicialXInverso; //posição inicial
    }

    requestAnimationFrame(animatecar);
  }

  //de modo a começar só passado os segundos que quisermos
  setTimeout(function () {
    animatecar();
  }, 5000);

  cena.add(new THREE.AmbientLight(0x333333, 0.2));
  luz = new THREE.DirectionalLight(0x6699ff, 0.25);
  luz.position.set(-20, 25, 0);
  luz.castShadow = true;
  luz.shadow.mapSize.width = 1024; // Resolução horizontal da sombra
  luz.shadow.mapSize.height = 1024; // Resolução vertical da sombra
  luz.shadow.camera.near = 0.5; // Distância mínima da câmera para a luz
  luz.shadow.camera.far = 200; // Distância máxima da câmera para a luz
  luz.rotation.y = Math.PI / 2;

  var shadowCamera = new THREE.OrthographicCamera(
    -100,
    100,
    100,
    -100,
    0.1,
    200
  ); // Ajuste os limites da câmera de sombra conforme necessário
  luz.shadow.camera = shadowCamera;

  cena.add(luz);

  // cria o helper da luz
  var helper = new THREE.DirectionalLightHelper(luz, 5);
  cena.add(helper);

  // Chamar a função loop()
  requestAnimationFrame(loop);
}

function loop() {
  renderCameras();

  luz.position.copy(galinha.position);
  requestAnimationFrame(loop);
  luz.position.y = 50;
  luz.position.x = -40;

  checkCollisions();
}
