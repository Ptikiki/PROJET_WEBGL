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
      this.OrelsanUniforms
      this.petitBiscuitUniforms
      this.MlleKUniforms

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
      this.loadOrelsanShader('../javascript/glsl/OrelsanVertex.vert', '../javascript/glsl/OrelsanFragment.frag')
      setTimeout(()=> {
        this.loadMlleKShader('../javascript/glsl/MlleKVertex.vert', '../javascript/glsl/MlleKFragment.frag')
      }, 200)
      setTimeout(()=> {
        this.loadPetitBiscuitShader('../javascript/glsl/PetitBiscuitVertexPlane.vert', '../javascript/glsl/PetitBiscuitVertexSphere.vert', '../javascript/glsl/PetitBiscuitFragment.frag')
      }, 400)
    }

    loadOrelsanShader(vertex_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertex_url, function (vertex_text) {
        that.fragment_loader.load(fragment_url, function (fragment_text) {
          that.initOrelsanShaders(vertex_text, fragment_text)
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

    loadPetitBiscuitShader(vertexPlane_url, vertexSphere_url, fragment_url) {
      let that = this
      this.vertex_loader.load(vertexPlane_url, function (vertexPlane_text) {
        that.vertex_loader.load(vertexSphere_url, function (vertexSphere_text) {
          that.fragment_loader.load(fragment_url, function (fragment_text) {
            that.initPetitBiscuitShaders(vertexPlane_text, vertexSphere_text, fragment_text)
          })
        })
      })
    }


    initOrelsanShaders(vertex, fragment) {

      this.OrelsanUniforms = THREE.UniformsUtils.merge([
        THREE.ShaderLib.phong.uniforms,
        { diffuse: { value: new THREE.Color(0xfbae65) } },
        { u_time: { type: "f", value: 1.0 } },
        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
        { u_mouse: { type: "v2", value: new THREE.Vector2() } }
      ]);

      let geometry = new THREE.BoxBufferGeometry( 500, 6, 14, 200, 20, 20 );

      let material1 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 200. }, u_frequence:{ type: "f", value: 0.004 } }, this.OrelsanUniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.phong.fragmentShader,
        lights: true,
        fog: true,
        side: THREE.DoubleSide
      } )

      let material2 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 150. }, u_frequence:{ type: "f", value: 0.003 } }, this.OrelsanUniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.phong.fragmentShader,
        side: THREE.DoubleSide,
        lights: true,
        fog: true
      } )

      let material3 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_amplitude:{ type: "f", value: 220. }, u_frequence:{ type: "f", value: 0.005 } }, this.OrelsanUniforms),
        vertexShader: vertex,
        fragmentShader: THREE.ShaderLib.phong.fragmentShader,
        side: THREE.DoubleSide,
        lights: true,
        fog: true
      } )

      let plane1 = new THREE.Mesh( geometry, material1 )
      let plane2 = new THREE.Mesh( geometry, material2 )
      let plane3 = new THREE.Mesh( geometry, material3 )

      plane1.position.z = 125
      plane1.shininess = 30
      plane1.castShadow = true
      plane2.position.z = 175
      plane2.castShadow = true
      plane3.position.z = 220
      plane3.castShadow = true

      let group = new THREE.Group()
      group.add( plane1 )
      group.add( plane2 )
      group.add( plane3 )

      group.position.y = specifications[0].shaderDownPosY
      group.name = 'shaders'

      this.shadersTab.push(group)
    }

    initMlleKShaders(vertex, fragment) {

      this.MlleKUniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      this.geometry = new THREE.PlaneBufferGeometry( 500, 128, 10, 10 )

      this.material = new THREE.ShaderMaterial( {
        uniforms: this.MlleKUniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide
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

    initPetitBiscuitShaders(vertexPlane, vertexSphere, fragment) {
      
      this.petitBiscuitUniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      // SHADER
      this.planeGeometry = new THREE.PlaneBufferGeometry( 500, 128 )

      this.planeMaterial = new THREE.ShaderMaterial( {
        uniforms: this.petitBiscuitUniforms,
        vertexShader: vertexPlane,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      let plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial )
      plane.rotation.x = Math.PI/2
      plane.position.y = 7
      plane.position.z = 185


      // BLOBS

      this.sphereFrequence = 0.2

      this.sphereGeometry = new THREE.SphereBufferGeometry( 30, 32, 32 )
      
      this.sphereMaterial1 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_frequency:{ type: "f", value: this.sphereFrequence }}, this.petitBiscuitUniforms),
        vertexShader: vertexSphere,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.sphereMaterial2 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_frequency:{ type: "f", value: this.sphereFrequence }}, this.petitBiscuitUniforms),
        vertexShader: vertexSphere,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.sphereMaterial3 = new THREE.ShaderMaterial( {
        uniforms: Object.assign({u_frequency:{ type: "f", value: this.sphereFrequence }}, this.petitBiscuitUniforms),
        vertexShader: vertexSphere,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      this.sphere1 = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial1 )
      this.sphere2 = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial2 )
      this.sphere3 = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial3 )

      this.sphere1.position.x = -150
      this.sphere1.position.y = 100
      this.sphere1.position.z = -50

      this.sphere2.position.x = -50
      this.sphere2.position.y = 170
      this.sphere2.position.z = -100

      this.sphere3.position.x = 150
      this.sphere3.position.y = 140
      this.sphere3.position.z = 0

      let group = new THREE.Group()
      group.add(plane)
      group.add(this.sphere1, this.sphere2, this.sphere3)
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

      if (this.sphere1 && this.sphere2 && this.sphere3) {
        this.sphere1.material.uniforms.u_frequency.value = this.sphereFrequence/5
        this.sphere2.material.uniforms.u_frequency.value = this.sphereFrequence/3
        this.sphere3.material.uniforms.u_frequency.value = this.sphereFrequence/6
      }

      if( this.OrelsanUniforms ) {
        this.OrelsanUniforms.u_time.value += 0.05
      }
      if( this.MlleKUniforms ) {
        this.MlleKUniforms.u_time.value += 0.05
      }
      if( this.petitBiscuitUniforms ) {
        this.petitBiscuitUniforms.u_time.value += 0.05
      }
    }
}

export default SceneShader
