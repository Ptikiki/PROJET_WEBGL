const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)

import Renderer from './classes/Renderer.class.js'
import Ambiance from './classes/Ambiance.class.js'
import OrelsanScene from './classes/OrelsanScene.class.js'
import MlleKScene from './classes/MlleKScene.class.js'
import PetitBiscuitScene from './classes/PetitBiscuitScene.class.js'
import Chords from './classes/Chords.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new OrelsanScene()
	new Ambiance()
	new Chords()
 	render()
}

function render() {
	STORAGE.SceneClass.animate()
	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
	requestAnimationFrame(render)
}
