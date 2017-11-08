import chordsDatas from '../datas/chordsDatas.js'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this
      this.keysPressedTab = []
      this.currentChord = null
      this.win = false

      this.prevVolumeLevel = 0.33
      this.volumeLvl = 0.33

      this.bind()
    }

    bind() {
      let that = this
      window.addEventListener('keydown', that.handleKeydown.bind(event, that))
      window.addEventListener('keyup', that.handleKeyup.bind(event, that))
    }

    handleKeydown(that, event) {
      if ( that.keysPressedTab.indexOf(event.key) === -1 && that.keysPressedTab.length < 3) {
        that.keysPressedTab.push(event.key)
        for (let i = 0; i < chordsDatas.chords.length; i++ ) {
          for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
            if (event.key === chordsDatas.chords[i].notes[j].key) {
              if (that.currentChord === null) {
                that.currentChord = i
              }
              that.volumeLvl = 0
              for (var k = 0; k < 3; k++) {
                if( that.keysPressedTab.indexOf(chordsDatas.chords[i].notes[k].key) !== -1) {
                  that.volumeLvl += 0.33
                }
              }
              console.log(that.volumeLvl, 'SOUND LEEVL')
              console.log(that.currentChord, 'currentChord')
              that.testPrevVolume()
              that.launchNote(chordsDatas.chords[i].notes[j].src)
            }
          }
        }
      }

      for (let i = 0; i < chordsDatas.chords.length; i++ ) {
        for (var j = 0; j < chordsDatas.chords[i].notes.length; j++) {
          if (that.keysPressedTab.indexOf(chordsDatas.chords[i].notes[j].key) !== -1 && !that.win && that.currentChord === i) {
            console.log('je suis dans accord ' , i)
            if (that.keysPressedTab.indexOf(chordsDatas.chords[i].notes[0].key) !== -1 && that.keysPressedTab.indexOf(chordsDatas.chords[i].notes[1].key) !== -1 && that.keysPressedTab.indexOf(chordsDatas.chords[i].notes[2].key) !== -1) {
              that.launchSound(chordsDatas.chords[i].song)
            }
          }
        }
      }
    }

    handleKeyup(that, event) {
      !that.win ? that.reset() : ''
    }

    launchNote(note) {
      let noteToPlay = new Audio(note)
      noteToPlay.volume = this.volumeLvl
      noteToPlay.play()
    }

    launchSound(song) {
      console.log('GAGNE')
      this.win = true

      let songToPlay = new Audio(song)
      songToPlay.play()

      window.removeEventListener('keydown', this.handleKeydown)
      window.removeEventListener('keyup', this.handleKeyup)

      setTimeout( () => {
        window.addEventListener('keydown', this.handleKeydown.bind(event, this))
        window.addEventListener('keyup', this.handleKeyup.bind(event, this))
        this.win = false
        this.reset(true)
      }, 3000)
    }

    testPrevVolume() {
      if (this.prevVolumeLevel > this.volumeLvl) {
        !this.win ? this.reset() : ''
      } else if (this.prevVolumeLevel < this.volumeLvl) {
        this.volumeLvl === 0.66 ? STORAGE.renderer.setClearColor( 0x9fcec2, 1) : ''
        this.volumeLvl === 0.99 ? STORAGE.renderer.setClearColor( 0x47d1ae, 1) : ''
      } else if (this.prevVolumeLevel === this.volumeLvl) {
        this.volumeLvl === 0.33 ? STORAGE.renderer.setClearColor( 0xf7f7f9, 1) : ''
      }
      this.prevVolumeLevel = this.volumeLvl
    }

    reset(noReset) {
      console.log('PERDU')
      this.keysPressedTab = []
      this.currentChord = null
      this.prevVolumeLevel = 0.33
      this.volumeLvl = 0.33
      noReset ? '' : STORAGE.renderer.setClearColor( 0xfcfcfc, 1)
    }
}

export default Chords
