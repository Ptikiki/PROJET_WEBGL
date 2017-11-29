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
      this.myShadersOnScene

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

      // 303848

      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()

      that.objLoader.load( 'assets/NEW/box/closed-box_base2.obj', function ( object ) {
        object.rotation.y = Math.PI
        object.name = 'base_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material;
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 5
          }
        })
        STORAGE.box = object
        STORAGE.scene.add( object )
      } )

      that.objLoader.load( 'assets/NEW/box/box_couvercle.obj', function ( object ) {
        object.position.x = 205
        object.position.z = -285
        object.position.y = 165
        object.rotation.y = Math.PI
        object.name = 'couvercle_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material;
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 5
          }
        })

        STORAGE.boxCouvercle = object
        that.object = object
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

        this.scene = STORAGE.SceneObjectClass.myObjects[0]
        this.wall = STORAGE.SceneObjectClass.myObjects[1]
        this.artist = STORAGE.SceneObjectClass.myObjects[2]
        this.myShadersOnScene = STORAGE.SceneShaderClass.myShadersOnScene[0]

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
              console.log(STORAGE.chordsClass.step)
              this.openBox(STORAGE.chordsClass.step)
            }, 1000)
          } else if (step === 2) {
            console.log('jouvre a deux')
            this.openBoxToStep2()
          }  else if (step === 3) {
            console.log('jouvre a trois')
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
    TweenLite.to(this.myShadersOnScene.position, 0.5, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep1() {
    TweenLite.to(this.box.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.8, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.8, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.5, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep2() {
    TweenLite.to(this.box.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 0.8, { y : this.sceneDownPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 0.8, { y : this.artistDownPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 0.5, { y : this.shaderDownPosY, ease: Power2.easeOut })
  }

  openBoxToStep3() {
    TweenLite.to(this.box.rotation, 1.5, { x : -Math.PI / 1.8, ease: Power2.easeOut })
    this.wall ? TweenLite.to(this.wall.rotation, 1.5, { x : -Math.PI / 1.8, ease: Power2.easeOut }) : ''
    this.scene ? TweenLite.to(this.scene.position, 1.2, { y : this.sceneUpPosY, ease: Power2.easeOut }) : ''
    this.artist ? TweenLite.to(this.artist.position, 1.2, { y : this.artistUpPosY, ease: Power2.easeOut }) : ''
    TweenLite.to(this.myShadersOnScene.position, 1, { y : this.shaderUpPosY, ease: Power2.easeOut })
  }

}

export default Box
