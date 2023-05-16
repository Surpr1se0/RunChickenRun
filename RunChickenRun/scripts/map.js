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
    new THREE.BoxGeometry(7, 0.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_inicial.position.set(x, y + 0.001, z - lane_width + 0.2);
  road.add(grass_inicial);

  // Criar passeio inicial
  var walk_start = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 7),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
  );

  walk_start.position.set(x, y + 0.13, z - lane_width + 0.75);
  walk_start.rotateY(Math.PI / 2);
  road.add(walk_start);

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
    new THREE.BoxGeometry(7, 0.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_final.position.set(x, y + 0.001, z + num_lanes * lane_width - 0.2);
  road.add(grass_final);

  // Criar passeio inicial
  var walk_final = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 7),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
  );

  walk_final.position.set(x, y + 0.13, z + num_lanes * lane_width - 0.7);
  walk_final.rotateY(Math.PI / 2);
  road.add(walk_final);

  return road;
}

function Lake(
  num_lanes, //retirar
  lane_width,
  x,
  y,
  z,
  num_stripes,
  distance_between_stripes
) {
  var lake = new THREE.Group();

  // Criar patch de relva inicial
  var grass_inicial = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_inicial.position.set(x, y + 0.001, z - lane_width + 0.2);
  lake.add(grass_inicial);

  // Criar estrada
  for (var i = 0; i < num_lanes; i++) {
    var texture = new THREE.TextureLoader().load("./Images/water.jpg");

    var water = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.1, lane_width),
      new THREE.MeshStandardMaterial({ map: texture })
    );

    water.position.set(x, y + 0.001, z + i * lane_width);
    lake.add(water);
  }

  var grass_final = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xccff5e })
  );

  grass_final.position.set(x, y + 0.001, z + num_lanes * lane_width - 0.2);
  lake.add(grass_final);

  return lake;
}

function GenerateMap() {
  var roads = [
    { lanes: 4, width: 1.5, x: -27, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: -21, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: -18, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: -12, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: -6, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 0, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 6, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 12, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 18, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 21, y: 0, z: 30 },
    { lanes: 4, width: 1.5, x: 27, y: 0, z: 30 },

    { lanes: 1, width: 1.5, x: -27, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: -21, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: -18, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: -12, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: -6, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 0, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 6, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 12, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 18, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 21, y: 0, z: 27 },
    { lanes: 1, width: 1.5, x: 27, y: 0, z: 27 },

    // Primeira estrada
    { lanes: 2, width: 1.5, x: -27, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: -21, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: -18, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: -12, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: -6, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 0, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 6, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 12, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 18, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 21, y: 0, z: 5 },
    { lanes: 2, width: 1.5, x: 27, y: 0, z: 5 },

    { lanes: 3, width: 1.5, x: 27, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: 21, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: 18, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: 12, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: 0, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: 6, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: -6, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: -12, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: -18, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: -21, y: 0, z: -1 },
    { lanes: 3, width: 1.5, x: -27, y: 0, z: -1 },

    { lanes: 1, width: 1.5, x: -27, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: -21, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: -18, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: -12, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: -6, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 0, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 6, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 12, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 18, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 21, y: 0, z: -4.5 },
    { lanes: 1, width: 1.5, x: 27, y: 0, z: -4.5 },

    { lanes: 4, width: 1.5, x: -27, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: -21, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: -18, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: -12, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: -6, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 0, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 6, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 12, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 18, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 21, y: 0, z: 10 },
    { lanes: 4, width: 1.5, x: 27, y: 0, z: 10 },

    { lanes: 3, width: 1.5, x: 27, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: 21, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: 18, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: 12, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: 0, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: 6, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: -6, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: -12, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: -18, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: -21, y: 0, z: 21 },
    { lanes: 3, width: 1.5, x: -27, y: 0, z: 21 },

    { lanes: 1, width: 1.5, x: -27, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: -21, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: -18, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: -12, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: -6, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 0, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 6, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 12, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 18, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 21, y: 0, z: -10 },
    { lanes: 1, width: 1.5, x: 27, y: 0, z: -10 },

    { lanes: 4, width: 1.5, x: -27, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: -21, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: -18, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: -12, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: -6, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 0, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 6, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 12, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 18, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 21, y: 0, z: -17 },
    { lanes: 4, width: 1.5, x: 27, y: 0, z: -17 },

    { lanes: 3, width: 1.5, x: 27, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: 21, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: 18, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: 12, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: 0, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: 6, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: -6, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: -12, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: -18, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: -21, y: 0, z: -23 },
    { lanes: 3, width: 1.5, x: -27, y: 0, z: -23 },

    { lanes: 3, width: 1.5, x: 27, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: 21, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: 18, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: 12, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: 0, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: 6, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: -6, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: -12, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: -18, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: -21, y: 0, z: -32 },
    { lanes: 3, width: 1.5, x: -27, y: 0, z: -32 },

    { lanes: 1, width: 1.5, x: -27, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: -21, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: -18, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: -12, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: -6, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 0, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 6, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 12, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 18, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 21, y: 0, z: -35 },
    { lanes: 1, width: 1.5, x: 27, y: 0, z: -35 },
  ];

  for (var i = 0; i < roads.length; i++) {
    var road = new Road(
      roads[i].lanes,
      (roads[i].width = 1.5),
      roads[i].x,
      (roads[i].y = 0),
      roads[i].z,
      (roads[i].stripes = 5),
      (roads[i].stripeDistance = 1.5)
    );
    cena.add(road);
  }

  var lakes = [
    { x: -27, y: 0, z: -7 },
    { x: -21, y: 0, z: -7 },
    { x: -18, y: 0, z: -7 },
    { x: -12, y: 0, z: -7 },
    { x: -6, y: 0, z: -7 },
    { x: 0, y: 0, z: -7 },
    { x: 6, y: 0, z: -7 },
    { x: 12, y: 0, z: -7 },
    { x: 18, y: 0, z: -7 },
    { x: 21, y: 0, z: -7 },
    { x: 27, y: 0, z: -7 },

    { x: -27, y: 0, z: 18 },
    { x: -21, y: 0, z: 18 },
    { x: -18, y: 0, z: 18 },
    { x: -12, y: 0, z: 18 },
    { x: -6, y: 0, z: 18 },
    { x: 0, y: 0, z: 18 },
    { x: 6, y: 0, z: 18 },
    { x: 12, y: 0, z: 18 },
    { x: 18, y: 0, z: 18 },
    { x: 21, y: 0, z: 18 },
    { x: 27, y: 0, z: 18 },

    { x: -27, y: 0, z: -26 },
    { x: -21, y: 0, z: -26 },
    { x: -18, y: 0, z: -26 },
    { x: -12, y: 0, z: -26 },
    { x: -6, y: 0, z: -26 },
    { x: 0, y: 0, z: -26 },
    { x: 6, y: 0, z: -26 },
    { x: 12, y: 0, z: -26 },
    { x: 18, y: 0, z: -26 },
    { x: 21, y: 0, z: -26 },
    { x: 27, y: 0, z: -26 },
  ];

  for (var i = 0; i < lakes.length; i++) {
    var lake = new Lake(
      (lakes[i].lanes = 1),
      (lakes[i].width = 1.5),
      lakes[i].x,
      (lakes[i].y = 0),
      lakes[i].z,
      (lakes[i].stripes = 5),
      (lakes[i].stripeDistance = 1.5)
    );
    cena.add(lake);
  }
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
