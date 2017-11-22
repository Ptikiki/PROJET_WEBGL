import specifications from '../datas/sceneSpecifications.js'

class Ambiance {
    constructor(options) {
      STORAGE.AmbianceClass = this
      this.light1
      this.light2
      this.light3

      this.createLight()
      this.createBackground()
    }

    createLight() {
      this.light1 = new THREE.PointLight(0xffffff, 0.07, 0, 2)
      this.light1.position.set(500, 1800, 800)
      this.light1.rotation.set(0, Math.PI, Math.PI)

      let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024

      this.light1.castShadow = true
      this.light1.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light1.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light1.shadow.camera.far = 10000

      STORAGE.scene.add(this.light1)

      this.light2 = new THREE.PointLight(0xffffff, 0.02, 0, 2)

      this.light2.position.set(0, 1000, 0)
      this.light2.rotation.set(0, Math.PI, Math.PI)
      this.light2.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light2.shadow.camera.far = 10000

      STORAGE.scene.add(this.light2)

      this.light3 = new THREE.PointLight(0xffffff, 0.03, 0, 2)

      this.light3.position.set(-1300, 1000, 0)
      this.light3.rotation.set(0, Math.PI, Math.PI)
      this.light3.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light3.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light3.shadow.camera.far = 10000

      STORAGE.scene.add(this.light3)

      const lightAmb = new THREE.AmbientLight(0xffffff, 0.4)
      STORAGE.scene.add(lightAmb)
    }

    createBackground() {
      const geometry = new THREE.BoxGeometry(15000, 15000, 15000)
      const material = new THREE.MeshLambertMaterial({color: 0x303848, side: THREE.DoubleSide, reflectivity: 0 })
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
      STORAGE.box.children.forEach((mesh)=>{
        TweenLite.to( mesh.material.color, 0.6, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          ease: Power2.easeOut
        });
      })
      STORAGE.boxCouvercle.children.forEach((mesh)=>{
        TweenLite.to( mesh.material.color, 0.6, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          ease: Power2.easeOut
        });
      })

      this.updateLights(step, currentChord)
    }

    updateLights(step, currentChord) {
      if (step === 0) {
        this.light1.color.set(0xffffff)
        this.light2.color.set(0xffffff)
        this.light3.color.set(0xffffff)
        this.light1.intensity = 0.07
        this.light2.intensity = 0.02
        this.light3.intensity = 0.03
      } else if (step === 3 && currentChord == 0) {
        this.light1.color.set(specifications[currentChord].light1)
        this.light2.color.set(specifications[currentChord].light2)
        this.light3.color.set(specifications[currentChord].light3)
        this.light1.intensity = 0.35
        this.light2.intensity = 0.22
        this.light3.intensity = 0.15
      } else if (step === 3 && currentChord == 2) {
        this.light1.color.set(specifications[currentChord].light1)
        this.light2.color.set(specifications[currentChord].light2)
        this.light3.color.set(specifications[currentChord].light3)
        this.light1.intensity = 0.30
        this.light2.intensity = 0.27
        this.light3.intensity = 0.08
      }
    }
}

export default Ambiance
