class Ambiance {
    constructor(options) {
      STORAGE.AmbianceClass = this

      this.createLight()
      this.createBackground()
    }

    createLight() {
      const light = new THREE.PointLight(0xffffff, 0.07, 0, 2)

      light.position.set(500, 1200, 800)
      light.rotation.set(0, Math.PI, Math.PI)

      let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024

      light.castShadow = true
      light.shadow.mapSize.width = SHADOW_MAP_WIDTH
      light.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      light.shadow.camera.far = 10000

      STORAGE.scene.add(light)

      const light2 = new THREE.PointLight(0xffffff, 0.02, 0, 2)

      light2.position.set(0, 1000, 0)
      light2.rotation.set(0, Math.PI, Math.PI)
      light2.shadow.mapSize.width = SHADOW_MAP_WIDTH
      light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      light2.shadow.camera.far = 10000

      STORAGE.scene.add(light2)

      var sphereSize = 100
      var pointLightHelper = new THREE.PointLightHelper( light2, sphereSize )
      STORAGE.scene.add( pointLightHelper )


      const lightAmb = new THREE.AmbientLight(0xffffff, 0.5)
      STORAGE.scene.add(lightAmb)
    }

    createBackground() {
      const geometry = new THREE.BoxGeometry(15000, 15000, 15000)
      const material = new THREE.MeshLambertMaterial({color: 0x303848, side: THREE.DoubleSide, reflectivity: 0 })
      console.log(material)
      const cube = new THREE.Mesh(geometry, material)
      STORAGE.background = cube
      STORAGE.scene.add(cube)
    }

    updateAmbiance(step, chordsDatas, currentChord) {
      let targetColor
      step === 0 ? targetColor = new THREE.Color(0x303848) : ''
      step === 1 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][1]) : ''
      step === 2 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][2]) : ''
      step === 3 ? targetColor = new THREE.Color(chordsDatas.chords[currentChord][1][3]) : ''

      TweenLite.to( STORAGE.background.material.color, 0.6, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        ease: Power2.easeOut
      });
    }
}

export default Ambiance
