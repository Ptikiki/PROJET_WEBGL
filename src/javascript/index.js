const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

const Spotify = require('spotify-web-api-js')

import './vendors/HorizontalBlurShader'
import './vendors/VerticalBlurShader'

import Renderer from './classes/Renderer.class.js'
import Ambiance from './classes/Ambiance.class.js'
import Box from './classes/Box.class.js'
import Particles from './classes/Particles.class.js'
import SceneManager from './classes/SceneManager.class.js'
import SceneObject from './classes/SceneObject.class.js'
import SceneShader from './classes/SceneShader.class.js'
import Audio from './classes/Audio.class.js'
import SpotifyAPIService from './classes/SpotifyAPIService.class.js'
import Interface from './classes/Interface.class.js'

window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Audio()
	new SpotifyAPIService()
	new Renderer()

	new Interface()

	new Box()
	new Particles()
	new SceneShader()
	new SceneObject()
	new SceneManager()
	new Ambiance()

 	render()
}

function render() {
	STORAGE.ParticlesClass.animate()
	STORAGE.SceneObjectClass.animate()
	STORAGE.SceneShaderClass.animate()
	STORAGE.RendererClass.updateCamera()
	if (!STORAGE.InterfaceClass.interfaceIsBlurred) {
		STORAGE.RendererClass.render()
	} else {
		STORAGE.RendererClass.renderComposer()
	}
	if (STORAGE.chordsClass && STORAGE.chordsClass.boxIsOpen) {
		STORAGE.AudioClass.animate(STORAGE.chordsClass.currentSongPlayingIndex, STORAGE.chordsClass.currentChord)
	}
	requestAnimationFrame(render)
}
