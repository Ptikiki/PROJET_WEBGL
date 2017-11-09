const MTLLoader = require('three-mtl-loader')

import specifications from '../datas/sceneSpecifications.js'

class OrelsanScene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene

      this.vertexSource
      this.fragmentSource

      this.uniforms

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.init()
      this.bind()
    }

    init() {
      this.createScene()
      this.createWall()
      this.createArtist()
      this.loadShaders('../javascript/glsl/OrelsanVertex1.vert', '../javascript/glsl/OrelsanVertex2.vert', '../javascript/glsl/OrelsanFragment.frag')
    }

    createScene() {

      let that = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()

      this.mtlLoader.load('assets/scene_orelsan.mtl', function(matl) {
        matl.preload()

        that.objLoader = new THREE.OBJLoader()
        that.objLoader.setMaterials( matl )

        let poisMaterial = matl.materials.Pois
        let poisTexture = new THREE.TextureLoader().load("assets/pois.png")
        let poisNormal = new THREE.TextureLoader().load("assets/pois_normal.png")

        poisTexture.wrapS = THREE.RepeatWrapping
        poisTexture.wrapT = THREE.RepeatWrapping
        poisTexture.repeat.set(10, 10)
        poisMaterial.map = poisTexture
        poisMaterial.normalMap = poisNormal

        that.objLoader.load( 'assets/scene_orelsan.obj', function ( object ) {
          object.position.x = 0
          object.position.y = specifications[0].sceneDownPosY
          object.position.z = 0

          STORAGE.scene.add( object )
          STORAGE.SceneClass.myObjects.push(object)
        } )

      } )
    }

    createWall() {

      let that = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()

      this.mtlLoader.load('assets/mur_orelsan.mtl', function(matl) {
        matl.preload()

        that.objLoader = new THREE.OBJLoader()
        that.objLoader.setMaterials( matl )

        let briquesMaterial = matl.materials.Briques
        let briquesTexture = new THREE.TextureLoader().load("assets/briques.png")
        let briquesNormal = new THREE.TextureLoader().load("assets/briques_normal.png")

        briquesTexture.wrapS = THREE.RepeatWrapping
        briquesTexture.wrapT = THREE.RepeatWrapping
        briquesTexture.repeat.set(5, 5)
        briquesMaterial.map = briquesTexture
        briquesMaterial.normalMap = briquesNormal

        that.objLoader.load( 'assets/mur_orelsan.obj', function ( object ) {
          object.position.x = 205
          object.position.y = 80
          object.position.z = -290

          // object.rotation.x = Math.PI
          // object.rotation.z = Math.PI
          object.rotation.y = Math.PI

          STORAGE.scene.add( object )
          STORAGE.SceneClass.myObjects.push(object)
        } )

      } )
    }

    createArtist() {

      let that = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()

      this.mtlLoader.load('assets/test_perso/model_test.mtl', function(matl) {
        matl.preload()

        that.objLoader = new THREE.OBJLoader()
        that.objLoader.setMaterials( matl )

        let bodyMaterial = matl.materials.Body
        let bodyOpacity = new THREE.TextureLoader().load("assets/test_perso/model_test_Body_Opacity.png")
        let bodyTexture = new THREE.TextureLoader().load("assets/test_perso/model_test_Body_Diffuse.png")
        let bodyNormal = new THREE.TextureLoader().load("assets/test_perso/model_test_Body_Normal.png")
        let bodySpecular = new THREE.TextureLoader().load("assets/test_perso/model_test_Body_Specular.png")
        let bodyGloss = new THREE.TextureLoader().load("assets/test_perso/model_test_Body_Gloss.png")

        bodyMaterial.map = bodyOpacity
        bodyMaterial.normalMap = bodyNormal
        bodyMaterial.map = bodySpecular
        bodyMaterial.map = bodyGloss
        bodyMaterial.map = bodyTexture

        that.objLoader.load( 'assets/test_perso/model_test.obj', function ( object ) {
          object.position.y = -85

          STORAGE.scene.add( object )
          STORAGE.SceneClass.myObjects.push(object)

          that.artist = object

        } )

      } )
    }

    initShaders(vertex1, vertex2, fragment) {

      let that = this

      this.myShaders = []

      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

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

      STORAGE.scene.add( group )
      STORAGE.SceneClass.myShaders.push(group)
    }

    loadShaders(vertex1_url, vertex2_url, fragment_url) {
      let that = this

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.vertex_loader.load(vertex1_url, function (vertex1_text) {

        that.vertex_loader.load(vertex2_url, function (vertex2_text) {

          that.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
          that.fragment_loader.setResponseType('text')
          that.fragment_loader.load(fragment_url, function (fragment_text) {
            that.initShaders(vertex1_text, vertex2_text, fragment_text)
          })
        })
      })
    }

    onMouseMove(event) {
      STORAGE.SceneClass.statue = STORAGE.SceneClass.myObjects[0]

      STORAGE.SceneClass.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      STORAGE.SceneClass.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
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
      if( this.uniforms ) {
        this.uniforms.u_time.value += 0.05
      }
      if ( this.artist ) {
        this.artist.rotation.y += 0.01
      }
    }
}

export default OrelsanScene
