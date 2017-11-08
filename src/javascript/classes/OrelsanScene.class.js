const MTLLoader = require('three-mtl-loader')

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
      this.loadShaders('../javascript/glsl/OrelsanVertex1.vert', '../javascript/glsl/OrelsanVertex2.vert', '../javascript/glsl/OrelsanFragment.frag')
    }

    createScene() {

      let that = this

      this.myObjects = []
      this.mtlLoader = new MTLLoader()

      this.mtlLoader.load('assets/scene_orelsan.mtl', function(matl) {
        matl.preload()

        console.log(matl.materials)

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
        object.position.y = -85
        object.position.z = 0

        STORAGE.scene.add( object )
        STORAGE.SceneClass.myObjects.push(object)
      } )

      } )
    }

    initShaders(vertex1, vertex2, fragment) {

      let that = this

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


      STORAGE.plane1 = new THREE.Mesh( this.geometry, this.material1 )
      STORAGE.plane2 = new THREE.Mesh( this.geometry, this.material1 )
      STORAGE.plane3 = new THREE.Mesh( this.geometry, this.material2 )
      STORAGE.plane4 = new THREE.Mesh( this.geometry, this.material2 )

      STORAGE.plane1.rotation.x = Math.PI/2
      STORAGE.plane2.rotation.x = Math.PI/2
      STORAGE.plane1.position.y = 140
      STORAGE.plane2.position.y = 140
      STORAGE.plane1.position.z = 105
      STORAGE.plane2.position.z = 125

      STORAGE.plane3.rotation.x = Math.PI/2
      STORAGE.plane4.rotation.x = Math.PI/2
      STORAGE.plane3.position.y = 140
      STORAGE.plane4.position.y = 140
      STORAGE.plane3.position.z = 225
      STORAGE.plane4.position.z = 245

      STORAGE.scene.add( STORAGE.plane1 )
      STORAGE.scene.add( STORAGE.plane2 )
      STORAGE.scene.add( STORAGE.plane3 )
      STORAGE.scene.add( STORAGE.plane4 )
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
      if( STORAGE.plane1 && STORAGE.plane2 ) {
        this.uniforms.u_time.value += 0.05
      }
    }
}

export default OrelsanScene
