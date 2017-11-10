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
      this.loadOrelsanShader('../javascript/glsl/OrelsanVertex1.vert', '../javascript/glsl/OrelsanVertex2.vert', '../javascript/glsl/OrelsanFragment.frag')
      setTimeout(()=> {
        this.loadMlleKShader('../javascript/glsl/MlleKVertex.vert', '../javascript/glsl/MlleKFragment.frag')
      }, 200)
      setTimeout(()=> {
        this.loadPetitBiscuitShader('../javascript/glsl/PetitBiscuitVertex.vert', '../javascript/glsl/PetitBiscuitFragment.frag')
      }, 400)
    }

    loadOrelsanShader(vertex1_url, vertex2_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex1_url, function (vertex1_text) {
        that.vertex_loader.load(vertex2_url, function (vertex2_text) {
          that.fragment_loader.load(fragment_url, function (fragment_text) {
            that.initOrelsanShaders(vertex1_text, vertex2_text, fragment_text)
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


    initOrelsanShaders(vertex1, vertex2, fragment) {
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

      let plane1 = new THREE.Mesh( this.geometry, this.material1 )
      let plane2 = new THREE.Mesh( this.geometry, this.material1 )
      let plane3 = new THREE.Mesh( this.geometry, this.material2 )
      let plane4 = new THREE.Mesh( this.geometry, this.material2 )

      plane1.rotation.x = Math.PI/2
      plane2.rotation.x = Math.PI/2
      plane1.position.z = 105
      plane2.position.z = 125

      plane3.rotation.x = Math.PI/2
      plane4.rotation.x = Math.PI/2
      plane3.position.z = 225
      plane4.position.z = 245

      let group = new THREE.Group();
      group.add( plane1 );
      group.add( plane2 );
      group.add( plane3 );
      group.add( plane4 );

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

      let group = new THREE.Group();
      group.add( plane );
      group.name = 'shaders'
      group.position.y = specifications[1].shaderDownPosY

      this.shadersTab.push(group)
    }

    initPetitBiscuitShaders(vertex, fragment) {
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
      group.position.y = specifications[2].shaderDownPosY
      group.name = 'shaders'

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
