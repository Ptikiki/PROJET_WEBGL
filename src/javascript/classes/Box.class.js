import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

class Box {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene

      this.vertexSource
      this.fragmentSource

      this.uniforms

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

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
        console.log(matl.materials)
        that.objLoader.setMaterials( matl )
        
        that.objLoader.load( 'assets/base_boite.obj', function ( object ) {
          STORAGE.scene.add( object )
       
        } )
      } )

      this.mtlLoader.load('assets/couvercle_boite.mtl', function(matl) {
        matl.preload()
        console.log(matl.materials)
        that.objLoader.setMaterials( matl )
        
        that.objLoader.load( 'assets/couvercle_boite.obj', function ( object ) {
          object.position.x = -205
          object.position.z = 285
          object.position.y = 75
          STORAGE.scene.add( object )
          that.object = object
        } )
      } )

    }

    bind() {
      let that = this

      window.addEventListener('keydown', that.handleKeydown.bind(event, that))
      window.addEventListener('resize', that.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    handleKeydown(that, event) {

      if (event.key === "r") {
        TweenLite.to(that.object.rotation, 2, {
          x : Math.PI
        })

      }

    }

    animate() {

    }

}

export default Box
