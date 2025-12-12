import "./style.css";
// import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";

const root = ReactDOM.createRoot(document.querySelector("#app"));

root.render(
	// <KeyboardControls
	// 	map={[
	// 		{ name: "forward", keys: ["ArrowUp", "KeyW"] },
	// 		{ name: "backward", keys: ["ArrowDown", "KeyS"] },
	// 		{ name: "leftward", keys: ["ArrowLeft", "KeyA"] },
	// 		{ name: "rightward", keys: ["ArrowRight", "KeyD"] },
	// 		{ name: "jump", keys: ["Space"] },
	// 	]}
	// >
	<>
		<Canvas
			shadows
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [2.5, 4, 6],
			}}
		>
			<Experience />
		</Canvas>
		<Interface />
	</>
	// </KeyboardControls>
);



// import "./style.css";
// import { PLAYER_1, PLAYER_2, SYSTEM } from "@rcade/plugin-input-classic";
// import * as CANNON from "cannon-es";
// import CannonDebugger from "cannon-es-debugger";
// import GUI from "lil-gui";
// import * as THREE from "three";

// const app = document.querySelector("#app");
// app.innerHTML = `
//   <div id="status">
// 		<p id="start-msg">1P or 2P START</p>
// 		<p id="title">marble run</p>
// 		<p id="author">by: briana gude</p>
// 	</div>
//   <canvas id="three"></canvas>
// `;
// const status = document.querySelector("#status");

// /* --------------------------- THREE.JS SETUP --------------------------- */

// const canvas = document.querySelector("#three");
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
// const WIDTH = 336;
// const HEIGHT = 262;
// renderer.setSize(WIDTH, HEIGHT, false);
// renderer.setPixelRatio(2);

// const scene = new THREE.Scene();
// scene.background = new THREE.Color("lightblue");

// const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 100);
// camera.position.set(0, 5, 10);
// camera.lookAt(0, 0, 0);

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(3, 10, 5);
// scene.add(light);

// /* --------------------------- CANNON-ES SETUP --------------------------- */

// const world = new CANNON.World({
// 	gravity: new CANNON.Vec3(0, -9.82, 0),
// });

// // Platform dimensions
// const platformWidth = 10;
// const platformHeight = 1;
// const platformDepth = 10;

// // Floor
// const floorBody = new CANNON.Body({
// 	type: CANNON.Body.STATIC,
// 	shape: new CANNON.Box(
// 		new CANNON.Vec3(platformWidth / 2, platformHeight / 2, platformDepth / 2),
// 	),
// 	position: new CANNON.Vec3(0, -platformHeight / 2, 0),
// });
// world.addBody(floorBody);

// const floorMesh = new THREE.Mesh(
// 	new THREE.BoxGeometry(platformWidth, platformHeight, platformDepth),
// 	new THREE.MeshBasicMaterial({ color: "limegreen" }),
// );
// floorMesh.position.copy(floorBody.position);
// scene.add(floorMesh);

// // Marble settings
// const marbleRadius = 0.5;
// const marbleMass = 1;
// const marbleSubdivisions = 1;

// // Player 1 marble
// const marbleBody1 = new CANNON.Body({
// 	mass: marbleMass,
// 	shape: new CANNON.Sphere(marbleRadius),
// 	position: new CANNON.Vec3(-1, 2, 0),
// });
// world.addBody(marbleBody1);

// const marbleMesh1 = new THREE.Mesh(
// 	new THREE.IcosahedronGeometry(marbleRadius, marbleSubdivisions),
// 	new THREE.MeshBasicMaterial({ color: "hotpink" }),
// );
// scene.add(marbleMesh1);

// // Player 2 marble
// const marbleBody2 = new CANNON.Body({
// 	mass: marbleMass,
// 	shape: new CANNON.Sphere(marbleRadius),
// 	position: new CANNON.Vec3(1, 2, 0),
// });
// world.addBody(marbleBody2);

// const marbleMesh2 = new THREE.Mesh(
// 	new THREE.IcosahedronGeometry(marbleRadius, marbleSubdivisions),
// 	new THREE.MeshBasicMaterial({ color: "orange" }),
// );
// scene.add(marbleMesh2);

// /* --------------------------- DEBUG aTOOLS --------------------------- */

// // Cannon debugger
// const cannonDebugger = CannonDebugger(scene, world, {
// 	color: 0x00ff00,
// });

// // GUI controls
// const gui = new GUI();
// const params = {
// 	speed: 5,
// 	gravity: -9.82,
// 	showPhysicsDebug: false,
// 	resetMarbles: () => {
// 		marbleBody1.position.set(-1, 2, 0);
// 		marbleBody1.velocity.set(0, 0, 0);
// 		marbleBody1.angularVelocity.set(0, 0, 0);

// 		marbleBody2.position.set(1, 2, 0);
// 		marbleBody2.velocity.set(0, 0, 0);
// 		marbleBody2.angularVelocity.set(0, 0, 0);

// 		// status.style.display = "none";
// 	},
// };

// gui.add(params, "speed", 0, 20).name("Marble Speed");
// gui
// 	.add(params, "gravity", -20, 0)
// 	.name("Gravity")
// 	.onChange((val) => {
// 		world.gravity.set(0, val, 0);
// 	});
// gui.add(params, "showPhysicsDebug").name("Show Physics");
// gui.add(params, "resetMarbles").name("Reset Marbles");

// gui.hide()

// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "x", -20, 20).name("Camera X");
// cameraFolder.add(camera.position, "y", 0, 20).name("Camera Y");
// cameraFolder.add(camera.position, "z", 0, 20).name("Camera Z");

// /* --------------------------- GAME STATE --------------------------- */

// let gameStarted = false;
// const fallThreshold = -5;

// /* --------------------------- GAME LOGIC --------------------------- */

// function checkFallen() {
// 	if (marbleBody1.position.y < fallThreshold) {
// 		status.style.display = "block";
// 		status.textContent = "Player 2 Wins! (Player 1 fell off)";
// 		status.style.color = "#f97316";
// 	}
// 	if (marbleBody2.position.y < fallThreshold) {
// 		status.style.display = "block";
// 		status.textContent = "Player 1 Wins! (Player 2 fell off)";
// 		status.style.color = "#ec4899";
// 	}
// }

// /* --------------------------- MAIN LOOP --------------------------- */

// function update() {
// 	if (!gameStarted) {
// 		if (SYSTEM.ONE_PLAYER || SYSTEM.TWO_PLAYER) {
// 			gameStarted = true;
// 			status.textContent = "Game Started!";
// 		}
// 		requestAnimationFrame(update);
// 		return;
// 	}

// 	status.style.display = "none";

// 	// Step physics
// 	world.step(1 / 60);

// 	// Update cannon debugger
// 	if (params.showPhysicsDebug) {
// 		cannonDebugger.update();
// 	}

	// // Apply player 1 controls
	// if (PLAYER_1.DPAD.up)
	// 	marbleBody1.applyForce(
	// 		new CANNON.Vec3(0, 0, -params.speed),
	// 		marbleBody1.position,
	// 	);
	// if (PLAYER_1.DPAD.down)
	// 	marbleBody1.applyForce(
	// 		new CANNON.Vec3(0, 0, params.speed),
	// 		marbleBody1.position,
	// 	);
	// if (PLAYER_1.DPAD.left)
	// 	marbleBody1.applyForce(
	// 		new CANNON.Vec3(-params.speed, 0, 0),
	// 		marbleBody1.position,
	// 	);
	// if (PLAYER_1.DPAD.right)
	// 	marbleBody1.applyForce(
	// 		new CANNON.Vec3(params.speed, 0, 0),
	// 		marbleBody1.position,
	// 	);

	// // Apply player 2 controls
	// if (PLAYER_2.DPAD.up)
	// 	marbleBody2.applyForce(
	// 		new CANNON.Vec3(0, 0, -params.speed),
	// 		marbleBody2.position,
	// 	);
	// if (PLAYER_2.DPAD.down)
	// 	marbleBody2.applyForce(
	// 		new CANNON.Vec3(0, 0, params.speed),
	// 		marbleBody2.position,
	// 	);
	// if (PLAYER_2.DPAD.left)
	// 	marbleBody2.applyForce(
	// 		new CANNON.Vec3(-params.speed, 0, 0),
	// 		marbleBody2.position,
	// 	);
	// if (PLAYER_2.DPAD.right)
	// 	marbleBody2.applyForce(
	// 		new CANNON.Vec3(params.speed, 0, 0),
	// 		marbleBody2.position,
	// 	);

// 	// Sync Three.js meshes with Cannon-es bodies
// 	marbleMesh1.position.copy(marbleBody1.position);
// 	marbleMesh1.quaternion.copy(marbleBody1.quaternion);

// 	marbleMesh2.position.copy(marbleBody2.position);
// 	marbleMesh2.quaternion.copy(marbleBody2.quaternion);

// 	// Check for fallen marbles
// 	checkFallen();

// 	renderer.render(scene, camera);
// 	requestAnimationFrame(update);
// }

// update();
