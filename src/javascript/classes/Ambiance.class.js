class Ambiance {
    constructor(options) {
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(100, 100, 200)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)
    }
}

export default Ambiance
