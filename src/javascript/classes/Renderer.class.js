class Renderer {

    constructor(options) {
      this.container = document.getElementById( 'container' )
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.renderer.setClearColor( 0xfcfcfc, 1)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
      this.container.appendChild( this.renderer.domElement )
      STORAGE.renderer = this.renderer

      this.initScene()
      this.initCamera()
      this.bind()
    }

    bind() {
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    initScene() {
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 800
      STORAGE.camera.position.y = 700
      STORAGE.camera.position.x = -400
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
      this.controls.maxPolarAngle = Math.PI/2.2;
      this.controls.minDistance = 800;
      this.controls.maxDistance = 4000;
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}

export default Renderer
