class Ambiance {
    constructor(options) {
      STORAGE.AmbianceClass = this
      this.createLight()
      this.createBackground()
    }

    createLight() {
      const light = new THREE.PointLight(0xffffff, 0.2, Infinity)
      light.position.set(-200, 900, 100)
      STORAGE.scene.add(light)
      const lightAmb = new THREE.AmbientLight(0xbbbbbb)
      STORAGE.scene.add(lightAmb)
    }

    createBackground() {
      const geometry = new THREE.BoxGeometry(5000, 5000, 5000)
      const material = new THREE.MeshBasicMaterial({color: 0xfcfcfc, side: THREE.DoubleSide })
      const cube = new THREE.Mesh(geometry, material)
      STORAGE.background = cube
      STORAGE.scene.add(cube)
    }

    updateAmbiance(step, chordsDatas, currentChord) {
      let targetColor
      step === 0 ? targetColor = new THREE.Color(0xfcfcfc) : ''
      // step === 0 ? targetColor = new THREE.Color(0x222222) : ''
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
