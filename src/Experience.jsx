import { Physics } from "@react-three/rapier";
import React from "react";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {
	const blocksCount = useGame((state) => state.blocksCount);
	const blocksSeed = useGame((state) => state.blocksSeed);

	return (
		<>
			<color args={["#bdedfc"]} attach="background" />

			<Physics>
				<Lights />
				<Level count={blocksCount} seed={blocksSeed} />
				<Player />
			</Physics>
		</>
	);
}
