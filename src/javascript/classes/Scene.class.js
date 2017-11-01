class Scene {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 480
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(20, 20, 20)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      // this.createBackground()
      this.createStatue()
    }

    createStatue() {
      let that = this

      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {
      }

      this.myObjects = []
      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/statue.obj', function ( object ) {
        // object.traverse( function ( child ) {
        //   if ( child instanceof THREE.Mesh ) {
        //     child.material.map = texture
        //   }
        // } )

        object.position.x = 0
        object.position.y = 0
        object.position.z = 0
        //object.rotation.x = -300
        //object.rotation.y = Math.PI/2
        //object.rotation.z = 100
        object.scale.x = 2.8
        object.scale.y = 2.8
        object.scale.z = 2.8

        STORAGE.scene.add( object )
        that.myObjects.push(object)
      } )

    }

    createBackground() {
      let that = this
      this.texture = new THREE.TextureLoader().load( 'assets/textures/church.jpg' )
      this.textureWidth = 3000
      this.textureHeight = 500
      this.ratio = this.textureWidth / this.textureHeight
      this.newTextureWidth = this.ratio * window.innerHeight

      this.backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(that.newTextureWidth, window.innerHeight, 0),
        new THREE.MeshBasicMaterial({
          map: that.texture
        })
      )
      STORAGE.scene.add(this.backgroundMesh)
      STORAGE.carrousel = this.backgroundMesh        
    }

    onMouseMove(event) {
      let that = STORAGE.SceneClass
      that.statue = that.myObjects[0]

      that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      document.addEventListener('mousemove', this.onMouseMove, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseWheel(event) {
      let that = STORAGE.SceneClass
    }

    animate() {
      let that = STORAGE.SceneClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
