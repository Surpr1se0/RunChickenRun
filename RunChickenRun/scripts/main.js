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
  var boundingBox = new THREE.Box3().setFromObject(tree);
  tree.boundingBox = boundingBox;

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
  var geometry = new THREE.CylinderGeometry(9, 9, 5);
  var material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  var roda = new THREE.Mesh(geometry, material);
  roda.rotation.x = Math.PI / 2;
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
  var boundingBox = new THREE.Box3().setFromObject(galinha);
  galinha.boundingBox = boundingBox;

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

function calcularBoundingBoxGalinha() {
  var tamanhoX = 10 * galinha.scale.x; // Tamanho da galinha no eixo X
  var tamanhoY = 10 * galinha.scale.y; // Tamanho da galinha no eixo Y
  var tamanhoZ = 10 * galinha.scale.z; // Tamanho da galinha no eixo Z

  var minX = galinha.position.x - tamanhoX / 2; // Valor mínimo de x
  var maxX = galinha.position.x + tamanhoX / 2; // Valor máximo de x
  var minY = galinha.position.y - tamanhoY / 2; // Valor mínimo de y
  var maxY = galinha.position.y + tamanhoY / 2; // Valor máximo de y
  var minZ = galinha.position.z - tamanhoZ / 2; // Valor mínimo de z
  var maxZ = galinha.position.z + tamanhoZ / 2; // Valor máximo de z

  return {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
    minZ: minZ,
    maxZ: maxZ,
  };
}

function calcularBoundingBoxArvore(
  tronco_x,
  tronco_y,
  tronco_z,
  brush_x,
  brush_y,
  brush_z
) {
  var minX = tronco_x - 0.15; // Valor mínimo de x (considerando o tronco)
  var maxX = tronco_x + 0.15; // Valor máximo de x (considerando o tronco)
  var minY = tronco_y; // Valor mínimo de y (considerando a posição do tronco)
  var maxY = tronco_y + 0.8; // Valor máximo de y (considerando a altura do tronco)
  var minZ = tronco_z - 0.15; // Valor mínimo de z (considerando o tronco)
  var maxZ = tronco_z + 0.15; // Valor máximo de z (considerando o tronco)

  // Verificar se as dimensões da folhagem são maiores que o tronco
  if (brush_x > 0) {
    minX = Math.min(minX, tronco_x - brush_x / 2);
    maxX = Math.max(maxX, tronco_x + brush_x / 2);
  }
  if (brush_y > 0) {
    maxY = Math.max(maxY, tronco_y + brush_y);
  }
  if (brush_z > 0) {
    minZ = Math.min(minZ, tronco_z - brush_z / 2);
    maxZ = Math.max(maxZ, tronco_z + brush_z / 2);
  }

  return {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
    minZ: minZ,
    maxZ: maxZ,
  };
}

function verificarColisoes() {
  var arvore1 = new Tree(-2, 0.3, -2.5, 0.6, 0.8, 0.6);
  var arvores = [];
  arvores.push(arvore1);

  // Percorrer todas as árvores
  for (var i = 0; i < arvores.length; i++) {
    var arvore = arvores[i]; // Grupo de objetos da árvore

    // Percorrer todas as partes da galinha
    galinha.traverse(function (parteGalinha) {
      if (parteGalinha instanceof THREE.Mesh) {
        var parteGalinhaBoundingBox = parteGalinha.geometry.boundingBox.clone(); // Caixa delimitadora da parte da galinha

        // Percorrer todas as partes da árvore
        arvore.traverse(function (parteArvore) {
          if (parteArvore instanceof THREE.Mesh) {
            var parteArvoreBoundingBox =
              parteArvore.geometry.boundingBox.clone(); // Caixa delimitadora da parte da árvore

            // Verificar se há colisão entre a parte da galinha e a parte da árvore
            if (parteGalinhaBoundingBox.intersectsBox(parteArvoreBoundingBox)) {
              // Colisão detectada!
              console.log(
                "Colisão entre a parte da galinha e a parte da árvore ",
                i
              );
              // Aqui você pode realizar alguma ação, como interromper o movimento da galinha ou executar algum código específico para tratar a colisão.
            }
          }
        });
      }
    });
  }
}

function Start() {
  GenerateMap();



  //Definições iniciais Carro
  var carro = new Carro();
  carro.scale.set(0.03, 0.03, 0.03);
  carro.translateY(0.15);
  carro.translateZ(-0.2);

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
      galinha.rotation.y = 2 * Math.PI;
    } else if (keyCode == 65) {
      galinha.position.x -= xSpeed;
      galinha.rotation.y = -Math.PI / 2;
    } else if (keyCode == 68) {
      galinha.position.x += xSpeed;
      galinha.rotation.y = Math.PI / 2;
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
  verificarColisoes();

  renderCameras();

  requestAnimationFrame(loop);
}
