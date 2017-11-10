const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

class SceneObject {

    constructor(options) {
      STORAGE.SceneObjectClass = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()
      this.textureLoader = new THREE.TextureLoader()

      this.scenesTab = []
      this.wallsTab = []
      this.artistsTab = []

      this.init()
    }

    init() {
      this.loadScenes()
      // this.loadWalls()
      // this.loadArtists()
      setTimeout(()=> { this.loadWalls() }, 200)
      setTimeout(()=> { this.loadArtists() }, 400)
    }

    loadScenes() {
      this.loadOrelsanScene()
      this.loadMlleKScene()
      this.loadPetitBiscuitScene()
    }

    loadWalls() {
      this.loadOrelsanWall()
      // this.loadMlleKWall()
      // this.loadPetitBiscuitWall()
    }

    loadArtists() {
      this.loadOrelsanArtist()
      // this.loadMlleKArtist()
      // this.loadPetitBiscuitArtist()

    }

    loadOrelsanScene() {
      let that = this
      this.mtlLoader.load('assets/scene_orelsan.mtl', function(matl) {
        matl.preload()
        that.objLoader.setMaterials( matl )

        let poisMaterial = matl.materials.Pois
        let poisTexture = that.textureLoader.load("assets/pois.png")
        let poisNormal = that.textureLoader.load("assets/pois_normal.png")

        poisTexture.wrapS = THREE.RepeatWrapping
        poisTexture.wrapT = THREE.RepeatWrapping
        poisTexture.repeat.set(10, 10)
        poisMaterial.map = poisTexture
        poisMaterial.normalMap = poisNormal

        that.objLoader.load( 'assets/scene_orelsan.obj', function ( object ) {

          object.position.x = 0
          object.position.y = specifications[0].sceneDownPosY
          object.position.z = 0
          object.name = 'scene'

          object.castShadow = false //default is false
          object.receiveShadow = true //default

          that.scenesTab.push(object)

          object.traverse(function(o) {
            if (o.type === 'Mesh') {
              o.receiveShadow = true
              o.castShadow = true
            }
          })
        } )
      } )
    }

    loadMlleKScene() {
      let that = this
      this.objLoader.load( 'assets/scene_riles.obj', function ( object ) {

        object.position.x = 0
        object.position.y = specifications[1].sceneDownPosY
        object.position.z = 0
        object.name = 'scene'

        that.scenesTab.push(object)
      } )
    }

    loadPetitBiscuitScene() {
      let that = this
      this.objLoader.load( 'assets/scene_riles.obj', function ( object ) {

        object.position.x = 0
        object.position.y = specifications[1].sceneDownPosY
        object.position.z = 0
        object.name = 'scene'

        that.scenesTab.push(object)
      } )
    }

    loadOrelsanWall() {
      let that = this
      this.mtlLoader.load('assets/mur_orelsan.mtl', function(matl) {
        matl.preload()

        console.log(matl)
        
        that.objLoader.setMaterials( matl )

        let briquesMaterial = matl.materials.Briques
        let briquesTexture = that.textureLoader.load("assets/briques.png")
        let briquesNormal = that.textureLoader.load("assets/briques_normal.png")

        briquesTexture.wrapS = THREE.RepeatWrapping
        briquesTexture.wrapT = THREE.RepeatWrapping
        briquesTexture.repeat.set(5, 5)
        briquesMaterial.map = briquesTexture
        briquesMaterial.normalMap = briquesNormal

        that.objLoader.load( 'assets/mur_orelsan.obj', function ( object ) {
          object.position.x = 205
          object.position.y = 80
          object.position.z = -280
          object.rotation.y = Math.PI
          object.name = 'wall'

          object.traverse(function(o) {
            if (o.type === 'Mesh') {
              o.receiveShadow = true
              o.castShadow = true
              console.log(o)
            }
          })

          that.wallsTab.push(object)
        } )
      } )
    }

    loadOrelsanArtist() {
      let that = this
      this.mtlLoader.load('assets/test_perso/model_test.mtl', function(matl) {
        matl.preload()
        that.objLoader.setMaterials( matl )

        let bodyMaterial = matl.materials.Body
        let bodyOpacity = that.textureLoader.load("assets/test_perso/model_test_Body_Opacity.png")
        let bodyTexture = that.textureLoader.load("assets/test_perso/model_test_Body_Diffuse.png")
        let bodyNormal = that.textureLoader.load("assets/test_perso/model_test_Body_Normal.png")
        let bodySpecular = that.textureLoader.load("assets/test_perso/model_test_Body_Specular.png")
        let bodyGloss = that.textureLoader.load("assets/test_perso/model_test_Body_Gloss.png")

        bodyMaterial.map = bodyOpacity
        bodyMaterial.normalMap = bodyNormal
        bodyMaterial.map = bodySpecular
        bodyMaterial.map = bodyGloss
        bodyMaterial.map = bodyTexture

        that.objLoader.load( 'assets/test_perso/model_test.obj', function ( object ) {
          object.position.y = -85
          object.name = 'artist'

          object.traverse(function(o) {
            if (o.type === 'Mesh') {
              o.castShadow = true
            }
          })

          that.artistsTab.push(object)
        } )
      } )
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
      this.myObjects.push( this.scenesTab[1] )
    }

    displayPetitBiscuit() {
      STORAGE.scene.add( this.scenesTab[2] )
      this.myObjects.push( this.scenesTab[2] )
    }

    animate() {
      if ( this.myObjects[2] ) {
        this.myObjects[2].rotation.y += 0.01
      }
    }
}

export default SceneObject
