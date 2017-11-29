const MTLLoader = require('three-mtl-loader')

class Particles {

    constructor(options) {
      STORAGE.ParticlesClass = this
      this.particlesTab = []

      this.init()
    }

    init() {
      this.makeParticules()
    }

    makeParticules() {
      let that = this

      this.geometry = new THREE.SphereGeometry( 5, 10, 10 )

      for ( let i = 0; i < 200; i ++ ) {
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
        let particle = new THREE.Mesh( that.geometry, material )
        particle.position.set( Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*10000 )
        STORAGE.scene.add( particle )
        that.particlesTab.push( particle )
      }
    }

    animate() {
      for ( let i = 0; i < this.particlesTab.length / 2; i ++ ) {
        let particle = this.particlesTab[i]
        particle.position.x += Math.random() * window.innerWidth / 1000
      }
      for ( let i = this.particlesTab.length / 2; i < this.particlesTab.length; i ++ ) {
        let particle = this.particlesTab[i]
        particle.position.x -= Math.random() * window.innerWidth / 1000
      }
    }
}

export default Particles
