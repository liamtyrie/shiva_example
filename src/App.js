import { useState, useEffect } from "react"
import Scene from "./components/Scene"
import "./App.css"

export const App = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [number, setNumber] = useState(100)

	useEffect(() => {
		function handleMouseMove(event) {
			setMousePosition({ x: event.clientX, y: event.clientY })
		}

		// Add event listener for mousemove
		window.addEventListener("mousemove", handleMouseMove)

		// Cleanup function to remove event listener
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, []) // Empty dependency array to ensure effect runs only once on mount

	useEffect(() => {
		function handleMouseMove(event) {
			// Calculate the new number based on the mouse position X
			const mouseX = event.clientX
			const newNumber = Math.max(1.0, Math.min(2, mouseX)) // Clamp between 10 and 360
			setNumber(newNumber)
		}

		// Add event listener for mousemove
		window.addEventListener("mousemove", handleMouseMove)

		// Cleanup function to remove event listener
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [])
	return (
		<>
			<div
				style={{
					backgroundImage: `radial-gradient(circle at ${mousePosition.x}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 10%, rgba(0,2,2,0.0) 80%)`,
					width: "100vw",
					height: "100vh",
					position: "fixed",
					zIndex: 3,
					opacity: 0.3,
				}}
			>
				{
					<svg width="100vw" height="100vh">
						<circle
							cx={mousePosition.x}
							cy={mousePosition.y}
							r={number}
							stroke="rgba(0,0,0,0.9)"
							fill="rgba(0,0,0,1)"
						/>
						{/* <svg
							viewBox="0 0 200 200"
							xmlns="http://www.w3.org/2000/svg"
							x={mousePosition.x - 1000}
							y={mousePosition.y}
						>
							<path
								fill="#000000"
								d="M34.1,-37.9C45.4,-31.1,56.8,-21.5,55.2,-12.4C53.5,-3.3,38.9,5.3,30.4,15.3C22,25.2,19.6,36.4,12,43.9C4.4,51.4,-8.6,55.3,-16.5,50.3C-24.4,45.3,-27.2,31.3,-33.7,19.7C-40.1,8.1,-50,-1.3,-51.5,-11.9C-53,-22.6,-46,-34.6,-36,-41.7C-26,-48.8,-13,-51,-0.8,-50C11.3,-49,22.7,-44.8,34.1,-37.9Z"
								transform={`translate(100 100), scale(2)`}
							/>
						</svg> */}
					</svg>
				}
			</div>
			<div
				className="grainy"
				style={{
					height: "100vh",
					width: "100vw",
					position: "absolute",
					zIndex: 4,
					opacity: 0.5,
				}}
			></div>
			<Scene />
		</>
	)
}

export default App
