class Particles {

    constructor(options) {
      STORAGE.ParticlesClass = this
      this.particlesTab = []
      this.particles, this.geometry, this.materials = [], this.parameters, this.color, this.size

      this.init()
    }

    init() {
      this.makeParticules()
    }

    makeParticules() {
      let that = this

      this.geometry = new THREE.Geometry()

      for ( let i = 0; i < 100; i ++ ) {
        let vertex = new THREE.Vector3()
        vertex.x = Math.random() * 2000 - 1000
        vertex.y = Math.random() * 2000 - 1000
        vertex.z = Math.random() * 2000 - 1000

        this.geometry.vertices.push( vertex )
      }

      this.parameters = [
        [ 0.3, 2 ],
        [ 0.4, 1.5 ],
        [ 0.5, 1 ],
        [ 0.6, 0.5 ],
        [ 0.7, 0.2 ]
      ]

      for ( let i = 0; i < this.parameters.length; i ++ ) {
        that.opacity = that.parameters[i][0]
        that.size  = that.parameters[i][1]

        that.materials[i] = new THREE.PointsMaterial( { size: that.size } )
        that.materials[i].transparent = true
        that.materials[i].opacity = that.opacity

        that.particles = new THREE.Points( that.geometry, that.materials[i] )

        that.particles.rotation.x = Math.random() * 6
        that.particles.rotation.y = Math.random() * 6
        that.particles.rotation.z = Math.random() * 6

        STORAGE.scene.add( that.particles )
        console.log(that.particles)
        that.particlesTab.push( that.particles )
      }
    }

    animate() {
      let that = this
      this.time = Date.now() * 0.00001

      for ( let i = 0; i < that.particlesTab.length; i ++ ) {
        that.object = that.particlesTab[i]
        if ( that.object instanceof THREE.Points ) {
          that.object.rotation.y = that.time * ( i < 4 ? i + 1 : - ( i + 1 ) )
        }
      }
    }
}

export default Particles
