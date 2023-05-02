document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var camara = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
var renderer = new THREE.WebGLRenderer();

// Linha responsavel pela criação da camara
var camaraPerspetiva = new THREE.PerspectiveCamera(45, 4/3, 0.1, 100);

renderer.setSize(window.innerWidth -15, window.innerHeight-80);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

var geometria = new THREE.BufferGeometry();
var vertices = new Float32Array([
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.0, 0.5, 0.0
]);

const cores = new Float32Array([
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
]);

geometria.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometria.setAttribute('color', new THREE.BufferAttribute(new Float32Array(cores), 3));

var material = new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide});

var mesh = new THREE.Mesh(geometria, material);

// Comentar estas linhas para dar reset à posição, tamanho e rotações.
// mesh.translateX(0.5);
// mesh.translateX(-1);
// mesh.translateY(0.5);
// mesh.translateY(-1);

// mesh.scale.set(0.25, 0.25, 0.25); //mudar para 0.75
// mesh.scale.set(0.75, 0.75, 0.75); 

// criamos no entanto translação no eixo do z
mesh.translateZ(-6.0);

// variavel relativa ao angulo de rotacao
var anguloDeRotacao = 0;

// Criação da geometria de um cubo 
var geometriaCubo = new THREE.BoxGeometry(1, 1, 1);

// Criação do material basico q vai permitir configurar o aspeto das faces do cubo
var materialCubo = new THREE.MeshBasicMaterial({vertexColors :true});

// carregar a textura para uma variavel
var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg');

// adicionei isto para ver se da para ampliar
textura.wrapS = THREE.RepeatWrapping;
textura.wrapT = THREE.RepeatWrapping;

var materialTextura = new THREE.MeshBasicMaterial({map: textura});

// Definição das cores dos vértices do cubo
const vertexColorsCubo = new Float32Array([
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 0.0,

    1.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0,

    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    1.0, 1.0, 0.0,
    0.0, 0.0, 0.0,

    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,

    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 0.0,
]);

// associar o array com as cores dos vértices à propriedade da cor da geometria
geometriaCubo.setAttribute('color', new THREE.BufferAttribute(vertexColorsCubo, 3));

// apos criar a geometria, criamos a mesh com os dados da geometria e do material
meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);

// criamos uma translação no eixo do z para q o triangulo fique dentro do volume de visualização. 
meshCubo.translateZ(-6.0);


// ------Variáveis para o Desafio---------------
// criação de  variável que vaic onter a info de mapeamento uv 
var uvAttribute = geometriaCubo.getAttribute("uv");

// atribuição de posição uv a cada um dos vértices da geometria com recurso à função
// .setXY(indice do verteice, coordenada u, coordenada v)

// U -> posicao horizontal 
// V -> posicao vertical

// faces do topo (4, 5, 6, 7)

//FRENTE
uvAttribute.setXY(0, 0, 0);
uvAttribute.setXY(1, 0.5, 0);
uvAttribute.setXY(2, 0, 0.5);
uvAttribute.setXY(3, 0.5, 0.5);

uvAttribute.setXY(4, 0.5, 0);
uvAttribute.setXY(5, 1, 0);
uvAttribute.setXY(6, 0.5, 0.5);
uvAttribute.setXY(7, 1, 0.5);

uvAttribute.setXY(20, 0, 0.5);
uvAttribute.setXY(21, 0.5, 0.5);
uvAttribute.setXY(22, 0, 1);
uvAttribute.setXY(23, 0.5, 1);

uvAttribute.setXY(16, 0.5, 0.5);
uvAttribute.setXY(17, 1, 0.5);
uvAttribute.setXY(18, 0.5, 1);
uvAttribute.setXY(19, 1, 1);

uvAttribute.setXY(12, 1, 1);
uvAttribute.setXY(13, 0, 1);
uvAttribute.setXY(14, 1, 0);
uvAttribute.setXY(15, 0, 0);

uvAttribute.setXY(8, 1,1);
uvAttribute.setXY(9, 0, 1);
uvAttribute.setXY(10, 1, 0);
uvAttribute.setXY(11, 0, 0);

/*
UMA COORDENADA PARA CIMA PARA TODOS OS VÉRTICES 

uvAttribute.setXY(0, 2, 0); // sup esq
uvAttribute.setXY(1, 0, 0); // sup dir 
uvAttribute.setXY(2, 2, 2); // inf esq
uvAttribute.setXY(3, 0, 2); // inf dir 
// DIREITA
uvAttribute.setXY(0, 1, 1);
uvAttribute.setXY(1, 0, 1);
uvAttribute.setXY(2, 1, 0);
uvAttribute.setXY(3, 0, 0);

// TRAS
uvAttribute.setXY(0, 1, 1);
uvAttribute.setXY(1, 0, 1);
uvAttribute.setXY(2, 1, 0);
uvAttribute.setXY(3, 0, 0);

// ESQUERDA
uvAttribute.setXY(0, 1, 1);
uvAttribute.setXY(1, 0, 1);
uvAttribute.setXY(2, 1, 0);
uvAttribute.setXY(3, 0, 0);

// CIMA
uvAttribute.setXY(0, 1, 1);
uvAttribute.setXY(1, 0, 1);
uvAttribute.setXY(2, 1, 0);
uvAttribute.setXY(3, 0, 0);

// BAIXO
uvAttribute.setXY(0, 1, 1);
uvAttribute.setXY(1, 0, 1);
uvAttribute.setXY(2, 1, 0);
uvAttribute.setXY(3, 0, 0);
*/




// como definimos novos valores para o mapeamento UV, é necessário ativar a sua atualização 
geometriaCubo.uvsNeedUpdate = true;

function Start()
{
    //Comentar a linha para o triangulo nao ser adicionado
    //cena.add(mesh);

    // Adicionar o cubo à cena
    cena.add(meshCubo);

    renderer.render(cena, camaraPerspetiva);

    requestAnimationFrame(loop);
}

function loop()
{
    // comentamos a linha que faz o triangulo rodar pois ja nao precisamos dela
    //mesh.rotateY(Math.PI/180*1);
    // mesh.rotateX(Math.PI/180*1);

    // Tal como fizemos inicialmente com o triangulo, vamos colocar o cubo a rodar no eixo do Y 
    meshCubo.rotateY(Math.PI/180*1);

    // funcao chamada para gerarmos um novo frame
    renderer.render(cena, camaraPerspetiva);

    requestAnimationFrame(loop);
}
