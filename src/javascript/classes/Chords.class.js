import chordsDatas from '../datas/chordsDatas.js'
import TweenLite from 'gsap'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this

      this.keyDownListener = this.handleKeydown.bind(event, this)
      this.keyUpListener = this.handleKeyup.bind(event, this)
      this.nextSongListener = this.nextSong.bind(event, this)

      this.step = 0
      this.currentChord = 0

      this.nextSongToPlay

      this.enableGame()
    }

    enableGame() {
      console.log('GAME ENABLE')
      let that = this
      that.keysPressedTab = []
      that.currentChord = 0
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
            that.checkChords()
          }
        })

        that.launchNote(chordsDatas.notes[event.key])
        that.setAmbiance()
        that.openBox()
        that.step === 3 ? that.launchSound(chordsDatas.chords[that.currentChord][2]) : ''
      }

      

    }

    handleKeyup(that, event) {
      console.log('PERDU')
      window.removeEventListener('keydown', that.keyDownListener)
      window.removeEventListener('keyup', that.keyUpListener)
      !that.win ? that.openBox(true) : ''
      !that.win ? that.step = 0 : ''
      !that.win ? that.setAmbiance() : ''
      !that.win ? setTimeout( () => { that.enableGame() }, 1000) : ''
      that.win ? that.nextSongIndex = 1 : ''
      that.win ? window.addEventListener('keydown', that.nextSongListener) : ''
    }

    checkChords() {
      this.step = 0
      let numberOfNotesOk = 0
      this.keysPressedTab.forEach((key) => {
        if (chordsDatas.chords[this.currentChord][0].indexOf(key) !== -1){
          numberOfNotesOk ++
        }
      })

      this.keysPressedTab.length > numberOfNotesOk ? numberOfNotesOk = 0 : ''
      this.step = numberOfNotesOk
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

      this.songToPlay = new Audio(song)
      this.songToPlay.play()

      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 4000)
    }

    nextSong(that, event) {

      if ( event.keyCode === 32 ) {

        that.nextSongToPlay ? that.nextSongToPlay.pause() : ''

        let song = chordsDatas.chords[that.currentChord][2+that.nextSongIndex]
        that.nextSongToPlay = new Audio(song)
        that.songToPlay.pause()
        that.nextSongToPlay.play()
        that.nextSongIndex ++
        window.removeEventListener('keydown', that.nextSongListener)
        setTimeout( () => { window.addEventListener('keydown', that.nextSongListener) }, 4000)
      }
    }

    setAmbiance() {
      STORAGE.AmbianceClass.updateAmbiance(this.step, chordsDatas, this.currentChord)
    }

    openBox(close) {
      let step = close ? 0 : this.step
      STORAGE.SceneManager.setSceneIndex(this.currentChord)
      STORAGE.SceneManager.displayScene(step)
      STORAGE.BoxClass.openBox(step)
    }

}

export default Chords
