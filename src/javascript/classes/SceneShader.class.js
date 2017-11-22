const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'
import { TweenLite } from 'gsap';

class SceneShader {

    constructor(options) {
      STORAGE.SceneShaderClass = this

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.fragment_loader.setResponseType('text')

      this.myShadersOnScene = []
      this.myShadersOnWall = []
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
        this.loadPetitBiscuitShader(
        '../javascript/glsl/PetitBiscuitVertexPlane.vert',
        '../javascript/glsl/PetitBiscuitVertexSphere.vert',
        '../javascript/glsl/PetitBiscuitFragmentPlane.frag',
        '../javascript/glsl/PetitBiscuitFragmentSphere.frag',
        '../javascript/glsl/PetitBiscuitVertexGround.vert')
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

    loadPetitBiscuitShader(vertexPlane_url, vertexSphere_url, fragmentPlane_url, fragmentSphere_url, vertexGround_url) {
      let that = this
      this.vertex_loader.load(vertexPlane_url, function (vertexPlane_text) {
        that.vertex_loader.load(vertexSphere_url, function (vertexSphere_text) {
          that.fragment_loader.load(fragmentPlane_url, function (fragmentPlane_text) {
            that.fragment_loader.load(fragmentSphere_url, function (fragmentSphere_text) {
              that.vertex_loader.load(vertexGround_url, function (vertexGround_text) {
                that.initPetitBiscuitShaders(vertexPlane_text, vertexSphere_text, fragmentPlane_text, fragmentSphere_text, vertexGround_text)
              })
            })
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

    initPetitBiscuitShaders(vertexPlane, vertexSphere, fragmentPlane, fragmentSphere, vertexGround) {
     
      // BLOBS

      this.petitBiscuitUniformsSphere = THREE.UniformsUtils.merge([
        THREE.ShaderLib.phong.uniforms,
        { diffuse: { value: new THREE.Color(0x57daf0) } },
        { specular: { value: new THREE.Color(0x1b1b1b) } },
        { specularMap: { value: 'grass' } },
        { emissive: { value: new THREE.Color(0x282828) } },
        { shininess : { value: 30 } },
        { u_time: { type: "f", value: 1.0 } },
        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
        { u_mouse: { type: "v2", value: new THREE.Vector2() } }
      ]);

      let sphereRadius = [21, 18, 12, 21, 20, 18, 11, 9]
      let sphereFrequence = [0.2, 0.18, 0.12, 0.15, 0.2, 0.14, 0.18, 0.14]

      let group = new THREE.Group()
      group.position.y = specifications[2].shaderDownPosY
      group.name = 'shaders'

      for(let i = 0; i < 12; i++) {

        let radius = Math.round( (Math.random() * (30 - 9) + 9 ) * 100 ) / 100
        let frequence = Math.round( (Math.random() * (0.2 - 0.11) + 0.11 ) * 100 ) / 100

        let xLeft = Math.round( (Math.random() * (-60 - (-200)) + (-200)) * 100 ) / 100
        let zBack = Math.round( (Math.random() * (-50 - (-190)) + (-190)) * 100 ) / 100

        let xRight = Math.round( (Math.random() * (200 - (70)) + (70)) * 100 ) / 100
        let zFront = Math.round( (Math.random() * (190 - (50)) + (50)) * 100 ) / 100

        let xAll = Math.round( (Math.random() * (200 - (-200)) + (-200)) * 100 ) / 100
        let zAll = Math.round( (Math.random() * (190 - (-190)) + (-190)) * 100 ) / 100

        let xAvoidBox = Math.round( (Math.random() * (200 - (-120)) + (-120)) * 100 ) / 100
        let zAvoidBox = Math.round( (Math.random() * (190 - (-100)) + (-100)) * 100 ) / 100

        let y = Math.round( (Math.random() * (150 - (80)) + (80)) * 100 ) / 100

        let sphereGeometry = new THREE.SphereBufferGeometry( radius, 32, 32 )
        let sphereMaterial = new THREE.ShaderMaterial( {
          uniforms: Object.assign({u_frequency:{ type: "f", value: frequence }}, this.petitBiscuitUniformsSphere),
          vertexShader: vertexSphere,
          fragmentShader: THREE.ShaderLib.phong.fragmentShader,
          side: THREE.DoubleSide,
          lights: true,
          fog: true
        } )

        let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
        let randomBase = Math.round( Math.random() )
        let randomX = Math.round( Math.random() )
        let randomZ = Math.round( Math.random() )
        if (randomBase === 0) {
          sphere.position.x =  randomX === 1 ? xLeft : xRight 
          sphere.position.y = y
          sphere.position.z = randomX === 1 ? zAvoidBox : zAll
        } else {
          sphere.position.x =  randomZ === 1 ? xAvoidBox : xAll
          sphere.position.y = y
          sphere.position.z = randomZ === 1 ? zBack : zFront
        }
        group.add(sphere)
      }

      // GROUND

      this.petitBiscuitUniformsGround = THREE.UniformsUtils.merge([
        THREE.ShaderLib.phong.uniforms,
        { diffuse: { value: new THREE.Color(0xf097c4) } },
        { specular: { value: new THREE.Color(0x1b1b1b) } },
        { specularMap: { value: 'grass' } },
        { shininess : { value: 30 } },
        { u_time: { type: "f", value: 1.0 } },
        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
        { u_mouse: { type: "v2", value: new THREE.Vector2() } }
      ]);

      let groundDeometry = new THREE.PlaneBufferGeometry(380, 380, 300, 300 )
      
      let groundMaterial = new THREE.ShaderMaterial( {
        uniforms: this.petitBiscuitUniformsGround,
        vertexShader: vertexGround,
        fragmentShader: THREE.ShaderLib.phong.fragmentShader,
        side: THREE.DoubleSide,
        lights: true,
        fog: true
      } )

      let ground = new THREE.Mesh( groundDeometry, groundMaterial )
      ground.rotation.x = Math.PI/2
      ground.position.z = 0

      group.add(ground)

      this.shadersTab.push(group)

      
      // ECRAN

      this.petitBiscuitUniformsEcran = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }
       
       let ecranGeometry = new THREE.PlaneBufferGeometry( 470, 265 )
       
        let ecranMaterial = new THREE.ShaderMaterial( {
          uniforms: this.petitBiscuitUniformsEcran,
          vertexShader: vertexPlane,
          fragmentShader: fragmentPlane,
          side: THREE.DoubleSide
        } )

        let ecran = new THREE.Mesh( ecranGeometry, ecranMaterial )
        this.shaderTV = ecran

        this.shaderTV.rotation.x = Math.PI / 2
        this.shaderTV.position.y = -75
        this.shaderTV.position.z = -380
    }

    removeShaders() {
      STORAGE.scene.children.forEach((child, index) => {
        child.name === 'shaders' ? STORAGE.scene.remove(child) : ''
      })
      this.myShadersOnScene = []
      this.myShadersOnWall = []
    }

    displayOrelsanShader() {
      STORAGE.scene.add( this.shadersTab[0] )
      this.myShadersOnScene.push( this.shadersTab[0] )
    }

    displayMlleKShader() {
      STORAGE.scene.add( this.shadersTab[1] )
      this.myShadersOnScene.push( this.shadersTab[1] )
    }

    displayPetitBiscuitShader() {
      STORAGE.scene.add( this.shadersTab[2] )
      this.myShadersOnScene.push( this.shadersTab[2] )
    }

    animate() {
      if (STORAGE.ecranGeant && STORAGE.ecranGeant.children.length === 0 && this.shaderTV) {
       STORAGE.ecranGeant.add(this.shaderTV)
      }
      if( this.OrelsanUniforms ) {
        this.OrelsanUniforms.u_time.value += 0.05
      }
      if( this.MlleKUniforms ) {
        this.MlleKUniforms.u_time.value += 0.05
      }
      if( this.petitBiscuitUniformsEcran && this.petitBiscuitUniformsSphere && this.petitBiscuitUniformsGround ) {
        this.petitBiscuitUniformsEcran.u_time.value += 0.05
        this.petitBiscuitUniformsSphere.u_time.value += 0.1
        this.petitBiscuitUniformsGround.u_time.value += 0.05
      }
    }
}

export default SceneShader
