import chordsDatas from '../datas/chordsDatas.js'

class Audio {

  constructor( url, index ){
    console.log('API')
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
    this.urls = urls
    this.analyser = this.audioCtx.createAnalyser()
    this.frequencyData = new Uint8Array( this.analyser.frequencyBinCount )

    // chordsDatas.audioAPI[index].push(this)

    this.audioIndex = 0
    this.loadSound(this.urls, index)
  }

  loadSound(urls, index) {
    this.request = new XMLHttpRequest()
    this.request.open( 'GET', urls[this.audioIndex] , true )
    this.request.responseType = 'arraybuffer'

    // Decode asynchronously
    this.request.onload = function() {

      this.audioCtx.decodeAudioData( this.request.response, function( buffer ) {

        this.audioBuffersTab[index].push(buffer)
        this.analyserTab[index].push(this.analyser)
        this.audioSourceTab[index].push(this.audioSource)
        this.frequencyDataTab[index].push(this.frequencyData)

        if (this.audioIndex < this.urls.length - 1) {
          this.audioIndex ++
          this.loadSound(urls, index)
        }

      }.bind( this ), function(){
        alert( 'sound not loaded' )
      })
    }.bind( this )
    this.request.send()
  }

  // get all the 1024 entries of the table and make the average number
  getVolumeTotalMoyen() {
    var volumeTotal = 0
    for ( var i = 0; i < this.frequencyData.length; i++ ) {
      volumeTotal += this.frequencyData[i]
    }
    var volumeTotalMoyen = volumeTotal / this.frequencyData.length
    return volumeTotalMoyen
  }

  // get only the 600 firsts entries of the table and make the average number
  getHighFrequencies() {
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
  }
  stop(indexInTab, indexTab) {
    this.audioSourceTab[indexTab][indexInTab].stop()
  }

  stopWithSmooth(indexInTab, indexTab) {
    let that = this
    TweenLite.to(this.gainNode.gain, 0.6, {
      value: 0,
      onComplete: () => { that.audioSourceTab[indexTab][indexInTab].stop() }
    })

  }

  animate(indexInTab, indexTab) {
    this.analyserTab[indexTab][indexInTab].getByteFrequencyData( this.frequencyDataTab[indexTab][indexInTab] )

    // get datas from the treaments of the song to pass them to canvas elements and make them react with
    var volumeTotalMoyen = this.getVolumeTotalMoyen()
    var highFrequenciesMoyenne = this.getHighFrequencies()


    let rapidity = Math.round(volumeTotalMoyen + highFrequenciesMoyenne)

    if (indexTab === 0) {
      STORAGE.SceneShaderClass.OrelsanUniforms.u_time.value += rapidity / 2000.
    }
  }
}

export default Audio
