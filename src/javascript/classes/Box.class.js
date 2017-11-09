import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

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
        console.log(matl.materials)
        that.objLoader.setMaterials( matl )

        that.objLoader.load( 'assets/base_boite.obj', function ( object ) {
          object.rotation.y = Math.PI
          STORAGE.scene.add( object )
          object.name = 'base_boite'
        } )
      } )

      this.mtlLoader.load('assets/couvercle_boite.mtl', function(matl) {
        matl.preload()
        console.log(matl.materials)
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
      // window.addEventListener('keydown', that.handleKeydown.bind(event, that))
      window.addEventListener('resize', that.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // handleKeydown(that, event) {
    //   if (event.key === "r") {
    //     TweenLite.to(that.object.rotation, 0.6, {
    //       x : -Math.PI / 2,
    //       ease: Power2.easeOut
    //     })
    //     TweenLite.to(STORAGE.SceneClass.myObjects[0].position, 0.8, {
    //       y : 90,
    //       ease: Power2.easeOut
    //     })
    //   }
    // }

    openBox(step) {
      if (step === 0) {
        TweenLite.to(STORAGE.BoxClass.object.rotation, 0.6, { x : 0, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[0].position, 0.8, { y : -85, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[1].position, 0.8, { y : -85, ease: Power2.easeOut })
      } else if (step === 1) {
        TweenLite.to(STORAGE.BoxClass.object.rotation, 0.6, { x : -Math.PI / 50, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[0].position, 0.8, { y : -85, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[1].position, 0.8, { y : -85, ease: Power2.easeOut })
      } else if (step === 2) {
        TweenLite.to(STORAGE.BoxClass.object.rotation, 0.6, { x : -Math.PI / 20, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[0].position, 0.8, { y : -85, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[1].position, 0.8, { y : -85, ease: Power2.easeOut })
      } else if (step === 3) {
        TweenLite.to(STORAGE.BoxClass.object.rotation, 1.5, { x : -Math.PI / 2, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[0].position, 1.2, { y : 90, ease: Power2.easeOut })
        TweenLite.to(STORAGE.SceneClass.myObjects[1].position, 1.2, { y : 150, ease: Power2.easeOut })
      }

    }
}

export default Box
