document.addEventListener("DOMContentLoaded", Start);

var cena = new THREE.Scene();
//var camara = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);

var camaraPerspetiva = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camaraPerspetiva.position.set(0, 20, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 15, window.innerHeight - 80);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camaraPerspetiva, renderer.domElement);
controls.update();

document.body.appendChild(renderer.domElement);


/////////////////////////////////////////////////////////////////////////////////////
function AddEstrada() {
  var relvaGeometria = new THREE.BoxGeometry(7, 0.1, 4);
  var relvaTextura = new THREE.MeshStandardMaterial({ color: 0xccff5e });
  var relva = new THREE.Mesh(relvaGeometria, relvaTextura);
  relva.position.set(0, 0, -3);

  cena.add(relva);

  //----------------------------------------------------

  var geometriaEstrada = new THREE.BoxGeometry(1.5, 0.1, 7);
  var estradaTextura = new THREE.MeshStandardMaterial({ color: 0x4b5161 });
  var estrada = new THREE.Mesh(geometriaEstrada, estradaTextura);
  estrada.position.set(0, 0.001, -3);
  estrada.rotateY(Math.PI / 2);

  cena.add(estrada);

  //------------------------------------------------
  AddRoadStripes(5, 1.5);
  //-----------------------------------------
  AddPasseio(0, 0.04, -2.3);
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

function AddRoadStripes(numberOfStripes, distanceBetweenStripes) {
  for (var i = 0; i < numberOfStripes; i++) {
    var geometriaEstradaLinhas = new THREE.BoxGeometry(0.15, 0.1, 1);
    var materialTextura2 = new THREE.MeshStandardMaterial({ color: 0xf7bd00 });
    var meshCubo2 = new THREE.Mesh(geometriaEstradaLinhas, materialTextura2);
    meshCubo2.position.set(
      distanceBetweenStripes * i - 2 * distanceBetweenStripes,
      0.002,
      -3
    );
    meshCubo2.rotateY(Math.PI / 2);
    cena.add(meshCubo2);
  }
}

// -2       // 0.2      //-1.6      //-2   // 0.9  //-1.6
function Addtrees(tronco_x, tronco_y, tronco_z, copa_x, copa_y, copa_z) {
  var tronco = new THREE.BoxGeometry(0.3, 0.8, 0.3);

  var troncoTextura = new THREE.MeshStandardMaterial({ color: 0x421b01 });

  var tree = new THREE.Mesh(tronco, troncoTextura);
  tree.position.set(tronco_x, tronco_y, tronco_z);

  cena.add(tree);

  var copa = new THREE.BoxGeometry(0.5, 0.7, 0.6);

  var copaTextura = new THREE.MeshStandardMaterial({ color: 0x5b7327 });

  var tree2 = new THREE.Mesh(copa, copaTextura);
  tree2.position.set(copa_x, copa_y, copa_z);

  cena.add(tree2);
}

// -2       // 0.2      //-1.6
function AddFlowers(x, y, z) {
  var caule = new THREE.BoxGeometry(0.05, 0.6, 0.05);

  var cauleTextura = new THREE.MeshStandardMaterial({ color: 0x2a4f19 });

  var caule = new THREE.Mesh(caule, cauleTextura);
  caule.position.set(x, y, z);

  cena.add(caule);

  //////////////
  var pink = new THREE.IcosahedronGeometry(0.16, 0);

  var pinkTexture = new THREE.MeshStandardMaterial({ color: 0xc957a7 });

  var flower = new THREE.Mesh(pink, pinkTexture);
  flower.position.set(x, y + 0.2, z);

  cena.add(flower);
}

////////////// TESTE //////////////
function GenerateLanes(num_lanes, lane_width, x, y, z) {
  // Adicionar relva no início
  AddRelva(x, y, z - lane_width);

  for (var i = 0; i < num_lanes; i++) {
    var geometriaEstrada = new THREE.BoxGeometry(7, 0.1, lane_width);
    var estradaTextura = new THREE.MeshStandardMaterial({ color: 0x4b5161 });
    var estrada = new THREE.Mesh(geometriaEstrada, estradaTextura);
    estrada.position.set(x, y + 0.001, z + i * lane_width);
    cena.add(estrada);

    AddRoadStripesChanged(5, 1.5, x, z + i * lane_width);
  }

  // Adicionar relva no final
  AddRelva(x, y, z + num_lanes * lane_width);
}

function AddRelva(x, y, z) {
  var relvaGeometria = new THREE.BoxGeometry(7, 0.02, 4);
  var relvaTextura = new THREE.MeshStandardMaterial({ color: 0xccff5e });
  var relva = new THREE.Mesh(relvaGeometria, relvaTextura);
  relva.position.set(x, y + 0.001, z);

  cena.add(relva);
}

function AddRoadStripesChanged(numberOfStripes, distanceBetweenStripes, x, z) {
  for (var i = 0; i < numberOfStripes; i++) {
    var geometriaEstradaLinhas = new THREE.BoxGeometry(0.15, 0.1, 1);
    var materialTextura2 = new THREE.MeshStandardMaterial({ color: 0xf7bd00 });
    var meshCubo2 = new THREE.Mesh(geometriaEstradaLinhas, materialTextura2);
    meshCubo2.position.set(
      x + distanceBetweenStripes * i - 2 * distanceBetweenStripes,
      0.002,
      z
    );
    meshCubo2.rotateY(Math.PI / 2);
    cena.add(meshCubo2);
  }
}

function Road(
  num_lanes,
  lane_width,
  x,
  y,
  z,
  num_stripes,
  distance_between_stripes
) {
  var road = new THREE.Group();

  // Criar patch de relva inicial
  var grass_inicial = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.02, 2),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_inicial.position.set(x, y + 0.001, z - lane_width);
  road.add(grass_inicial);

  // Criar estrada
  for (var i = 0; i < num_lanes; i++) {
    var asfalt = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.1, lane_width),
      new THREE.MeshStandardMaterial({ color: 0x4b5161 })
    );

    asfalt.position.set(x, y + 0.001, z + i * lane_width);
    road.add(asfalt);

    // Criar Linhas da Estrada
    for (var j = 0; j < num_stripes; j++) {
      var lines = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.1, 1),
        new THREE.MeshStandardMaterial({ color: 0xf7bd00 })
      );

      lines.position.set(
        x + distance_between_stripes * j - 2 * distance_between_stripes,
        0.002,
        z + i * lane_width
      );

      lines.rotateY(Math.PI / 2);
      road.add(lines);
    }
  }

  var grass_final = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.02, 2),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_final.position.set(x, y + 0.001, z + num_lanes * lane_width);
  road.add(grass_final);

  return road;
}

var galinhaSize = 2; //evitar mexer nisto que ainda não está a 100%

function Galinha() {
  var galinha = new THREE.Group();

  var corpo = new THREE.Mesh(
    new THREE.BoxGeometry(galinhaSize * 5, galinhaSize * 5, galinhaSize * 5),
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );

  corpo.position.z = 10;
  corpo.castShadow = true;
  corpo.receiveShadow = true;
  galinha.add(corpo);

  var crista = new THREE.Mesh(
    new THREE.BoxGeometry(galinhaSize * 1, galinhaSize * 1, galinhaSize * 2),
    new THREE.MeshPhongMaterial({ color: 0xff6949, flatShading: true })
  );

  crista.position.z = 10;
  crista.position.y = 6;
  crista.position.x = 0;
  crista.castShadow = true;
  crista.receiveShadow = true;
  galinha.add(crista);

  var olhod = new THREE.Mesh(
    new THREE.BoxGeometry(
      galinhaSize * 0.5,
      galinhaSize * 0.5,
      galinhaSize * 0.5
    ),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhod.position.z = 15;
  olhod.position.y = 2;
  olhod.position.x = 2;
  olhod.castShadow = true;
  olhod.receiveShadow = true;
  galinha.add(olhod);

  var olhoe = new THREE.Mesh(
    new THREE.BoxGeometry(
      galinhaSize * 0.5,
      galinhaSize * 0.5,
      galinhaSize * 0.5
    ),
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
  );

  olhoe.position.z = 15;
  olhoe.position.y = 2;
  olhoe.position.x = -2;
  olhoe.castShadow = true;
  olhoe.receiveShadow = true;
  galinha.add(olhoe);

  var bico = new THREE.Mesh(
    new THREE.BoxGeometry(
      galinhaSize * 0.5,
      galinhaSize * 0.5,
      galinhaSize * 1
    ),
    new THREE.MeshPhongMaterial({ color: 0xff7800, flatShading: true })
  );

  bico.position.z = 15;
  bico.position.y = 0;
  bico.position.x = 0;
  bico.castShadow = true;
  bico.receiveShadow = true;
  galinha.add(bico);

  // bordas na corpo da galinha
  var geo = new THREE.EdgesGeometry(corpo.geometry);
  var mat = new THREE.LineBasicMaterial({ color: 0x9c9c9c, flatShading: true });
  var bordas = new THREE.LineSegments(geo, mat);
  corpo.add(bordas);

  return galinha;
}

const grass = AddEstrada();
const trees_1 = Addtrees(-2, 0.2, -1.6, -2, 0.9, -1.6);
const trees_2 = Addtrees(3, 0.2, -4, 3, 0.9, -4);
const flower = AddFlowers(2, 0.2, -1.6);

function Start() {
  var road_teste = new Road(2, 1.5, 0, 0, 5, 5, 1.5);
  cena.add(road_teste);

  var galinha = new Galinha();
  galinha.scale.set(0.1, 0.1, 0.1);
  cena.add(galinha);
  galinha.translateZ(-14.0);

  var xSpeed = 1;
  var ySpeed = 1;
  var jump_can = 1;

  //movimento apenas por coordenadas, falta animar salto.
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
      galinha.position.y += ySpeed;
    } else if (keyCode == 83) {
      galinha.position.y -= ySpeed;
    } else if (keyCode == 65) {
      galinha.position.x -= xSpeed;
    } else if (keyCode == 68) {
      galinha.position.x += xSpeed;
    } else if (keyCode == 32) {
      galinha.position.set(0, 0, 0);
    }
  }

  cena.add(camaraPerspetiva);
  //cena.add(cubo);
  cena.add(grass);
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

  // Chamar a função de renderização
  renderer.render(cena, camaraPerspetiva);

  // Chamar a função loop()
  requestAnimationFrame(loop);
}

function loop() {
  renderer.render(cena, camaraPerspetiva);

  controls.update();

  requestAnimationFrame(loop);
}
