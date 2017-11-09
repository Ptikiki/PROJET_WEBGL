const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')


import Renderer from './classes/Renderer.class.js'
import Ambiance from './classes/Ambiance.class.js'
import Box from './classes/Box.class.js'
import SceneManager from './classes/SceneManager.class.js'
import OrelsanScene from './classes/OrelsanScene.class.js'
import MlleKScene from './classes/MlleKScene.class.js'
import PetitBiscuitScene from './classes/PetitBiscuitScene.class.js'
import SceneObject from './classes/SceneObject.class.js'
import Chords from './classes/Chords.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Box()

	// new OrelsanScene()
	// new MlleKScene()
	// new PetitBiscuitScene()
	new SceneObject()
	new SceneManager()
	new Ambiance()
	new Chords()
 	render()
}

function render() {
	STORAGE.SceneObjectClass.animate()
	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
	requestAnimationFrame(render)
}
