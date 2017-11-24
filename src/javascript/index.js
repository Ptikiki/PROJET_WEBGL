const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

const Spotify = require('spotify-web-api-js')

import Renderer from './classes/Renderer.class.js'
import Ambiance from './classes/Ambiance.class.js'
import Box from './classes/Box.class.js'
import SceneManager from './classes/SceneManager.class.js'
import SceneObject from './classes/SceneObject.class.js'
import SceneShader from './classes/SceneShader.class.js'
import SpotifyAPIService from './classes/SpotifyAPIService.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Renderer()
	new Box()
	new SceneShader()
	new SceneObject()
	new SceneManager()
	new Ambiance()
	new SpotifyAPIService()

 	render()
}

function render() {
	STORAGE.SceneObjectClass.animate()
	STORAGE.SceneShaderClass.animate()
	STORAGE.RendererClass.animate()
	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
	requestAnimationFrame(render)
}
