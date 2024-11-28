import * as THREE from 'three';
gsap.registerPlugin(ScrollTrigger);
// import './styles.css'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 1;
camera.position.z = -3;

scene.background = new THREE.Color(0x1B1433);
const loaderbg = new THREE.TextureLoader();

loaderbg.load('assets/bg.jpg', function(texture) {
    texture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
    texture.wrapT = THREE.RepeatWrapping; // Repeat vertically
    texture.repeat.set(1, 1); // Repeat 4x4 times (adjust values as needed)
    scene.background = texture; // Apply the texture as the background
});

// -------------------------------------etoiles
const geometry = new THREE.SphereGeometry(0.03, 32, 32); // radius, widthSegments, heightSegments
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // blue color

let compteur = 0;
let etoiles = [];

while (compteur < 400) {
    // let material = new THREE.MeshNormalMaterial({ color: parseInt(randomColor, 16) });
    const etoile = new THREE.Mesh(geometry, material);
    etoiles.push(etoile);
    etoile.position.set(
    Math.random() * 50 - 25,
    Math.random() * 30 - 15,
    Math.random() * 30 - 28
);

    // Assuming you have a scene variable to add the cube to
    scene.add(etoile);

    compteur++; // Increment cube counter
    console.log(etoile)
}


gsap.to(camera.position, {
    y: -8,
    scrollTrigger: {
        trigger: "header",
        scrub: 3, 
        start: "center 25%", 
        end: "75% 25%", 
        // markers: true, 
    },
});

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let sun;
let sunLight;

loader.load('assets/sun.glb', function (gltf) {
    sun = gltf.scene;
    scene.add(sun);
    sun.position.set(0, 0, -8);  // Sun at the center

    sunLight = new THREE.PointLight(0xFFEFBE, 50, 50); // white light, intensity 1, distance 100
    sunLight.position.set(0, 0, 0);  // Light's position is the same as the sun's position

    sun.add(sunLight);

    gsap.to(sun.rotation, {
        y: Math.PI * 1, // Full rotation around Y-axis (360 degrees)
        repeat: -1,     // Infinite repeat
        ease: "linear", // Linear easing for a smooth constant rotation
        duration: 20    // 20 seconds for one full rotation (adjust as needed)
    });

}, undefined, function (error) {
    console.error(error);
});

let planetData = {};

planetData['mercury'] = { position: { x: -7, y: 0, z: -8 }}; 
planetData['venus'] = { position: { x: -5, y: 0, z: -8 } };
planetData['earth'] = { position: { x: 0, y: 0, z: -5 } };
planetData['mars'] = { position: { x: 5, y: 0, z: -6 } };
planetData['jupiter'] = { position: { x: 8, y: 0, z: -8 } };
planetData['saturn'] = { position: { x: 5, y: 0, z: -10 } };
planetData['uranus'] = { position: { x: 0, y: 0, z: -11 } };
planetData['neptune'] = { position: { x: -5, y: 0, z: -10 } };

function loadPlanet(name, path) {
    loader.load(path, function (gltf) {
        let planet = gltf.scene;
        scene.add(planet);
        planetData[name].object = planet; 
        planet.position.set(
            planetData[name].position.x,
            planetData[name].position.y,
            planetData[name].position.z
        );

    }, undefined, function (error) {
        console.error(error);
    });
}

// Load all planets
loadPlanet('mercury', 'assets/mercure.glb');
loadPlanet('venus', 'assets/venus.glb');
loadPlanet('earth', 'assets/earth.glb');
loadPlanet('mars', 'assets/mars.glb');
loadPlanet('jupiter', 'assets/jupiter.glb');
loadPlanet('saturn', 'assets/saturn.glb');
loadPlanet('uranus', 'assets/uranus.glb');
loadPlanet('neptune', 'assets/neptune.glb');

let planetDataTwo = {};

planetDataTwo['mercury'] = { position: { x: 6, y: -8, z: -5 }}; 
planetDataTwo['venus'] = { position: { x: 0, y: -8, z: -5 }};
planetDataTwo['earth'] = { position: { x: 4, y: -8, z: -5 }};
planetDataTwo['mars'] = { position: { x: 0, y: -8, z: -5 }};
planetDataTwo['jupiter'] = { position: { x: 0, y: -8, z: -5 }};
planetDataTwo['saturn'] = { position: { x: 0, y: -8, z: -6 }};
planetDataTwo['uranus'] = { position: { x: 0, y: -8, z: -5 }};
planetDataTwo['neptune'] = { position: { x: 0, y: -8, z: -5 }};

function loadPlanetTwo(name, path) {
    loader.load(path, function (gltf) {
        let planet = gltf.scene;
        scene.add(planet);
        planetDataTwo[name].object = planet; 
        planet.position.set(
            planetDataTwo[name].position.x,
            planetDataTwo[name].position.y,
            planetDataTwo[name].position.z
        );

        const planets = [
            { name: 'earth', class: '.earth' },
            { name: 'mars', class: '.mars' },
            { name: 'jupiter', class: '.jupiter' },
            { name: 'saturn', class: '.saturn' },
            { name: 'uranus', class: '.uranus' },
            { name: 'neptune', class: '.neptune' },
            { name: 'mercury', class: '.mercury' },
            { name: 'venus', class: '.venus' }
          ];

          planets.forEach(planetInfo => {
            gsap.to(planet.rotation, {
                y: Math.PI * 2, // Full rotation around Y-axis (360 degrees)
                repeat: -1,     // Infinite repeat
                ease: "linear", // Linear easing for a smooth constant rotation
                duration: 20    // 20 seconds for one full rotation (adjust as needed)
            });
            if (name === planetInfo.name) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: `${planetInfo.class}`, // Utilisation du sélecteur CSS
                  start: '10% 50%', 
                  end: 'bottom 50%',
                  scrub: 6,
                //   markers: true
                }
              });
              
              tl.fromTo(planet.position, 
                { x: 9 },     // Position de départ pour chaque planète
                { x: 1.5, duration: 2 } // Animation d'entrée en scène
              )
              .to(planet.position, 
                { x: 1.5, duration: 2 }, // Animation de sortie
                '+=0.5'
              )
              .to(planet.position, 
                { x: 9, duration: 2 }, // Animation de sortie
                '+=0.5'
              );
            }
          });

    }, undefined, function (error) {
        console.error(error);
    });
}

// Load all planets
loadPlanetTwo('mercury', 'assets/mercure.glb');
loadPlanetTwo('venus', 'assets/venus.glb');
loadPlanetTwo('earth', 'assets/earth.glb');
loadPlanetTwo('mars', 'assets/mars.glb');
loadPlanetTwo('jupiter', 'assets/jupiter.glb');
loadPlanetTwo('saturn', 'assets/saturn.glb');
loadPlanetTwo('uranus', 'assets/uranus.glb');
loadPlanetTwo('neptune', 'assets/neptune.glb');

const ambientLight = new THREE.AmbientLight(0xffffff, 0.07); // Low intensity ambient light
scene.add(ambientLight);

const light = new THREE.PointLight(0xFFEFBE, 30, 5); // white light, intensity 1, distance 100
    light.position.set(0, -6, -4);  // Light's position is the same as the sun's position

    scene.add(light);

// const controls = new OrbitControls(camera, renderer.domElement);

// Set up variables for mouse tracking
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Event listener to capture mouse movement
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX; // Normalize mouseX to range [-1, 1]
    mouseY = (event.clientY - windowHalfY) / windowHalfY; // Normalize mouseY to range [-1, 1]
}

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);

//     // Adjust camera rotation based on mouse movement
//     camera.rotation.y = mouseX * 0.1; // Horizontal rotation, adjust the multiplier (0.1) to control sensitivity
//     camera.rotation.x = -mouseY * 0.1; // Vertical rotation, adjust multiplier as needed

//     renderer.render(scene, camera);
// }

// animate();


let isAnimating = true;

let t = 0;
function animate() {
    camera.rotation.y = mouseX * -0.03;
    camera.rotation.x = -mouseY * -0.03; 
    let index = 0; // Initialize a planet index to create a delay
    for (let planetName in planetData) {
        const planet = planetData[planetName].object; // Access the planet object
        const delay = index * 0.8; // Delay factor for each planet, adjust this to control delay
        if (planet) {
            planet.rotation.y += 0.01; 
            if (isAnimating) {
            t += 0.0007; // Increment time, but apply the delay for each planet
            gsap.to(planet.position, {
                x: 8 * Math.cos(t - delay),  // Animate x-position with cosine function
                z: 3 * Math.sin(t - delay) - 8, // Animate z-position with sine function
                y : 0,
                duration: 0.8, // Duration for each animation frame
                ease: "power1.out", // Easing function for smooth transition
            })
        }
}
        
        index++; // Increment index for the next planet
    }
    
    renderer.render(scene, camera); // Render the scene
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    // isAnimating = false;
    // console.log(planetDataOne['earth'].object.position);
}


document.body.onscroll = moveCamera;

renderer.setAnimationLoop( animate );