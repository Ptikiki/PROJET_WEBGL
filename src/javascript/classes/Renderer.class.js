import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Renderer {

    constructor(options) {
      STORAGE.RendererClass = this
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
      this.initEffectComposer()
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
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 800
      STORAGE.camera.position.y = 800
      STORAGE.camera.position.x = -400
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
      this.controls.maxPolarAngle = Math.PI/2.2
      this.controls.minDistance = 800
      this.controls.maxDistance = 1500
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.09;
      this.controls.rotateSpeed = 0.18;
      this.controls.zoomSpeed = 0.3;
    }

    initEffectComposer() {
      this.composer = new EffectComposer(this.renderer)
      this.composer.addPass(new RenderPass(this.scene, this.camera))

      // Add shaders
      const horizontalBlurShader = new ShaderPass(THREE.HorizontalBlurShader)
      this.composer.addPass(horizontalBlurShader)
      const verticalBlurShaderPass = new ShaderPass(THREE.VerticalBlurShader)
      this.composer.addPass(verticalBlurShaderPass)

      // And draw to the screen
      const copyPass = new ShaderPass(CopyShader)
      copyPass.renderToScreen = true
      this.composer.addPass(copyPass)
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    updateCamera() {
      this.controls.update()
    }

    render() {
      this.renderer.render(this.scene, this.camera)
    }

    renderComposer() {
      this.composer.render()
    }

    animateBlur(value) {
      if (value === 0) {
        STORAGE.InterfaceClass.interfaceIsBlurred = true
        TweenLite.to(this.composer.passes[1].uniforms.h, 0.3, {
          value: 1 / window.innerWidth,
          ease: Power2.easeIn,
        })
        TweenLite.to(this.composer.passes[2].uniforms.v, 0.3, {
          value: 1 / window.innerHeight,
          ease: Power2.easeIn,
        })
      } else if(value === 1) {
        TweenLite.to([this.composer.passes[1].uniforms.h, this.composer.passes[2].uniforms.v], 0.3, {
          value: 0.,
          ease: Power2.easeIn,
          onComplete: () => { STORAGE.InterfaceClass.interfaceIsBlurred = false }
        })
      } else if(value === 2) {
        TweenLite.to([this.composer.passes[1].uniforms.h, this.composer.passes[2].uniforms.v], 0.8, {
          value: 0.,
          ease: Power2.easeInOut,
          onComplete: () => { STORAGE.InterfaceClass.interfaceIsBlurred = false }
        })
      }
    }
}

export default Renderer
