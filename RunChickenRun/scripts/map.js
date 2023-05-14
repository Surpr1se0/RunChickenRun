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
  
    grass_inicial.position.set(x, y + 0.001, z - lane_width +0.2);
    lake.add(grass_inicial);
  
    // Criar estrada
    for (var i = 0; i < num_lanes; i++) {
      var texture = new THREE.TextureLoader().load('./Images/water.jpg');
  
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

function GenerateMap()
{
    var roads = [
      { lanes: 4, width: 1.5, x: -27, y: 0, z: 30 },
      { lanes: 4, width: 1.5, x: -21, y: 0, z: 30 },
      { lanes: 4, width: 1.5, x: -18, y: 0, z: 30 },
      { lanes: 4, width: 1.5, x: -12, y: 0, z: 30 },
      { lanes: 4, width: 1.5, x: -6, y: 0, z:  30 },
      { lanes: 4, width: 1.5, x: 0, y: 0, z:   30 },
      { lanes: 4, width: 1.5, x: 6, y: 0, z:   30 },
      { lanes: 4, width: 1.5, x: 12, y: 0, z:  30 },
      { lanes: 4, width: 1.5, x: 18, y: 0, z:  30 },
      { lanes: 4, width: 1.5, x: 21, y: 0, z:  30 },
      { lanes:4, width: 1.5, x: 27, y: 0, z:   30 },

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
        { lanes: 3, width: 1.5, x: -27, y: 0, z: -1},
    
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
        { lanes: 4, width: 1.5, x: -6, y: 0, z:  10 },
        { lanes: 4, width: 1.5, x: 0, y: 0, z:   10 },
        { lanes: 4, width: 1.5, x: 6, y: 0, z:   10 },
        { lanes: 4, width: 1.5, x: 12, y: 0, z:  10 },
        { lanes: 4, width: 1.5, x: 18, y: 0, z:  10 },
        { lanes: 4, width: 1.5, x: 21, y: 0, z:  10 },
        { lanes:4, width: 1.5, x: 27, y: 0, z:   10 },
    
        { lanes: 3, width: 1.5, x: 27, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: 21, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: 18, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: 12, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: 0, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: 6, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: -6, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: -12, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: -18, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: -21, y: 0, z: 21},
        { lanes: 3, width: 1.5, x: -27, y: 0, z:21},

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
        { lanes: 4, width: 1.5, x: -6, y: 0, z:  -17 },
        { lanes: 4, width: 1.5, x: 0, y: 0, z:   -17 },
        { lanes: 4, width: 1.5, x: 6, y: 0, z:   -17 },
        { lanes: 4, width: 1.5, x: 12, y: 0, z:  -17 },
        { lanes: 4, width: 1.5, x: 18, y: 0, z:  -17 },
        { lanes: 4, width: 1.5, x: 21, y: 0, z:  -17 },
        { lanes:4, width: 1.5, x: 27, y: 0, z:   -17 },

        { lanes: 3, width: 1.5, x: 27, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: 21, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: 18, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: 12, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: 0, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: 6, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: -6, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: -12, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: -18, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: -21, y: 0, z: -23},
        { lanes: 3, width: 1.5, x: -27, y: 0, z:-23},
        
        
      ];
      
      for (var i = 0; i < roads.length; i++) {
        var road = new Road(
          roads[i].lanes,
          roads[i].width = 1.5,
          roads[i].x,
          roads[i].y = 0,
          roads[i].z ,
          roads[i].stripes = 5,
          roads[i].stripeDistance = 1.5
        );
        cena.add(road);
      }
    
      var lakes = [
        {x: -27, y: 0, z: -7 },
        {x: -21, y: 0, z: -7 },
        {x: -18, y: 0, z: -7 },
        {x: -12, y: 0, z: -7 },
        {x: -6, y: 0, z: -7 },
        {x: 0, y: 0, z: -7  },
        {x: 6, y: 0, z: -7  },
        {x: 12, y: 0, z: -7 },
        {x: 18, y: 0, z: -7 },
        {x: 21, y: 0, z: -7 },
        {x: 27, y: 0, z: -7 },
    
        {x: -27, y: 0, z:18 },
        {x: -21, y: 0, z:18 },
        {x: -18, y: 0, z:18 },
        {x: -12, y: 0, z:18 },
        {x: -6, y: 0, z:18 },
        {x: 0, y: 0, z: 18 },
        {x: 6, y: 0, z: 18 },
        {x: 12, y: 0, z:18 },
        {x: 18, y: 0, z:18 },
        {x: 21, y: 0, z:18 },
        {x: 27, y: 0, z:18 },

        {x: -27, y: 0, z:-26 },
        {x: -21, y: 0, z:-26 },
        {x: -18, y: 0, z:-26 },
        {x: -12, y: 0, z:-26 },
        {x: -6, y: 0, z:-26 },
        {x: 0, y: 0, z: -26 },
        {x: 6, y: 0, z: -26 },
        {x: 12, y: 0, z:-26 },
        {x: 18, y: 0, z:-26 },
        {x: 21, y: 0, z:-26 },
        {x: 27, y: 0, z:-26 },
      ];
    
      for (var i = 0; i < lakes.length; i++) {
        var lake = new Lake(
          lakes[i].lanes = 1,
          lakes[i].width = 1.5,
          lakes[i].x,
          lakes[i].y = 0,
          lakes[i].z ,
          lakes[i].stripes = 5,
          lakes[i].stripeDistance = 1.5
        );
        cena.add(lake);
      }
}