const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)

import Renderer from './classes/Renderer.class.js'
import Scene from './classes/Scene.class.js'
import Chords from './classes/Chords.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Scene()
	new Chords()
 	render()
}

function render() {
	STORAGE.SceneClass.animate()
	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
	requestAnimationFrame(render)
}
