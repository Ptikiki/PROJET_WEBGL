class Ambiance {
    constructor(options) {
      this.createLight()
      this.createBackground()
    }

    createLight() {
      const light = new THREE.PointLight(0xffffff, 1, Infinity)
      light.position.set(100, 100, 200)
      STORAGE.scene.add(light)
      const lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(lightAmb)
    }

    createBackground() {
      const geometry = new THREE.BoxGeometry(8000, 8000, 8000)
      const material = new THREE.MeshBasicMaterial({color: 0xfcfcfc, side: THREE.DoubleSide })
      const cube = new THREE.Mesh(geometry, material)
      STORAGE.background = cube
      STORAGE.scene.add(cube)
    }
}

export default Ambiance
