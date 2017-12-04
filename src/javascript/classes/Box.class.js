import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'
import chordsDatas from '../datas/chordsDatas.js'

class Box {

    constructor(options) {
      STORAGE.BoxClass = this
      this.box
      this.boxOpened

      this.openIsImpossible = false

      this.scene
      this.wall
      this.artist
      this.myShadersOnScene

      this.index

      this.shaderDownPosY
      this.shaderUpPosY
      this.sceneDownPosY
      this.sceneUpPosY
      this.artistDownPosY
      this.artistUpPosY

      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()

      this.init()
      this.bind()
    }

    init() {
      this.createBox()
    }

    createBox() {
      let that = this

      that.objLoader.load( 'assets/scenes/box/closed-box_base.obj', function ( object ) {
        object.rotation.y = Math.PI
        object.name = 'base_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 100
          }
        })
        STORAGE.box = object
        STORAGE.scene.add( object )
      } )

      that.objLoader.load( 'assets/scenes/box/closed-box_couvercle.obj', function ( object ) {
        object.position.z = -285
        object.position.y = 170
        object.rotation.y = Math.PI
        object.name = 'couvercle_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 100
          }
        })

        STORAGE.boxCouvercle = object
        that.object = object
        STORAGE.scene.add( object )
      })

      that.objLoader.load( 'assets/scenes/box/manivelle.obj', function ( object ) {
        object.rotation.y = Math.PI
        object.name = 'manivelle_boite'

        object.position.x = 270
        object.position.y = 100
        object.position.z = -100

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 50
          }
        })
        STORAGE.boxManivelle = object
        STORAGE.scene.add( object )
      })
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

        this.scene = STORAGE.SceneObjectClass.myObjects[STORAGE.SceneObjectClass.myObjects.length - 3]
        this.wall = STORAGE.SceneObjectClass.myObjects[STORAGE.SceneObjectClass.myObjects.length - 2]
        this.artist = STORAGE.SceneObjectClass.myObjects[STORAGE.SceneObjectClass.myObjects.length - 1]
        this.myShadersOnScene = STORAGE.SceneShaderClass.myShadersOnScene[STORAGE.SceneShaderClass.myShadersOnScene.length - 1]

        this.index = STORAGE.SceneManager.actualSceneIndex

        this.shaderDownPosY = specifications[this.index].shaderDownPosY
        this.shaderUpPosY = specifications[this.index].shaderUpPosY
        this.sceneDownPosY = specifications[this.index].sceneDownPosY
        this.sceneUpPosY = specifications[this.index].sceneUpPosY
        this.artistDownPosY = specifications[this.index].artistDownPosY
        this.artistUpPosY = specifications[this.index].artistUpPosY

        console.log(step)
        console.log(this.boxOpened)
        console.log(this.openIsImpossible)

        if (!this.boxOpened && !this.openIsImpossible) {
          if (step === 0) {
            this.openBoxToStep0()
          } else if (step === 1) {
            this.openBoxToStep1()
          } else if (step === 2) {
            this.openBoxToStep2()
          }  else if (step === 3) {
            this.openBoxToStep3()
          }
        } else {
          this.openIsImpossible = true
          this.openBoxToStep0()
          STORAGE.chordsClass.setLetters(0)
          STORAGE.chordsClass.setArtistName()
          STORAGE.chordsClass.setSongName()
          STORAGE.AmbianceClass.updateAmbiance(0, chordsDatas, 0)
          setTimeout(() => {
           this.openIsImpossible = false
         }, 650)
        }
     }
  }

  openBoxToStep0() {
    TweenLite.to(this.box.rotation, 0.5, { x : 0, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.5, { x : 0, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.6, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.6, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.6, { y : this.shaderDownPosY, ease: Power2.easeOut })

    STORAGE.InterfaceClass.showHelpButton()
    STORAGE.InterfaceClass.hideBilleterieButton()
    STORAGE.InterfaceClass.showLibraryButton()
  }

  openBoxToStep1() {
    TweenLite.to(this.box.rotation, 0.4, { x : -Math.PI / 50, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.4, { x : -Math.PI / 50, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.4, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.4, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.4, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep2() {
    TweenLite.to(this.box.rotation, 0.4, { x : -Math.PI / 20, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.4, { x : -Math.PI / 20, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.4, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.4, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.4, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep3() {
    TweenLite.to(this.box.rotation, 1.2, { x : -Math.PI / 1.8, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 1.2, { x : -Math.PI / 1.8, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 1, { y : this.sceneUpPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 1, { y : this.artistUpPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.8, { y : this.shaderUpPosY, ease: Power2.easeOut })

    STORAGE.InterfaceClass.hideHelpButton()
    STORAGE.InterfaceClass.showBilleterieButton()
    STORAGE.InterfaceClass.hideLibraryButton()
  }

  animate() {
    STORAGE.boxManivelle.rotation.x += 0.06
  }

}

export default Box
