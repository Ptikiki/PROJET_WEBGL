const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

class SceneShader {

    constructor(options) {
      STORAGE.SceneShaderClass = this

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.fragment_loader.setResponseType('text')

      this.myShaders = []
      this.uniforms

      this.shadersTab = []

      this.init()
    }

    init() {
      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      this.loadShaders()
    }

    loadShaders() {
      this.loadOrelsanShader('../javascript/glsl/OrelsanVertex1.vert', '../javascript/glsl/OrelsanVertex2.vert', '../javascript/glsl/OrelsanVertex3.vert', '../javascript/glsl/OrelsanVertex4.vert', '../javascript/glsl/OrelsanFragment.frag')
      setTimeout(()=> {
        this.loadMlleKShader('../javascript/glsl/MlleKVertex.vert', '../javascript/glsl/MlleKFragment.frag')
      }, 200)
      setTimeout(()=> {
        this.loadPetitBiscuitShader('../javascript/glsl/PetitBiscuitVertex.vert', '../javascript/glsl/PetitBiscuitFragment.frag')
      }, 400)
    }

    loadOrelsanShader(vertex1_url, vertex2_url, vertex3_url, vertex4_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex1_url, function (vertex1_text) {
        that.vertex_loader.load(vertex2_url, function (vertex2_text) {
          that.vertex_loader.load(vertex2_url, function (vertex3_text) {
            that.vertex_loader.load(vertex2_url, function (vertex4_text) {
              that.fragment_loader.load(fragment_url, function (fragment_text) {
                that.initOrelsanShaders(vertex1_text, vertex2_text, vertex3_text, vertex4_text, fragment_text)
              })
            })
          })
        })
      })
    }

    loadMlleKShader(vertex_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex_url, function (vertex_text) {
        that.fragment_loader.load(fragment_url, function (fragment_text) {
          that.initMlleKShaders(vertex_text, fragment_text)
        })
      })
    }

    loadPetitBiscuitShader(vertex_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex_url, function (vertex_text) {
        that.fragment_loader.load(fragment_url, function (fragment_text) {
          that.initPetitBiscuitShaders(vertex_text, fragment_text)
        })
      })
    }


    initOrelsanShaders(vertex1, vertex2, vertex3, vertex4, fragment) {

      console.log( vertex1, vertex2, vertex3, vertex4 )
      this.geometry = new THREE.PlaneBufferGeometry( 500, 2, 10, 10 )

      this.material1 = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex1,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.material2 = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex2,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.material3 = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex3,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.material4 = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex4,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      let plane1 = new THREE.Mesh( this.geometry, this.material1 )
      let plane2 = new THREE.Mesh( this.geometry, this.material2 )
      let plane3 = new THREE.Mesh( this.geometry, this.material3 )
      let plane4 = new THREE.Mesh( this.geometry, this.material4 )

      plane1.rotation.x = Math.PI/2
      plane2.rotation.x = Math.PI/2
      plane3.rotation.x = Math.PI/2
      plane4.rotation.x = Math.PI/2

      plane1.position.z = 130
      plane2.position.z = 160
      plane3.position.z = 190
      plane4.position.z = 220

      let group = new THREE.Group()
      group.add( plane1 )
      group.add( plane2 )
      group.add( plane3 )
      group.add( plane4 )

      group.position.y = specifications[0].shaderDownPosY
      group.name = 'shaders'

      this.shadersTab.push(group)
    }

    initMlleKShaders(vertex, fragment) {
      this.geometry = new THREE.PlaneBufferGeometry( 500, 128, 10, 10 )

      this.material = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide,
        wireframe: true
      } )

      let plane = new THREE.Mesh( this.geometry, this.material )
      plane.rotation.x = Math.PI/2
      plane.position.z = 185

      let group = new THREE.Group()
      group.add( plane )
      group.name = 'shaders'
      group.position.y = specifications[1].shaderDownPosY

      this.shadersTab.push(group)
    }

    initPetitBiscuitShaders(vertex, fragment) {

      // PICOS

      this.picoGeometry = new THREE.ConeGeometry( 40, 130, 120 )
      this.picoMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff} )
      this.picoMaterial.transparent = true
      this.picoMaterial.opacity = 0.5
      this.picoCone1 = new THREE.Mesh( this.picoGeometry, this.picoMaterial )
      this.picoCone2 = new THREE.Mesh( this.picoGeometry, this.picoMaterial )
      this.picoCone3 = new THREE.Mesh( this.picoGeometry, this.picoMaterial )

      this.picoCone1.position.x = -70
      this.picoCone2.position.x = 150
      this.picoCone3.position.x = -200
      this.picoCone1.position.y = 70
      this.picoCone2.position.y = 70
      this.picoCone3.position.y = 70
      this.picoCone1.position.z = -150
      this.picoCone2.position.z = -50
      this.picoCone3.position.z = -50
      
      this.picoCone3.reflectivity = 1

      this.picoLight1 = new THREE.SpotLight(0xff0000, 15, Infinity, 0.2)
      this.picoLight2 = new THREE.SpotLight(0x0000ff, 15, Infinity, 0.2)
      this.picoLight3 = new THREE.SpotLight(0x00ffff, 15, Infinity, 0.2)

      this.picoLight1.position.set(150, -150, 100)
      //this.picoLight2.position.set(100, -150, 100)
      this.picoLight2.position.set(-50, -150, 100)
      this.picoLight3.position.set(150, -150, 100)
      this.picoLight1.target = this.picoCone1
      this.picoLight2.target = this.picoCone1
      this.picoLight3.target = this.picoCone2


      // SHADER

      this.geometry = new THREE.PlaneBufferGeometry( 500, 128 )

      this.material = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      let plane = new THREE.Mesh( this.geometry, this.material )
      plane.rotation.x = Math.PI/2
      plane.position.y = 7
      plane.position.z = 185

      let group = new THREE.Group()
      group.add(plane)
      group.add(this.picoCone1, this.picoCone2, this.picoCone3, this.picoLight1, this.picoLight1.target, this.picoLight2, this.picoLight2.target, this.picoLight3, this.picoLight3.target )
      group.position.y = specifications[2].shaderDownPosY
      group.name = 'shaders'

      console.log(group)

      this.shadersTab.push(group)
    }

    removeShaders() {
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'shaders' ? STORAGE.scene.remove(child) : ''
      })
      this.myShaders = []
    }

    displayOrelsanShader() {
      STORAGE.scene.add( this.shadersTab[0] )
      this.myShaders.push( this.shadersTab[0] )
    }

    displayMlleKShader() {
      STORAGE.scene.add( this.shadersTab[1] )
      this.myShaders.push( this.shadersTab[1] )
    }

    displayPetitBiscuitShader() {
      STORAGE.scene.add( this.shadersTab[2] )
      this.myShaders.push( this.shadersTab[2] )
    }

    animate() {
      if( this.uniforms ) {
        this.uniforms.u_time.value += 0.05
      }
    }
}

export default SceneShader
