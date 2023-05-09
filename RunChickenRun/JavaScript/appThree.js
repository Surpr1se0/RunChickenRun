document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth -15, window.innerHeight -80);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

//Camara Orthographic:

// Setting up camera
var aspectRatio = window.innerWidth / window.innerHeight;
var camaraWidth = 150; //alterar para visualizar melhor a galinha
var camaraHeight = camaraWidth / aspectRatio;

var camara = new THREE.OrthographicCamera(
  camaraWidth / -2, // left
  camaraWidth / 2, // right
  camaraHeight / 2, // top
  camaraHeight / -2, // bottom
  0, // near plane
  1000 // far plane
);
camara.position.set(200, 200, 200);
camara.lookAt(0, 10, 0);

// Linha responsavel pela criação da camara perpective
var camaraPerspetiva = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
/*
var geometriaCubo = new THREE.BoxGeometry(1,1,1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg');
var materialTextura = new THREE.MeshBasicMaterial({map:textura});

var meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);
meshCubo.translateZ(-6.0);
*/
var galinhaSize = 2 //evitar mexer nisto que ainda não está a 100%



function Galinha() {
    var galinha = new THREE.Group();
  
    var corpo = new THREE.Mesh(
      new THREE.BoxGeometry( galinhaSize*5, galinhaSize*5, galinhaSize*5 ), 
      new THREE.MeshPhongMaterial( { color: 0xFFFFFF, flatShading: true } )
    );
    
    corpo.position.z = 10;
    corpo.castShadow = true;
    corpo.receiveShadow = true;
    galinha.add(corpo);

    var crista = new THREE.Mesh(
        new THREE.BoxGeometry( galinhaSize*1, galinhaSize*1, galinhaSize*2 ), 
        new THREE.MeshPhongMaterial( { color: 0xFF6949, flatShading: true } )
    );

    crista.position.z = 25;
    crista.position.y = 20;
    crista.position.x = 15;
    crista.castShadow = true;
    crista.receiveShadow = true;
    galinha.add(crista);

    var olhod = new THREE.Mesh(
      new THREE.BoxGeometry(galinhaSize*0.5,galinhaSize*0.5,galinhaSize*0.5),
      new THREE.MeshPhongMaterial({color: 0x000000, flatShading: true})
    );

    olhod.position.z = 25;
    olhod.position.y = 12;
    olhod.position.x = 8;
    olhod.castShadow = true;
    olhod.receiveShadow = true;
    galinha.add(olhod);

    var olhoe = new THREE.Mesh(
      new THREE.BoxGeometry(galinhaSize*0.5,galinhaSize*0.5,galinhaSize*0.5),
      new THREE.MeshPhongMaterial({color: 0x000000, flatShading: true})
    );

    olhoe.position.z = 25;
    olhoe.position.y = 12;
    olhoe.position.x = 12;
    olhoe.castShadow = true; 
    olhoe.receiveShadow = true;
    galinha.add(olhoe);
    
    var bico = new THREE.Mesh(
      new THREE.BoxGeometry(galinhaSize*0.5,galinhaSize*0.5,galinhaSize*1),
      new THREE.MeshPhongMaterial({color: 0xFF7800, flatShading: true})
    );

    bico.position.z = 25;
    bico.position.y = 8;
    bico.position.x = 9;
    bico.castShadow = true;
    bico.receiveShadow = true;
    galinha.add(bico);
        
    // bordas na corpo da galinha
    var geo = new THREE.EdgesGeometry( corpo.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x9C9C9C, flatShading: true} );
    var bordas = new THREE.LineSegments( geo, mat );
    corpo.add( bordas );

    return galinha;  
  }
  
  function Rodas() {
    var geometry = new THREE.CylinderGeometry(9, 9, 31);
    var material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    var roda = new THREE.Mesh(geometry, material);
    roda.rotation.x=Math.PI/2;
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


function Start(){

    var galinha= new Galinha();
    cena.add(galinha);


    galinha.scale.set(2,2,2);
    var carro = new Carro();
    cena.add(carro);

    //Posição Inicial
    galinha.translateZ(-14.0);

    carro.translateZ(-15.0)

    //luz ambiente que brilha de todo o lado
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    cena.add(ambientLight);

    // luz direcional que simula o sol, brilha de luz em retas pararelas
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(200, 500, 300);
    cena.add(directionalLight); 

    renderer.render(cena, camara);

    //alterar em conformidade estes valores      
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
    };

    requestAnimationFrame(loop);
}

function loop(){

    //meshCubo.rotateY(Math.PI/180 * 1);

    renderer.render(cena, camara);

    requestAnimationFrame(loop);
}


