const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'
import Chords from './Chords.class.js'

class SceneObject {

    constructor(options) {
      STORAGE.SceneObjectClass = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()
      this.textureLoader = new THREE.TextureLoader()

      this.mtlLoader.manager = new THREE.LoadingManager()

      this.scenesTab = []
      this.wallsTab = []
      this.artistsTab = []

      this.init()
    }

    init() {
      this.loadOrelsanScene().then((response)=> {
        this.loadMlleKScene().then((response)=> {
          this.loadPetitBiscuitScene().then((response)=> {
            this.loadOrelsanWall().then((response)=> {
              this.loadMlleKWall().then((response)=> {
                this.loadPetitBiscuitWall().then((response)=> {
                  this.loadOrelsanArtist().then((response)=> {
                    this.loadMlleKArtist().then((response)=> {
                      this.loadPetitBiscuitArtist().then((response)=> {
                        console.log('ALL ASSETS LOADED')
                        STORAGE.InterfaceClass.removeLoader()
                      }).catch((error)=> { console.warn(error) })
                    }).catch((error)=> { console.warn(error) })
                  }).catch((error)=> { console.warn(error) })
                }).catch((error)=> { console.warn(error) })
          		}).catch((error)=> { console.warn(error) })
        		}).catch((error)=> { console.warn(error) })
      		}).catch((error)=> { console.warn(error) })
    		}).catch((error)=> { console.warn(error) })
      })
    }

    loadOrelsanScene() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Orelsan/orelsan_base-scene.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let siegesMaterial = matl.materials.siege
          let poisMaterial = matl.materials.pois
          siegesMaterial.shininess = 0

          let poisNormal = that.textureLoader.load('assets/scenes/Orelsan/textures/normal_bande.png', () => {
            poisNormal.wrapS = THREE.RepeatWrapping
            poisNormal.wrapT = THREE.RepeatWrapping
            poisNormal.repeat.set(10, 10)
            poisMaterial.normalMap = poisNormal

            that.objLoader.load( 'assets/scenes/Orelsan/orelsan_base-scene.obj', function ( object ) {
              object.position.x = 0
              object.position.y = specifications[0].sceneDownPosY
              object.position.z = 0
              object.rotation.y = Math.PI
              object.name = 'scene'
              that.scenesTab.push(object)

              object.traverse(function(o) {
                if (o.type === 'Mesh') {
                  o.receiveShadow = true
                  o.castShadow = true
                  o.material.shininess = 5
                }
              })
              resolve()
            })
          })
        })
      })
    }

    loadMlleKScene() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Mlle-k/mademoisellek_base-scene.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )
          that.objLoader.load( 'assets/scenes/Mlle-k/mademoisellek_base-scene.obj', function ( object ) {
            object.position.x = 0
            object.position.y = specifications[1].sceneDownPosY
            object.position.z = 0
            object.rotation.y = Math.PI
            object.name = 'scene'
            that.scenesTab.push(object)

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.receiveShadow = true
                o.castShadow = true
                o.material.shininess = 2
                o.material.reflectivity = 20
              }
            })
            resolve()
          })
        })
      })
    }

    loadPetitBiscuitScene() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Petit-biscuit/petitbiscuit_base-scene.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          /*let geometry = new THREE.SphereGeometry( 10, 50, 50 )
          let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
          let repere = new THREE.Mesh( geometry, material )
          repere.position.y = 250 //200 // 250
          repere.position.z = 70 //200 // -50 / 70

          STORAGE.scene.add( repere )*/

          that.plaquesMaterial = matl.materials.carreau
          that.plaquesMaterial.specular = new THREE.Color( 0x646464 )

          that.objLoader.load( 'assets/scenes/Petit-biscuit/petitbiscuit_base-scene.obj', function ( object ) {
            object.position.x = 0
            object.position.y = specifications[2].sceneDownPosY
            object.position.z = 0
            object.rotation.y = Math.PI
            object.name = 'scene'
            that.scenesTab.push(object)

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.receiveShadow = true
                o.castShadow = true
                o.material.shininess = 2
                o.material.reflectivity = 20
              }
            })
            resolve()
          })
        })
      })
    }

    loadOrelsanWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Orelsan/orelsan_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let briquesMaterial = matl.materials.brique
          let briquesNormal = that.textureLoader.load('assets/scenes/Orelsan/textures/normal_brick.png', () => {
            briquesNormal.wrapS = THREE.RepeatWrapping
            briquesNormal.wrapT = THREE.RepeatWrapping
            briquesNormal.repeat.set(5, 6)
            briquesMaterial.normalMap = briquesNormal
            briquesMaterial.normalScale = new THREE.Vector2( 0.7, 0.7 )
            briquesMaterial.shininess = 10

            that.objLoader.load( 'assets/scenes/Orelsan/orelsan_mur.obj', function ( object ) {
              object.position.x = 0
              object.position.y = 165
              object.position.z = -292
              object.rotation.y = Math.PI
              object.name = 'wall'

              object.traverse(function(o) {
                if (o.type === 'Mesh') {
                  o.receiveShadow = true
                  o.castShadow = true
                }
              })

              that.wallsTab.push(object)
              resolve()
            })
          })
        })
      })
    }

    loadMlleKWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Mlle-k/mademoisellek_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          // that.metalMaterial = matl.materials.Metal
          //
          // that.cubeCameraMadK = new THREE.CubeCamera( 0.1, 5000, 512 )
          // that.cubeCameraMadK.position.y = 700
          // that.cubeCameraMadK.position.z = -300
          // STORAGE.scene.add( that.cubeCameraMadK )
          //
          // that.metalMaterial.envMap = that.cubeCameraMadK.renderTarget
          // that.metalMaterial.needsUpdate = true

          that.objLoader.load( 'assets/scenes/Mlle-k/mademoisellek_mur.obj', function ( object ) {

            object.position.x = 0
            object.position.y = 165
            object.position.z = -292
            object.rotation.y = Math.PI
            object.name = 'wall'

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.receiveShadow = true
                o.castShadow = true
                o.material.shininess = 2
              }
            })

            that.wallsTab.push(object)
            resolve()
          })
        })
      })
    }

    loadPetitBiscuitWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scenes/Petit-biscuit/petitbiscuit_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/scenes/Petit-biscuit/petitbiscuit_mur.obj', function ( object ) {
            object.position.x = 0
            object.position.y = 165
            object.position.z = -292
            object.rotation.y = Math.PI
            object.name = 'wall'

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.receiveShadow = true
                o.castShadow = true
                o.material.shininess = 2
                if (o.name === 'Écran_géant') {
                  STORAGE.ecranGeant = o
                }
              }
            })

            that.wallsTab.push(object)
            resolve()
          })
        })
      })
    }

    loadOrelsanArtist() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/persos/orelsan/model_orelsan.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          // let bodyMaterial = matl.materials.orelsan
          // let bodyTexture = that.textureLoader.load("assets/persos/orelsan/orelsanSurface_Color2.png", () => {
          //   bodyMaterial.map = bodyTexture
          //   bodyMaterial.shininess = 5
          //   bodyMaterial.needsUpdate = true

            that.objLoader.load( 'assets/persos/orelsan/model_orelsan.obj', function ( object ) {
              object.position.y = specifications[0].artistDownPosY
              object.name = 'artist'

              object.traverse(function(o) {
                if (o.type === 'Mesh') {
                  o.castShadow = true
                }
              })

              that.artistsTab.push(object)
              resolve()
            })
          //})
        })
      })
    }

    loadMlleKArtist() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/persos/mademoiselle-k/MademoiselleK_Guitar_Playing.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let guitareMaterial = matl.materials.Tortoise
          let guitareTexture = that.textureLoader.load('assets/persos/mademoiselle-k/tortoise.jpg', () => {
            guitareMaterial.map = guitareTexture
            guitareMaterial.shininess = 5

            that.objLoader.load( 'assets/persos/mademoiselle-k/MademoiselleK_Guitar_Playing.obj', function ( object ) {
              object.position.y = specifications[1].artistDownPosY
              object.name = 'artist'

              object.traverse(function(o) {
                if (o.type === 'Mesh') {
                  o.castShadow = true
                }
              })

              that.artistsTab.push(object)
              resolve()
            })
          })
        })
      })
    }

    loadPetitBiscuitArtist() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/persos/petit-biscuit/petitbiscuit.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/persos/petit-biscuit/petitbiscuit.obj', function ( object ) {
            object.position.y =  specifications[2].artistDownPosY
            object.position.z = -10
            object.name = 'artist'

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.castShadow = true
              }
            })
            that.artistsTab.push(object)
            resolve()
          })

        })
      })
    }

    removeScene() {
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'scene' ? STORAGE.scene.remove(child) : ''
      })
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'wall' ? STORAGE.scene.remove(child) : ''
      })
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'artist' ? STORAGE.scene.remove(child) : ''
      })
      STORAGE.scene.remove( this.cubeCameraPetitBiscuit )
      this.cubeCameraPetitBiscuit = null
      this.plaquesMaterial.envMap = null
      this.myObjects = []
    }

    removeSceneSkiped(length) {
      if (this.myObjects.length > 3) {
        STORAGE.scene.remove( this.cubeCameraPetitBiscuit )
        this.cubeCameraPetitBiscuit = null
        this.plaquesMaterial.envMap = null
        let tableToErase = this.myObjects.slice(0, this.myObjects.length - 3)
        tableToErase.forEach((el)=> {
          STORAGE.scene.remove(el)
        })
      }
    }

    displayOrelsan() {
      STORAGE.scene.add(this.scenesTab[0])
      STORAGE.scene.add(this.wallsTab[0])
      STORAGE.scene.add(this.artistsTab[0])
      this.myObjects.push(this.scenesTab[0], this.wallsTab[0], this.artistsTab[0])
    }

    displayMlleK() {
      STORAGE.scene.add( this.scenesTab[1] )
      STORAGE.scene.add(this.wallsTab[1])
      STORAGE.scene.add(this.artistsTab[1])
      this.myObjects.push( this.scenesTab[1], this.wallsTab[1], this.artistsTab[1] )
    }

    displayPetitBiscuit() {
      this.cubeCameraPetitBiscuit = new THREE.CubeCamera( 0.1, 2000, 512 )
      this.cubeCameraPetitBiscuit.position.y = 250 //200 // 250
      this.cubeCameraPetitBiscuit.position.z = 70 //200 // -50 / 70

      this.plaquesMaterial.envMap = this.cubeCameraPetitBiscuit.renderTarget
      this.plaquesMaterial.needsUpdate = true

      STORAGE.scene.add( this.scenesTab[2] )
      STORAGE.scene.add(this.wallsTab[2])
      STORAGE.scene.add(this.artistsTab[2])
      STORAGE.scene.add( this.cubeCameraPetitBiscuit )
      this.myObjects.push( this.scenesTab[2], this.wallsTab[2], this.artistsTab[2] )
    }

    animate() {
      if (this.metalMaterial && this.cubeCameraMadK) {
        this.metalMaterial.visible = false
        this.cubeCameraMadK.update( STORAGE.renderer, STORAGE.scene )
        this.metalMaterial.visible = true
      }

      if (this.plaquesMaterial && this.cubeCameraPetitBiscuit) {
        this.plaquesMaterial.visible = false
        this.cubeCameraPetitBiscuit.update( STORAGE.renderer, STORAGE.scene )
        this.plaquesMaterial.visible = true
      }

      if ( this.myObjects[2] ) {
        // this.myObjects[2].rotation.y += 0.01
      }
    }
}

export default SceneObject
