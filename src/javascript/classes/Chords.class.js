import chordsDatas from '../datas/chordsDatas.js'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this

      this.keyDownListener = this.handleKeydown.bind(event, this)
      this.keyUpListener = this.handleKeyup.bind(event, this)

      this.step = 0

      this.enableGame()
    }

    enableGame() {
      console.log('GAME ENABLE')
      let that = this
      that.keysPressedTab = []
      that.currentChord = null
      this.win = false
      that.step = 0
      that.setAmbiance()
      window.addEventListener('keydown', that.keyDownListener)
      window.addEventListener('keyup', that.keyUpListener)
    }

    handleKeydown(that, event) {
      if (that.keysPressedTab.indexOf(event.key) === -1 && that.keysPressedTab.length < 3) {
        that.keysPressedTab.push(event.key)

        chordsDatas.chords.forEach((chord, index) => {
          if (chord[0].indexOf(that.keysPressedTab[0]) !== -1) {
            that.currentChord = index
            that.checkCords()
          }
        })

        that.launchNote(chordsDatas.notes[event.key])
        that.setAmbiance()
        that.step === 3 ? that.launchSound(chordsDatas.chords[that.currentChord][2]) : ''
      }
    }

    handleKeyup(that, event) {
      console.log('PERDU')
      window.removeEventListener('keydown', that.keyDownListener)
      window.removeEventListener('keyup', that.keyUpListener)
      !that.win ? that.step = 0 : ''
      !that.win ? that.setAmbiance() : ''
      !that.win ? setTimeout( () => { that.enableGame() }, 500) : ''
    }

    checkCords() {
      this.step = 0
      let numbreOfNotesOk = 0
      this.keysPressedTab.forEach((key) => {
        if (chordsDatas.chords[this.currentChord][0].indexOf(key) !== -1){
          numbreOfNotesOk ++
          this.volume += 0.33
        }
      })

      this.keysPressedTab.length > numbreOfNotesOk ? numbreOfNotesOk = 0 : ''
      this.step = numbreOfNotesOk
    }

    launchNote(note) {
      console.log(this.step, 'STEP')
      let noteToPlay = new Audio(note)
      this.step === 0 ? noteToPlay.volume = 0.05 : ''
      this.step === 1 ? noteToPlay.volume = 0.10 : ''
      this.step === 2 ? noteToPlay.volume = 0.25 : ''
      this.step === 3 ? noteToPlay.volume = 0.60 : ''
      noteToPlay.play()
    }

    launchSound(song) {
      console.log('GAGNE', song)
      this.win = true

      let songToPlay = new Audio(song)
      songToPlay.play()

      window.removeEventListener('keydown', this.keyDownListener)
      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 10000)
    }

    setAmbiance() {
      this.step === 0 ? STORAGE.renderer.setClearColor( 0xfcfcfc, 1) : ''
      this.step === 1 ? STORAGE.renderer.setClearColor( 0xb5e2d7, 1) : ''
      this.step === 2 ? STORAGE.renderer.setClearColor( 0x65c6ae, 1) : ''
      this.step === 3 ? STORAGE.renderer.setClearColor( 0x47d1ae, 1) : ''
    }

}

export default Chords
