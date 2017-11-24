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
                        console.log('ALL LOADED')
                        new Chords()
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
        this.mtlLoader.load('assets/NEW/Orelsan/orelsan_base-scene5.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let poisMaterial = matl.materials.Pois
          let poisTexture = that.textureLoader.load("assets/pois.png", () => {
            poisTexture.wrapS = THREE.RepeatWrapping
            poisTexture.wrapT = THREE.RepeatWrapping
            poisTexture.repeat.set(10, 10)
            poisMaterial.map = poisTexture

            that.objLoader.load( 'assets/NEW/Orelsan/orelsan_base-scene5.obj', function ( object ) {
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
        this.objLoader.load( 'assets/scene_riles.obj', function ( object ) {

          object.position.x = 0
          object.position.y = specifications[1].sceneDownPosY
          object.position.z = 0
          object.name = 'scene'

          that.scenesTab.push(object)
          resolve()
        } )
      })
    }

    loadPetitBiscuitScene() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/NEW/Petit-biscuit/petitbiscuit_base-scene.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/NEW/Petit-biscuit/petitbiscuit_base-scene.obj', function ( object ) {
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

    loadOrelsanWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/NEW/Orelsan/orelsan_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let briquesMurMaterial = matl.materials['Briques rectangles']
          that.textureLoader.load("assets/NEW/Orelsan/textures/color_brick.png", (briques) => {
            briques.wrapS = THREE.RepeatWrapping
            briques.wrapT = THREE.RepeatWrapping
            briques.repeat.set(5, 5)
            briquesMurMaterial.map = briques
            briquesMurMaterial.shininess = 5

            that.objLoader.load( 'assets/NEW/Orelsan/orelsan_mur.obj', function ( object ) {
              object.position.x = 0
              object.position.y = 165
              object.position.z = -280
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
        this.mtlLoader.load('assets/NEW/Orelsan/orelsan_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let briquesMaterial = matl.materials['Briques rectangles']
          let briquesTexture = that.textureLoader.load("assets/NEW/Orelsan/textures/color_brick.png", () => {
            briquesTexture.wrapS = THREE.RepeatWrapping
            briquesTexture.wrapT = THREE.RepeatWrapping
            briquesTexture.repeat.set(5, 5)
            briquesMaterial.map = briquesTexture
            briquesMaterial.shininess = 5

            that.objLoader.load( 'assets/NEW/Orelsan/orelsan_mur.obj', function ( object ) {
              object.position.x = 0
              object.position.y = 165
              object.position.z = -280
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

    loadPetitBiscuitWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/NEW/Petit-biscuit/petitbiscuit_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/NEW/Petit-biscuit/petitbiscuit_mur.obj', function ( object ) {
            object.position.x = 0
            object.position.y = 165
            object.position.z = -280
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
        this.mtlLoader.load('assets/test_perso/orelsan/orelsan_v2_baker.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let bodyMaterial = matl.materials.orelsan
          let bodyTexture = that.textureLoader.load("assets/test_perso/orelsan/orelsanSurface_Color2.png", () => {
            bodyMaterial.map = bodyTexture
            bodyMaterial.shininess = 5
            bodyMaterial.needsUpdate = true

            that.objLoader.load( 'assets/test_perso/orelsan/orelsan_v2_baker.obj', function ( object ) {
              object.position.y = -85
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

    loadMlleKArtist() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/test_perso/orelsan/orelsan_v2_baker.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let bodyMaterial = matl.materials.orelsan
          let bodyTexture = that.textureLoader.load("assets/test_perso/orelsan/orelsanSurface_Color2.png", () => {
            bodyMaterial.map = bodyTexture
            bodyMaterial.shininess = 5
            bodyMaterial.needsUpdate = true

            that.objLoader.load( 'assets/test_perso/orelsan/orelsan_v2_baker.obj', function ( object ) {
              object.position.y = -85
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
        this.mtlLoader.load('assets/test_perso/orelsan/orelsan_v2_baker.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let bodyMaterial = matl.materials.orelsan
          let bodyTexture = that.textureLoader.load("assets/test_perso/orelsan/orelsanSurface_Color2.png", () => {
            bodyMaterial.map = bodyTexture
            bodyMaterial.shininess = 5
            bodyMaterial.needsUpdate = true

            that.objLoader.load( 'assets/test_perso/orelsan/orelsan_v2_baker.obj', function ( object ) {
              object.position.y = -85
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
      this.myObjects = []
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
      STORAGE.scene.add( this.scenesTab[2] )
      STORAGE.scene.add(this.wallsTab[2])
      STORAGE.scene.add(this.artistsTab[2])
      this.myObjects.push( this.scenesTab[2], this.wallsTab[2], this.artistsTab[2] )
    }

    animate() {
      if ( this.myObjects[2] ) {
        // this.myObjects[2].rotation.y += 0.01
      }
    }
}

export default SceneObject
