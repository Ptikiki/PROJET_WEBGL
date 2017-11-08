class MlleKScene {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene

      this.uniforms

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.init()
    }

    init() {
      this.createScene()
      this.loadShaders('../javascript/glsl/MlleKVertex.vert', '../javascript/glsl/MlleKFragment.frag')
    }

    createScene() {
      let that = this

      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {}

      this.myObjects = []
      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/scene_riles.obj', function ( object ) {

        object.position.x = 0
        object.position.y = 0
        object.position.z = 0

        STORAGE.scene.add( object )
        STORAGE.SceneClass.myObjects.push(object)
      } )
    }

    initShaders(vertex, fragment) {

      let that = this

      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

      this.geometry = new THREE.PlaneBufferGeometry( 1400, 350, 10, 10 )

      this.material = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide,
        wireframe: true
      } )

      STORAGE.plane = new THREE.Mesh( this.geometry, this.material )
      STORAGE.plane.rotation.x = Math.PI/2
      STORAGE.plane.position.y = 27
      STORAGE.plane.position.z = 520
      STORAGE.scene.add( STORAGE.plane )
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

    animate() {
      if( STORAGE.plane ) {
        this.uniforms.u_time.value += 0.05
      }
    }
}

export default MlleKScene
