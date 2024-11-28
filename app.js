import * as THREE from "three";

//Il faut créer une lumière une caméra et une scene

//cube
const scene = new THREE.Scene;
const geometry = new THREE.TorusGeometry( 1, 0.4524, 19, 93 ); 


// const material = new THREE.MeshBasicMaterial({ color: parseInt(randomColor, 16) });

// const cube = new THREE.Mesh(geometry, material);
// cube.name = "green cube";
const bgColor = 0xE0FCFC;
const couleurs = ["FE94B4", "FFC9A3", "FA6782", "FCB5AA"];
scene.background = new THREE.Color( bgColor );//change la couleur du back-ground
scene.fog = new THREE.Fog(bgColor, 15, 30);
let compteur = 0;

let cubesMesh = [];

const phongMat = new THREE.MeshPhongMaterial();

while (compteur < 100) {//On peut aussi utiliser for(let j=0; j<nbCube; j++)
    let randomColor = couleurs[Math.floor(Math.random() * couleurs.length)];
    let material = new THREE.MeshNormalMaterial({ color: parseInt(randomColor, 16) });
    const cubeMesh = new THREE.Mesh(geometry, phongMat);
    cubesMesh.push(cubeMesh);
cubeMesh.position.set(
    Math.random() * 50 - 25,
    Math.random() * 26 - 13,
    Math.random() * 30 - 15
);
cubeMesh.rotation.set(
    Math.random(),
    Math.random(),
    0
);

    // Assuming you have a scene variable to add the cube to
    scene.add(cubeMesh);

    compteur++; // Increment cube counter
    console.log(cubeMesh)
}

// scene.add(cube);

// console.log(cube)

//camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
camera.position.set(0,0,15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0x00ff50, 5);
light.position.set(0,10,5);
light.target.position.set(0,0,0);
scene.add(light);

const PointLight = new THREE.PointLight(0xFF0000, 5);
PointLight.position.set(0,-10,5);
scene.add(PointLight);

const PointLightHelp = new THREE.PointLightHelper(PointLight);
scene.add(PointLightHelp);

const render = () => {
    //update
    cubesMesh = cubesMesh.map((c)=>{
         c.rotation.x += 0.03;
//         c.material.transparent = true;
// c.material.opacity += 0.008;

        c.position.z +=0.1;
        if (c.position.z > 16) {
            c.position.z = -20;
            // c.material.opacity = 0;
        }

        
        return c;
    });
    //render
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();