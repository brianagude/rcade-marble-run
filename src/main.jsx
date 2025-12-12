import "./style.css";
import { PLAYER_1, SYSTEM } from "@rcade/plugin-input-classic";
import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React from "react";
import ReactDOM from "react-dom/client";

function Ball() {
	const ballRef = React.useRef();
	const gameStartedRef = React.useRef(false);

	useFrame((state, delta) => {
		if (!ballRef.current) return;

		// Check for start
		if (!gameStartedRef.current) {
			if (SYSTEM.ONE_PLAYER || SYSTEM.TWO_PLAYER) {
				gameStartedRef.current = true;
				console.log("Game started!");
			}
			return;
		}

		// Apply controls
		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };

		const impulseStrength = 0.6 * delta;
		const torqueStrength = 0.2 * delta;

		if (PLAYER_1.DPAD.up) {
			impulse.z -= impulseStrength;
			torque.x -= torqueStrength;
			console.log('up')
		}
		if (PLAYER_1.DPAD.down) {
			impulse.z += impulseStrength;
			torque.x += torqueStrength;
			console.log('down')
		}
		if (PLAYER_1.DPAD.left) {
			impulse.x -= impulseStrength;
			torque.z += torqueStrength;
			console.log('left')
		}
		if (PLAYER_1.DPAD.right) {
			impulse.x += impulseStrength;
			torque.z -= torqueStrength;
			console.log('right')
		}

		// Access the Rapier rigid body correctly
		ballRef.current.applyImpulse(impulse, true);
		ballRef.current.applyTorqueImpulse(torque, true);
	});

	return (
		<RigidBody
			ref={ballRef}
			position={[0, 2, 0]}
			colliders="ball"
			restitution={0.2}
			friction={1}
			linearDamping={0.5}
			angularDamping={0.5}
		>
			<mesh castShadow>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>
		</RigidBody>
	);
}

function Floor() {
	return (
		<RigidBody type="fixed">
			<mesh receiveShadow position={[0, -0.5, 0]}>
				<boxGeometry args={[10, 1, 10]} />
				<meshStandardMaterial color="limegreen" />
			</mesh>
		</RigidBody>
	);
}

function Scene() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} castShadow />

			<Physics>
				<Ball />
				<Floor />
			</Physics>
		</>
	);
}

const root = ReactDOM.createRoot(document.querySelector("#app"));

root.render(
	<Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
		<Scene />
	</Canvas>,
);
