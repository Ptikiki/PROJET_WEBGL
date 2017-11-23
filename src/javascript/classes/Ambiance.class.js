import specifications from '../datas/sceneSpecifications.js'

class Ambiance {
    constructor(options) {
      STORAGE.AmbianceClass = this
      this.light1
      this.light2
      this.light3

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.fragment_loader.setResponseType('text')

      this.createLight()
      this.createBackground()

      this.backgroundUniforms

      // this.createFlor()
    }

    createLight() {
      this.light1 = new THREE.PointLight(0xffffff, 0.07, 0, 2)
      this.light1.position.set(500, 1800, 800)
      this.light1.rotation.set(0, Math.PI, Math.PI)

      let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024

      this.light1.castShadow = true
      this.light1.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light1.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light1.shadow.camera.far = 10000

      STORAGE.scene.add(this.light1)

      this.light2 = new THREE.PointLight(0xffffff, 0.02, 0, 2)

      this.light2.position.set(0, 1000, 0)
      this.light2.rotation.set(0, Math.PI, Math.PI)
      this.light2.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light2.shadow.camera.far = 10000

      STORAGE.scene.add(this.light2)

      this.light3 = new THREE.PointLight(0xffffff, 0.03, 0, 2)

      this.light3.position.set(-1300, 1000, 0)
      this.light3.rotation.set(0, Math.PI, Math.PI)
      this.light3.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light3.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light3.shadow.camera.far = 10000

      STORAGE.scene.add(this.light3)

      const lightAmb = new THREE.AmbientLight(0xffffff, 0.4)
      STORAGE.scene.add(lightAmb)
    }

    createBackground() {
      let that = this
      this.vertex_loader.load('../javascript/glsl/BackgroundVertex.vert', function (vertexGround) {
        that.fragment_loader.load('../javascript/glsl/BackgroundFragment.frag', function (fragmentGround) {
          const h = 9000;
          const geometry = new THREE.SphereGeometry(h, 32, 32)
    
          that.backgroundUniforms = THREE.UniformsUtils.merge([
            THREE.ShaderLib.lambert.uniforms,
            { specular: { value: new THREE.Color(0x1b1b1b) } },
            { emissive: { value: new THREE.Color(0x000000) } },
            { shininess : { value: 30 } },
            { hue : { value: 1 } },
            { u_time: { type: "f", value: 1.0 } },
            { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
            { u_mouse: { type: "v2", value: new THREE.Vector2() } },
            { u_color1: { value: new THREE.Color(0x303848) } },
            { u_color2: { value: new THREE.Color(0x2a3040) } }
          ]);
    
          let material = new THREE.ShaderMaterial( {
            uniforms: that.backgroundUniforms,
            vertexShader: vertexGround,
            fragmentShader: fragmentGround,
            side: THREE.BackSide,
            lights: true,
            fog: true
          } )
  
          const cube = new THREE.Mesh(geometry, material)
          cube.position.y = h
          cube.receiveShadow = true
    
          console.log(cube, 'HERE')
    
          STORAGE.background = cube
          STORAGE.scene.add(cube)
        })
      })

      
    }

    updateAmbiance(step, chordsDatas, currentChord) {
      let targetColor
      step === 0 ? targetColor = new THREE.Color(0x303848) : ''
      step === 1 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][1]) : ''
      step === 2 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][2]) : ''
      step === 3 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][3]) : ''

      TweenLite.to( [STORAGE.background.material.color], 0.6, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        ease: Power2.easeOut
      });
      STORAGE.box.children.forEach((mesh)=>{
        TweenLite.to( mesh.material.color, 0.6, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          ease: Power2.easeOut
        });
      })
      STORAGE.boxCouvercle.children.forEach((mesh)=>{
        TweenLite.to( mesh.material.color, 0.6, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          ease: Power2.easeOut
        });
      })

      this.updateLights(step, currentChord)
    }

    updateLights(step, currentChord) {
      if (step === 0) {
        this.light1.color.set(0xffffff)
        this.light2.color.set(0xffffff)
        this.light3.color.set(0xffffff)
        this.light1.intensity = 0.07
        this.light2.intensity = 0.02
        this.light3.intensity = 0.03
      } else if (step === 3 && currentChord == 0) {
        this.light1.color.set(specifications[currentChord].light1)
        this.light2.color.set(specifications[currentChord].light2)
        this.light3.color.set(specifications[currentChord].light3)
        this.light1.intensity = 0.35
        this.light2.intensity = 0.22
        this.light3.intensity = 0.15
      } else if (step === 3 && currentChord == 2) {
        this.light1.color.set(specifications[currentChord].light1)
        this.light2.color.set(specifications[currentChord].light2)
        this.light3.color.set(specifications[currentChord].light3)
        this.light1.intensity = 0.30
        this.light2.intensity = 0.27
        this.light3.intensity = 0.08
      }
    }

    animate() {
      if( this.backgroundUniforms.u_time ) {
        this.backgroundUniforms.u_time.value += 0.05
      }
    }
}

export default Ambiance
