import NetUtils from '../utils/net-utils.js'

class Scene {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 1000
      this.controls = new THREE.OrbitControls( STORAGE.camera )
      this.controls.target.set( 0, 0, 0 )
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(100, 100, 200)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)

      this.vertexSource
      this.fragmentSource

      this.uniforms

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.init()
      this.bind()
    }

    init() {
      this.createStatue()
      this.loadShaders('../javascript/glsl/vertex.vert', '../javascript/glsl/fragment.frag')
    }

    createStatue() {
      let that = this

      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {
      }

      this.myObjects = []
      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/scene_riles.obj', function ( object ) {

        object.position.x = 0
        object.position.y = 0
        object.position.z = 0
        object.scale.x = 2.8
        object.scale.y = 2.8
        object.scale.z = 2.8

        STORAGE.scene.add( object )
        STORAGE.SceneClass.myObjects.push(object)
      } )
    }

    initShaders(vertex, fragment) {

      // console.log("shaders init")
      let that = this

      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      this.geometry = new THREE.PlaneBufferGeometry( 1400, 510 )

      // this.material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} )

      this.material = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide
      } )

      //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          this.material.needsUpdate = true

      STORAGE.plane = new THREE.Mesh( this.geometry, this.material )

      console.log(this.geometry)

      STORAGE.plane.rotation.x = Math.PI/2
      STORAGE.plane.position.y = 8
      STORAGE.plane.position.z = 450

      STORAGE.scene.add( STORAGE.plane )

      // console.log(this.plane)
    }

    loadShaders(vertex_url, fragment_url) {
      let that = this

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.vertex_loader.load(vertex_url, function (vertex_text) {

        that.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
        that.fragment_loader.setResponseType('text')
        that.fragment_loader.load(fragment_url, function (fragment_text) {
          that.initShaders(vertex_text, fragment_text)
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
      if( STORAGE.plane ) {
        this.uniforms.u_time.value += 0.05
      }
    }
}

export default Scene
