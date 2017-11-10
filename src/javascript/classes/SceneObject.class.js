const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

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
      this.loadScenes().then((response)=> {
        this.loadWalls().then((response)=> {
          this.loadArtists()
    		})
    		.catch((error)=> {
    			console.warn(error);
    		});
  		})
  		.catch((error)=> {
  			console.warn(error);
  		});
    }

    loadScenes() {
      let promises = []
      promises.push(this.loadOrelsanScene(), this.loadMlleKScene(), this.loadPetitBiscuitScene())
      console.log(promises)
      return Promise.all(promises)
    }

    loadWalls() {
      let promises = []
      // promises.push(this.loadOrelsanWall(), this.loadMlleKnWall(), this.loadPetitBiscuitWall())
      promises.push( this.loadOrelsanWall() )
      return Promise.all(promises)
    }

    loadArtists() {
      let promises = []
      // promises.push(this.loadOrelsanArtist(), this.loadMlleKnArtist(), this.loadPetitBiscuitArtist())
      promises.push( this.loadOrelsanArtist() )
      return Promise.all(promises)
    }

    loadOrelsanScene() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/scene_orelsan.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let poisMaterial = matl.materials.Pois
          let poisTexture = that.textureLoader.load("assets/pois.png", () => {
            poisTexture.wrapS = THREE.RepeatWrapping
            poisTexture.wrapT = THREE.RepeatWrapping
            poisTexture.repeat.set(10, 10)
            poisMaterial.map = poisTexture

            that.objLoader.load( 'assets/scene_orelsan.obj', function ( object ) {

              object.position.x = 0
              object.position.y = specifications[0].sceneDownPosY
              object.position.z = 0
              object.name = 'scene'

              that.scenesTab.push(object)

              object.traverse(function(o) {
                if (o.type === 'Mesh') {
                  o.receiveShadow = true
                  o.castShadow = true
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

    loadOrelsanWall() {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/mur_orelsan.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          let briquesMaterial = matl.materials.Briques
          let briquesTexture = that.textureLoader.load("assets/briques.png", () => {
            briquesTexture.wrapS = THREE.RepeatWrapping
            briquesTexture.wrapT = THREE.RepeatWrapping
            briquesTexture.repeat.set(5, 5)
            briquesMaterial.map = briquesTexture

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
                }
              })

              that.wallsTab.push(object)
              resolve()
            })
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
