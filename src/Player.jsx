// import { useKeyboardControls } from "@react-three/drei";

import { PLAYER_1, PLAYER_2, SYSTEM } from "@rcade/plugin-input-classic";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame.jsx";

export default function Player() {
	const body = useRef();
	// const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();
	const [smoothedCameraPosition] = useState(
		() => new THREE.Vector3(10, 10, 10),
	);
	const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
	const start = useGame((state) => state.start);
	const end = useGame((state) => state.end);
	const restart = useGame((state) => state.restart);
	const blocksCount = useGame((state) => state.blocksCount);

	const app = document.querySelector("#app");
	app.innerHTML = `
		<div id="status">
			<p id="start-msg">1P or 2P START</p>
			<p id="title">marble run</p>
			<p id="author">by: briana gude</p>
		</div>
		<canvas id="three"></canvas>
	`;
	const status = document.querySelector("#status");

	const jump = () => {
		const origin = body.current.translation();
		origin.y -= 0.31;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);

		if (hit.timeOfImpact < 0.15) {
			body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
		}
	};

	const reset = () => {
		body.current.setTranslation({ x: 0, y: 1, z: 0 });
		body.current.setLinvel({ x: 0, y: 0, z: 0 });
		body.current.setAngvel({ x: 0, y: 0, z: 0 });
	};

	useEffect(() => {
		const unsubscribeReset = useGame.subscribe(
			(state) => state.phase,
			(value) => {
				if (value === "ready") reset();
			},
		);

		// const unsubscribeJump = subscribeKeys(
		// 	(state) => state.jump,
		// 	(value) => {
		// 		if (value) jump();
		// 	},
		// );

		// const unsubscribeAny = subscribeKeys(() => {
		// 	start();
		// });

		return () => {
			unsubscribeReset();
			// unsubscribeJump();
			// unsubscribeAny();
		};
	}, []);

	function update() {
	if (!gameStarted) {
		if (SYSTEM.ONE_PLAYER || SYSTEM.TWO_PLAYER) {
			gameStarted = true;
			status.textContent = "Game Started!";
		}
		requestAnimationFrame(update);
		return;
	}

	status.style.display = "none";

	useFrame((state, delta) => {
		/**
		 * Controls
		 */
		// const { forward, backward, leftward, rightward } = getKeys();

		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };

		const impulseStrength = 0.6 * delta;
		const torqueStrength = 0.2 * delta;

		// if (forward) {
		// 	impulse.z -= impulseStrength;
		// 	torque.x -= torqueStrength;
		// }

		// if (rightward) {
		// 	impulse.x += impulseStrength;
		// 	torque.z -= torqueStrength;
		// }

		// if (backward) {
		// 	impulse.z += impulseStrength;
		// 	torque.x += torqueStrength;
		// }

		// if (leftward) {
		// 	impulse.x -= impulseStrength;
		// 	torque.z += torqueStrength;
		// }

			// Apply player 1 controls
		if (PLAYER_1.DPAD.up){
			impulse.z -= impulseStrength;
			torque.x -= torqueStrength;
		}

		if (PLAYER_1.DPAD.down){
			impulse.x += impulseStrength;
			torque.z -= torqueStrength;
		}

		if (PLAYER_1.DPAD.left){
			impulse.z += impulseStrength;
			torque.x += torqueStrength;
		}

		if (PLAYER_1.DPAD.right){
			impulse.x -= impulseStrength;
			torque.z += torqueStrength;
		}

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

		body.current.applyImpulse(impulse);
		body.current.applyTorqueImpulse(torque);

		/**
		 * Camera
		 */
		const bodyPosition = body.current.translation();

		const cameraPosition = new THREE.Vector3();
		cameraPosition.copy(bodyPosition);
		cameraPosition.z += 2.25;
		cameraPosition.y += 0.65;

		const cameraTarget = new THREE.Vector3();
		cameraTarget.copy(bodyPosition);
		cameraTarget.y += 0.25;

		smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
		smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

		state.camera.position.copy(smoothedCameraPosition);
		state.camera.lookAt(smoothedCameraTarget);

		/**
		 * Phases
		 */
		if (bodyPosition.z < -(blocksCount * 4 + 2)) end();

		if (bodyPosition.y < -4) restart();
	});

	return (
		<RigidBody
			ref={body}
			canSleep={false}
			colliders="ball"
			restitution={0.2}
			friction={1}
			linearDamping={0.5}
			angularDamping={0.5}
			position={[0, 1, 0]}
		>
			<mesh castShadow>
				<icosahedronGeometry args={[0.3, 1]} />
				<meshStandardMaterial flatShading color="mediumpurple" />
			</mesh>
		</RigidBody>
	);
}
