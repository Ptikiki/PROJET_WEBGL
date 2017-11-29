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
        this.mtlLoader.load('assets/NEW/Orelsan/orelsan_base-scene2.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let poisMaterial = matl.materials['Pois']
          that.textureLoader.load("assets/NEW/Orelsan/textures/color_bande.png", (pois) => {
              pois.wrapS = THREE.RepeatWrapping
              pois.wrapT = THREE.RepeatWrapping
              pois.repeat.set(1, 1)
              poisMaterial.map = pois
              poisMaterial.shininess = 1
              that.objLoader.load( 'assets/NEW/Orelsan/orelsan_base-scene2.obj', function ( object ) {
                object.position.x = 0
                object.position.y = specifications[0].sceneDownPosY
                object.position.z = 0
                object.rotation.y = Math.PI
                object.name = 'scene'
                that.scenesTab.push(object)

                console.log("pois material", poisMaterial)
                console.log("pois texture", pois)

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
        this.mtlLoader.load('assets/NEW/Mlle-k/mademoisellek_base-scene.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let leatherMaterial = matl.materials.Cuir
          let leatherTexture = that.textureLoader.load("assets/NEW/Mlle-k/tex/leather.jpg", () => {
            leatherTexture.wrapS = THREE.RepeatWrapping
            leatherTexture.wrapT = THREE.RepeatWrapping
            leatherTexture.repeat.set(2, 2)
            leatherMaterial.map = leatherTexture

            that.objLoader.load( 'assets/NEW/Mlle-k/mademoisellek_base-scene.obj', function ( object ) {
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
        this.mtlLoader.load('assets/NEW/Orelsan/orelsan_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let briquesMurMaterial = matl.materials['Briques rectangles']
          that.textureLoader.load("assets/NEW/Orelsan/textures/color_brick.png", (briques) => {
            briques.wrapS = THREE.RepeatWrapping
            briques.wrapT = THREE.RepeatWrapping
            briques.repeat.set(1.3, 1.3)
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
        this.mtlLoader.load('assets/NEW/Mlle-k/mademoisellek_mur.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/NEW/Mlle-k/mademoisellek_mur.obj', function ( object ) {
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
              object.position.y =  specifications[1].artistDownPosY
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

          console.log("MATERIAUX", matl)

          let bodyMaterial = matl.materials.Body
          let bottomsMaterial = matl.materials.Bottoms
          let hairMaterial = matl.materials.Hair
          let shoesMaterial = matl.materials.Shoes
          let topsMaterial = matl.materials.Tops
          let eyesMaterial = matl.materials.eyes

          let bodyTexture = that.textureLoader.load("assets/persos/petit-biscuit/BodySurface_Color.png", () => {
            bodyMaterial.map = bodyTexture
            bodyMaterial.shininess = 5
          let bottomsTexture = that.textureLoader.load("assets/persos/petit-biscuit/BottomsSurface_Color.png", () => {
            bottomsMaterial.map = bottomsTexture
            bottomsMaterial.shininess = 5
          let hairTexture = that.textureLoader.load("assets/persos/petit-biscuit/HairSurface_Color.png", () => {
            hairMaterial.map = hairTexture
            hairMaterial.shininess = 5
          let shoesTexture = that.textureLoader.load("assets/persos/petit-biscuit/ShoesSurface_Color.png", () => {
            shoesMaterial.map = shoesTexture
            shoesMaterial.shininess = 5
          let topsTexture = that.textureLoader.load("assets/persos/petit-biscuit/TopsSurface_Color.png", () => {
            topsMaterial.map = topsTexture
            topsMaterial.shininess = 5
          let eyesTexture = that.textureLoader.load("assets/persos/petit-biscuit/eyesSurface_Color.png", () => {
            eyesMaterial.map = eyesTexture
            eyesMaterial.shininess = 5

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
          })})})})})})
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
