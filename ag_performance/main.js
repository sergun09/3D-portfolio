import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/Addons.js';
import { Easing, Tween, update } from 'tween';
import { GUI } from 'dat.gui';
import { userData } from 'three/tsl';

const paintings = [
	[
		{
			"title": "Bienvenue",
			"description": `Bienvenue sur mon CV ! Pour naviguer d'une section à une autre cliquez simplement
			sur la flèche de gauche ou de droite ! Pour découvrir en profondeur les sections cliquez sur les flèches haut ou bas ! Bonne découverte :)`,
			"image": "blue.jpg",
		},
	],
	[
		{
			"title": "Présentation",
			"description": `Je suis Sinan 23 ans. Jeune développeur actuellement au chômage :(
			sur la flèche de gauche ou de droite ! Pour découvrir en profondeur les sections cliquez sur les flèches haut ou bas ! Bonne découverte :)`,
			"image": "colors.jpg",
		},
	],
	[
		{
			"title": "Compétences",
			"description": `Je suis Sinan 23 ans. Jeune développeur actuellement au chômage :(
			sur la flèche de gauche ou de droite ! Pour découvrir en profondeur les sections cliquez sur les flèches haut ou bas ! Bonne découverte :)`,
			"image": "field.jpg",
		},
	],
	[
		{
			"title": "Expériences",
			"description": `Je suis Sinan 23 ans. Jeune développeur actuellement au chômage :(
			sur la flèche de gauche ou de droite ! Pour découvrir en profondeur les sections cliquez sur les flèches haut ou bas ! Bonne découverte :)`,
			"image": "blue.jpg",
		},
	],
	[
		{
			"title": "Projets",
			"description": `Mon portfolio :)`,
			"image": "flower.jpg",
		},
	],
	[
		{
			"title": "Crédits",
			"description": `Pour réaliser cette expérience je tenais à remercier @dangreenheck.`,
			"image": "paris.jpg",
		}
	],
	[
		{
			"title": "Contact",
			"description": `Pour réaliser cette expérience je tenais à remercier @dangreenheck.`,
			"image": "trees.jpg",
		}
	],
]
const images = [
	'blue.jpg',
	'colors.jpg',
	'field.jpg',
	'flower.jpg',
	'paris.jpg',
	'trees.jpg']

const objectPositionOnZ = -4.5;
const numberOfSections = paintings.length;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.y = 3;

const textureLoader = new THREE.TextureLoader();

const rootNode = new THREE.Object3D()
scene.add(rootNode)

const leftImage = textureLoader.load("arrow_left.png");
const rightImage = textureLoader.load("arrow_right.png");
const upImage = textureLoader.load("arrow_up.png");
const downImage = textureLoader.load("arrow_down.png");

for (let index = 0; index < numberOfSections; index++) {
	console.log("Longueur de la section " + index + " " + paintings[index].length)
	for(let j = 0; j < paintings[index].length; j++){
		const paitingTexture = textureLoader.load(paintings[index][j].image)
		console.log(paintings[index][j].image)
		//paitingTexture.colorSpace = THREE.SRGBColorSpace;
	
		const baseNode = new THREE.Object3D();
		baseNode.rotation.y = index * (2 * Math.PI / numberOfSections);
		rootNode.add(baseNode);
		
		const painting = new THREE.Mesh(
			new THREE.BoxGeometry(3, 2, 0.1),
			new THREE.MeshStandardMaterial({ map : paitingTexture})
		)
		painting.name = "Painting";
		painting.position.z = objectPositionOnZ;
		baseNode.add(painting);	
	
		const paintingFrame = new THREE.Mesh(
			new THREE.BoxGeometry(3.2, 2.2, 0.09),
			new THREE.MeshStandardMaterial({ color : 0x202020})
		);
		paintingFrame.name = "Paiting Frame of " + paintings[index][j].title;
		paintingFrame.position.z = objectPositionOnZ;
		baseNode.add(paintingFrame);	
	
		const leftArrow = new THREE.Mesh(
			new THREE.PlaneGeometry(0.45, 0.45),
			new THREE.MeshStandardMaterial({
				map : leftImage,
				transparent: true
			})
		);
		leftArrow.name= "LeftArrow";
		leftArrow.userData = {
			"rotation": (index === numberOfSections - 1) ? 0 : index + 1,
			"translation": "Gauche :p"
		};
		leftArrow.position.set(-1.9, 0, objectPositionOnZ);
		baseNode.add(leftArrow);
	
		const rightArrow = new THREE.Mesh(
			new THREE.PlaneGeometry(0.4, 0.4),
			new THREE.MeshStandardMaterial({
				map : rightImage,
				transparent: true
			})
		);
		rightArrow.name = "RightArrow";
		rightArrow.userData = {
			"rotation": (index ===  0) ? numberOfSections - 1 : index - 1,
			"translation": "Droite :p"
		};
		rightArrow.position.set(1.9, 0, objectPositionOnZ);
		baseNode.add(rightArrow);
	
		const upArrow = new THREE.Mesh(
			new THREE.PlaneGeometry(0.4, 0.4),
			new THREE.MeshStandardMaterial({
				map : upImage,
				transparent: true
			})
		);
		upArrow.name = "UpArrow";
		upArrow.userData = {
			"rotation": (index ===  0) ? numberOfSections - 1 : index - 1,
			"translation": "Haut :p" 
		};
		upArrow.position.set(-.3, 1.35, objectPositionOnZ);
		//upArrow.visible = false;
		baseNode.add(upArrow);
		
		const downArrow = new THREE.Mesh(
			new THREE.PlaneGeometry(0.4, 0.4),
			new THREE.MeshStandardMaterial({
				map : downImage,
				transparent: true,
			})
		);
		downArrow.name = "DownArrow";
		downArrow.userData = {
			"rotation" : (index ===  0) ? numberOfSections - 1 : index - 1,
			"translation" : "Bas :p",
		}
		downArrow.position.set(.3, 1.35, objectPositionOnZ);
		baseNode.add(downArrow);
	}
}



const spotlight = new THREE.SpotLight(0xffffff, 210.0, 10.0, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const reflector = new Reflector(
	new THREE.CircleGeometry(10),
	{
		textureWidth: window.innerWidth,
		textureHeight: window.innerHeight
	}
);
reflector.position.set(0,-1.5,0);
reflector.rotateX(-Math.PI / 2);
scene.add(reflector);


/// 
function rotateGallery(direction, newIndex){
	const deltaY = (direction * (2 * Math.PI / numberOfSections));

	new Tween(rootNode.rotation)
		.to({ y: rootNode.rotation.y + deltaY})
		.easing(Easing.Quadratic.InOut)
		.start()
		.onStart(() =>{
			document.getElementById("title").style.opacity = 0;
			//document.getElementById("artist").style.opacity = 0;
		})
		.onComplete(() => {
			document.getElementById("title").innerText = paintings[newIndex][0].title;
			document.getElementById("title").style.opacity = 1;

			showArrowsForCurrentSection(newIndex)
		});
}

function moveGallery(direction, newIndex){
	const deltaY = direction * 50;

	new Tween(camera.position)
		.to({ y: camera.position.y + deltaY})
		.easing(Easing.Circular.InOut)
		.start()
		.onStart(() =>{
			console.log("On se déplace mgl")
		})
		.onComplete(() => {
			console.log("Déplacement terminé mgl")
		});
}

function displayDescription(currentPainting){
	const description = document.getElementById("description");

	description.style.visibility = "hidden";

	new Tween(description)
		.to({ opacity : 1}, 500)
		.easing(Easing.Circular.InOut)
		.start()
		.onStart(() =>{
			description.style.visibility = "visible";
		})
		.onComplete(() => {
			document.getElementById("description-text").innerText = currentPainting.description;
		});
}

function showArrowsForCurrentSection(currentSectionIndex) {
	// Parcourir toutes les sections
	for (let index = 0; index < numberOfSections; index++) {
		const baseNode = rootNode.children[index];  // Accéder à la base de chaque section
		const arrows = baseNode.children.filter(child => child.name.includes("Arrow")); // Sélectionner toutes les flèches dans la section

		arrows.forEach(arrow => {
			if (index === currentSectionIndex) {
				// Animer l'opacité des flèches visibles pour la section courante
				new Tween(arrow.material)
					.to({ opacity: 1 }, 500)  // Durée de l'animation : 500ms
					.easing(Easing.Quadratic.InOut)
					.start();
			} else {
				// Animer l'opacité des flèches invisibles pour les autres sections
				new Tween(arrow.material)
					.to({ opacity: 0 }, 500)  // Durée de l'animation : 500ms
					.easing(Easing.Quadratic.InOut)
					.start();
			}
		});
	}
}


function animate() {
	update();


	renderer.render( scene, camera );
}

window.addEventListener("resize", () =>{
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight);

	reflector.getRenderTarget().setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener("click", (ev) => {
	const raycast = new THREE.Raycaster();

	const mouse = new THREE.Vector2(
		(ev.clientX / window.innerWidth) * 2 - 1, 
		-(ev.clientY / window.innerHeight) * 2 + 1
	);

	raycast.setFromCamera(mouse, camera);

	const intersectedObjects = raycast.intersectObject(rootNode, true);
	if(intersectedObjects.length > 0){
		const obj = intersectedObjects[0].object;
		const newIndex = obj.userData.rotation;
		if(obj.name === "LeftArrow"){
			rotateGallery(-1, newIndex);
		}
		if(obj.name === "RightArrow"){
			rotateGallery(1, newIndex);
		}
		if(obj.name === "UpArrow"){
			moveGallery(1, newIndex);
		}
		if(obj.name === "DownArrow"){
			moveGallery(-1, newIndex);
		}

		// if(obj.name === "Painting"){
		// 	displayDescription(currentPaiting);
		// }
	}
});

function init(){
	showArrowsForCurrentSection(0);
	document.getElementById("title").innerText = paintings[0][0].title;
}

init()

console.log(rootNode.children)