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
import SceneObject from './classes/SceneObject.class.js'
import SceneShader from './classes/SceneShader.class.js'
import Chords from './classes/Chords.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Box()
	new SceneObject()
	new SceneShader()
	new SceneManager()
	new Ambiance()
	setTimeout(()=>{new Chords()}, 6000)
 	render()
}

function render() {
	STORAGE.SceneObjectClass.animate()
	STORAGE.SceneShaderClass.animate()
	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
	requestAnimationFrame(render)
}
