import { useMemo, useState, useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { BACKGROUND_SHADERS } from "../lib/shaders/background"

export default function Background() {
	const [gradientPosition, setGradientPosition] = useState(300)

	const [mouseMove, setMouseMove] = useState(false)

	useEffect(() => {
		let timeoutId

		function handleMouseMove() {
			setMouseMove(true)
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				setMouseMove(false)
			}, 10) // Adjust this value as needed (e.g., 500 milliseconds)
		}

		// Add event listener for mousemove
		window.addEventListener("mousemove", handleMouseMove)

		// Cleanup function to remove event listener
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			clearTimeout(timeoutId)
		}
	}, [])

	console.log(gradientPosition)
	const uniforms = useMemo(() => {
		return {
			uTime: { value: 10 },
			uColor: {
				value: [
					new THREE.Color("rgba(0,0,0,1)"),
					new THREE.Color("rgba(0,0,0,1)"),
					new THREE.Color("#00ffff"),
					new THREE.Color("#0000ff"),
				],
			},
		}
	}, [])

	console.log(mouseMove)

	useFrame(() => {
		uniforms.uTime.value += mouseMove === true ? 0.0009 : 0.00001
	}, [mouseMove])

	useEffect(() => {
		const conversionFactor = 360 / window.innerWidth

		const handleMouseMove = (e) => {
			const newPosition = Math.min(
				Math.max(e.clientX * conversionFactor, 300),
				700
			)
			setGradientPosition(newPosition)
		}

		window.addEventListener("mousemove", handleMouseMove)

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	})
	return (
		<>
			<mesh>
				<planeGeometry args={[8, 8, 300, 800]} />
				<shaderMaterial
					vertexShader={BACKGROUND_SHADERS.vertex}
					fragmentShader={BACKGROUND_SHADERS.fragment}
					uniforms={uniforms}
				/>
			</mesh>
		</>
	)
}
