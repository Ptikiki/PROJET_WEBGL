const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)

import Renderer from './classes/Renderer.class.js'
import Scene from './classes/Scene.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Scene()
 	// render()
}

function render() {
	let that = STORAGE.SceneClass
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
}

