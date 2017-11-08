class Renderer {

    constructor(options) {
      this.container = document.getElementById( 'container' )
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.renderer.setClearColor( 0xfcfcfc, 1)
      this.container.appendChild( this.renderer.domElement )
      STORAGE.renderer = this.renderer

      this.initCamera()
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 2000
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
    }
}

export default Renderer
