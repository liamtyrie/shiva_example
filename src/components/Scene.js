import { Canvas } from "@react-three/fiber"
import Background from "./Background"

export default function Scene() {
	return (
		<Canvas
			style={{ height: "100vh", width: "100vw" }}
			camera={{ position: [0, 0, 2] }}
		>
			<Background />
		</Canvas>
	)
}
