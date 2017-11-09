import specifications from '../datas/sceneSpecifications.js'

class PetitBiscuitScene {

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
      this.loadShaders('../javascript/glsl/PetitBiscuitVertex.vert', '../javascript/glsl/PetitBiscuitFragment.frag')
    }

    createScene() {
      let that = this

      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {}

      this.myObjects = []
      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/scene_riles.obj', function ( object ) {

        object.position.x = 0
        object.position.y = specifications[1].sceneDownPosY
        object.position.z = 0

        STORAGE.scene.add( object )
        STORAGE.SceneClass.myObjects.push(object)
      } )
    }

    initShaders(vertex, fragment) {

      let that = this

      this.myShaders = []

      this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      }

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

      STORAGE.scene.add(group)
      STORAGE.SceneClass.myShaders.push(group)
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
      if( this.uniforms ) {
        this.uniforms.u_time.value += 0.05
      }
    }
}

export default PetitBiscuitScene
