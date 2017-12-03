import chordsDatas from '../datas/chordsDatas.js'

class Audio {

  constructor( url, index ){
    STORAGE.AudioClass = this
    this.audioCtx = new AudioContext()
    this.audioBuffer
    this.audioSource
    this.analyser
    this.frequencyData
    this.request

    this.audioIndex

    this.audioBuffersTab = [ [], [], [] ]
    this.audioSourceTab = [ [], [], [] ]
    this.frequencyDataTab = [ [], [], [] ]
    this.analyserTab = [ [], [], [] ]
  }

  initAudio( urls, index ) {
    return new Promise((resolve, reject) => {
      this.urls = urls
      this.analyser = this.audioCtx.createAnalyser()

      this.audioIndex = 0
      this.loadSound(this.urls, index, resolve)
    })
  }

  loadSound(urls, index, resolve) {
    this.request = new XMLHttpRequest()
    this.request.open( 'GET', urls[this.audioIndex] , true )
    this.request.responseType = 'arraybuffer'

    // Decode asynchronously
    this.request.onload = function() {

      this.audioCtx.decodeAudioData( this.request.response, function( buffer ) {

        this.audioBuffersTab[index].push(buffer)
        this.analyserTab[index].push(this.analyser)

        if (this.audioIndex < this.urls.length - 1) {
          this.audioIndex ++
          this.loadSound(urls, index, resolve)
        } else {
          this.audioIndex = 0
          resolve()
        }

      }.bind( this ), function(){
        alert( 'sound not loaded' )
      })
    }.bind( this )
    this.request.send()
  }

  // get all the 1024 entries of the table and make the average number
  getVolumeTotalMoyen(indexInTab, indexTab ) {
    var volumeTotal = 0
    for ( var i = 0; i < this.frequencyData.length; i++ ) {
      volumeTotal += this.frequencyData[i]
    }
    var volumeTotalMoyen = volumeTotal / this.frequencyData.length
    return volumeTotalMoyen
  }

  // get only the 600 firsts entries of the table and make the average number
  getHighFrequencies(indexInTab, indexTab) {
    var highFrequencies = 0
    for ( var i = 0; i < 600; i++ ) {
      highFrequencies += this.frequencyData[i]
    }
    var highFrequenciesMoyenne = highFrequencies / 600
    return highFrequenciesMoyenne
  }

  play(indexInTab, indexTab) {
    this.audioSourceTab[indexTab][indexInTab] = this.audioCtx.createBufferSource()
    this.audioSourceTab[indexTab][indexInTab].buffer = this.audioBuffersTab[indexTab][indexInTab]

    this.gainNode = this.audioCtx.createGain()
    this.gainNode.gain.value = 1 // 100 %
    this.gainNode.connect(this.audioCtx.destination)

    // connect the audio source to context's output
    this.audioSourceTab[indexTab][indexInTab].connect( this.analyserTab[indexTab][indexInTab] )
    this.analyserTab[indexTab][indexInTab].connect( this.gainNode )

    this.audioSourceTab[indexTab][indexInTab].start()

    this.frequencyData = new Uint8Array( this.analyserTab[indexTab][indexInTab].frequencyBinCount )
  }

  stop(indexInTab, indexTab) {
    this.audioSourceTab[indexTab][indexInTab].stop()
  }

  stopWithSmooth() {
    let that = this
    TweenLite.to(this.gainNode.gain, 0.6, {
      value: 0,
      onComplete: () => {
        that.audioSourceTab.forEach((audiotab)=> {
          audiotab.forEach((audio) => {
            audio.stop()
          })
        })
      }
    })
  }

  lowVolume() {
    if (this.gainNode) {
      TweenLite.to(this.gainNode.gain, 0.6, {
        value: 0.10
      })
    }
  }

  upVolume() {
    if (this.gainNode) {
      TweenLite.to(this.gainNode.gain, 0.6, {
        value: 1
      })
    }
  }

  animate(indexInTab, indexTab) {
    this.analyserTab[indexTab][indexInTab].getByteFrequencyData( this.frequencyData )

    // get datas from the treaments of the song to pass them to canvas elements and make them react with
    var volumeTotalMoyen = this.getVolumeTotalMoyen(indexInTab, indexTab)
    var highFrequenciesMoyenne = this.getHighFrequencies(indexInTab, indexTab)

    let rapidity = Math.round(volumeTotalMoyen + highFrequenciesMoyenne)

    if (indexTab === 0 && STORAGE.SceneShaderClass.OrelsanUniforms) {
      STORAGE.SceneShaderClass.OrelsanUniforms.u_time.value += rapidity / 2000.
    }

    if (indexTab === 1 && STORAGE.SceneShaderClass.MlleKUniforms) {
      STORAGE.SceneShaderClass.MlleKUniforms.u_time.value += rapidity / 1500.
    }

    if (indexTab === 2 &&
      STORAGE.SceneShaderClass.petitBiscuitUniformsEcran &&
      STORAGE.SceneShaderClass.petitBiscuitUniformsSphere &&
      STORAGE.SceneShaderClass.petitBiscuitUniformsGround) {
      STORAGE.SceneShaderClass.petitBiscuitUniformsEcran.u_time.value += rapidity / 1500.
      STORAGE.SceneShaderClass.petitBiscuitUniformsSphere.u_time.value += rapidity / 400.
      STORAGE.SceneShaderClass.petitBiscuitUniformsGround.u_time.value += rapidity / 800.
    }
  }
}

export default Audio
