class Renderer {

    constructor(options) {
      this.container = document.getElementById( 'container' )
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.container.appendChild( this.renderer.domElement )
      STORAGE.renderer = this.renderer

      window.R = this.renderer

      this.init()
    }

    init() {
      //this.renderer.autoResize = true
      //this.renderer.view.classList.add('webGLRenderer')
    }
}

export default Renderer