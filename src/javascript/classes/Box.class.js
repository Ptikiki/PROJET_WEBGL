import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

class Box {

    constructor(options) {
      STORAGE.BoxClass = this
      this.init()
      this.bind()

      this.box
      this.boxOpened

      this.openIsImpossible = false

      this.scene
      this.wall
      this.artist
      this.myShaders

      this.index

      this.shaderDownPosY
      this.shaderUpPosY
      this.sceneDownPosY
      this.sceneUpPosY
      this.artistDownPosY
      this.artistUpPosY
    }

    init() {
      this.createBox()
    }

    createBox() {
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
      if ( STORAGE.SceneObjectClass.myObjects[0] ) {
        this.box = STORAGE.BoxClass.object
        this.boxOpened = STORAGE.chordsClass.boxIsOpen

        this.scene = STORAGE.SceneObjectClass.myObjects[0]
        this.wall = STORAGE.SceneObjectClass.myObjects[1]
        this.artist = STORAGE.SceneObjectClass.myObjects[2]
        this.myShaders = STORAGE.SceneShaderClass.myShaders[0]

        this.index = STORAGE.SceneManager.actualSceneIndex

        this.shaderDownPosY = specifications[this.index].shaderDownPosY
        this.shaderUpPosY = specifications[this.index].shaderUpPosY
        this.sceneDownPosY = specifications[this.index].sceneDownPosY
        this.sceneUpPosY = specifications[this.index].sceneUpPosY
        this.artistDownPosY = specifications[this.index].artistDownPosY
        this.artistUpPosY = specifications[this.index].artistUpPosY

        if (!this.openIsImpossible) {
          if (step === 0) {
            this.openBoxToStep0()
          } else if (step === 1 && !this.boxOpened) {
            this.openBoxToStep1()
          } else if (step === 1 && this.boxOpened) {
            this.openBoxToStep0()
            this.openIsImpossible = true
            setTimeout(() => {
              this.openIsImpossible = false
              this.openBox(STORAGE.chordsClass.step)
            }, 1000)
          } else if (step === 2 && !this.boxOpened) {
            this.openBoxToStep2()
          }  else if (step === 3 && !this.boxOpened) {
            this.openBoxToStep3()
          }
        }
     }
  }

  openBoxToStep0() {
    TweenLite.to(this.box.rotation, 0.6, { x : 0, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.6, { x : 0, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.8, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.8, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShaders.position, 0.8, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep1() {
    TweenLite.to(this.box.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.8, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.8, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShaders.position, 0.8, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep2() {
    TweenLite.to(this.box.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.8, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.8, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShaders.position, 0.8, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep3() {
    TweenLite.to(this.box.rotation, 1.5, { x : -Math.PI / 2, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 1.5, { x : -Math.PI / 2, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 1.2, { y : this.sceneUpPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 1.2, { y : this.artistUpPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShaders.position, 0.8, { y : this.shaderUpPosY, ease: Power2.easeOut })
  }

}

export default Box
