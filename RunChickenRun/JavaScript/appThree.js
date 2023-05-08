document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth -15, window.innerHeight -80);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

//Camara Orthographic:

var distance = 1000;
var camara = new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camara.rotation.x = 50*Math.PI/180;
camara.rotation.y = 20*Math.PI/180;
camara.rotation.z = 10*Math.PI/180;

var initialCamaraPositionY = -Math.tan(camara.rotation.x)*distance;
var initialCamaraPositionX = Math.tan(camara.rotation.y)*Math.sqrt(distance**2 + initialCamaraPositionY**2);
camara.position.y = initialCamaraPositionY;
camara.position.x = initialCamaraPositionX;
camara.position.z = distance;

// Linha responsavel pela criação da camara perpective
/*var camaraPerspetiva = new THREE.PerspectiveCamera(45, 4/3, 0.1, 100);

renderer.setSize(window.innerWidth -15, window.innerHeight-80);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

var geometriaCubo = new THREE.BoxGeometry(1,1,1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg');
var materialTextura = new THREE.MeshBasicMaterial({map:textura});

var meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);
meshCubo.translateZ(-6.0);
*/

var zoom=2;
var galinhaSize=20;


function Galinha() {
    var galinha = new THREE.Group();
  
    var corpo = new THREE.Mesh(
      new THREE.BoxGeometry( galinhaSize, galinhaSize, 20 ), 
      new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } )
    );
    
    corpo.position.z = 10;
    corpo.castShadow = true;
    corpo.receiveShadow = true;
    galinha.add(corpo);

    var crista = new THREE.Mesh(
        new THREE.BoxGeometry( 2, 4, 2 ), 
        new THREE.MeshPhongMaterial( { color: 0xFF6949, flatShading: true } )
    );

    crista.position.z = 30;
    crista.position.x = 5;
    crista.castShadow = true;
    crista.receiveShadow = false;
    galinha.add(crista);
  
    
  
    return galinha;  
  }
  

function Start(){

    var galinha= new Galinha();
    cena.add(galinha);

    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    cena.add(hemiLight)

    renderer.render(cena, camara);

    requestAnimationFrame(loop);
}

function loop(){

    //meshCubo.rotateY(Math.PI/180 * 1);

    renderer.render(cena, camara);

    requestAnimationFrame(loop);
}


