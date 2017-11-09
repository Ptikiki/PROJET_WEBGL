import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

class Box {

    constructor(options) {
      STORAGE.BoxClass = this
      this.init()
      this.bind()
    }

    init() {
      this.createScene()
    }

    createScene() {
      let that = this

      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()

      this.mtlLoader.load('assets/base_boite.mtl', function(matl) {
        matl.preload()
        that.objLoader.setMaterials( matl )

        that.objLoader.load( 'assets/base_boite.obj', function ( object ) {
          object.rotation.y = Math.PI
          STORAGE.scene.add( object )
          object.name = 'base_boite'
        } )
      } )

      this.mtlLoader.load('assets/couvercle_boite.mtl', function(matl) {
        matl.preload()
        that.objLoader.setMaterials( matl )

        that.objLoader.load( 'assets/couvercle_boite.obj', function ( object ) {
          object.position.x = 205
          object.position.z = -285
          object.position.y = 75
          object.rotation.y = Math.PI
          STORAGE.scene.add( object )
          object.name = 'couvercle_boite'
          that.object = object
        } )
      } )
    }

    bind() {
      let that = this
      window.addEventListener('resize', that.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    openBox(step) {
      if ( STORAGE.SceneClass.myObjects[0] ) {
        let box = STORAGE.BoxClass.object
        let wall = STORAGE.SceneClass.myObjects[0]
        let scene = STORAGE.SceneClass.myObjects[1]
        let myShaders = STORAGE.SceneClass.myShaders[0]
        let index = STORAGE.SceneManager.actualSceneIndex
        if (step === 0) {
          TweenLite.to(box.rotation, 0.6, { x : 0, ease: Power2.easeOut })
          TweenLite.to(wall.position, 0.8, { y : -85, ease: Power2.easeOut })
          scene ? TweenLite.to(scene.position, 0.8, { y : -85, ease: Power2.easeOut }) : ''
          TweenLite.to(myShaders.position, 0.8, { y : specifications[index].shaderDownPosY, ease: Power2.easeOut })
        } else if (step === 1) {
          TweenLite.to(box.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut })
          TweenLite.to(wall.position, 0.8, { y : -85, ease: Power2.easeOut })
          scene ? TweenLite.to(scene.position, 0.8, { y : -85, ease: Power2.easeOut }) : ''
          TweenLite.to(myShaders.position, 0.8, { y : specifications[index].shaderDownPosY, ease: Power2.easeOut })
        } else if (step === 2) {
          TweenLite.to(box.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut })
          TweenLite.to(wall.position, 0.8, { y : -85, ease: Power2.easeOut })
          scene ? TweenLite.to(scene.position, 0.8, { y : -85, ease: Power2.easeOut }) : ''
          TweenLite.to(myShaders.position, 0.8, { y : specifications[index].shaderDownPosY, ease: Power2.easeOut })
        } else if (step === 3) {
          TweenLite.to(box.rotation, 1.5, { x : -Math.PI / 2, ease: Power2.easeOut })
          TweenLite.to(wall.position, 1.2, { y : 90, ease: Power2.easeOut })
          scene ? TweenLite.to(scene.position, 1.2, { y : 150, ease: Power2.easeOut }) : ''
          TweenLite.to(myShaders.position, 0.8, { y : specifications[index].shaderUpPosY, ease: Power2.easeOut })
        }
     }
  }
}

export default Box
