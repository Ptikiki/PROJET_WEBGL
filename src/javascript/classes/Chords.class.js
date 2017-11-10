import chordsDatas from '../datas/chordsDatas.js'
import TweenLite from 'gsap'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this

      this.keyDownListener = this.handleKeydown.bind(event, this)
      this.keyUpListener = this.handleKeyup.bind(event, this)
      this.nextSongListener = this.launchNextSong.bind(event, this)

      this.step = 0
      this.currentChord = 0
      this.boxIsOpen = false

      this.songToPlay
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
      window.addEventListener('keydown', that.keyDownListener)
      window.addEventListener('keyup', that.keyUpListener)
    }

    handleKeydown(that, event) {
      if (event.keyCode === 32) {
        return
      }
      if (that.keysPressedTab.indexOf(event.key) === -1 && that.keysPressedTab.length < 3) {
        that.keysPressedTab.push(event.key)

        if ( that.songToPlay) {
          TweenLite.to(that.songToPlay, 0.8, {
            volume: 0,
            onComplete: () => { that.songToPlay = null }
          })
        }
        if (that.nextSongToPlay) {
          TweenLite.to(that.nextSongToPlay, 0.8, {
            volume: 0,
            onComplete: () => { that.nextSongToPlay = null }
          })
        }

        chordsDatas.chords.forEach((chord, index) => {
          if (chord[0].indexOf(that.keysPressedTab[0]) !== -1) {
            that.currentChord = index
            that.checkChords()
          }
        })

        that.openBox()
        that.launchNote(chordsDatas.notes[event.key])
        that.setAmbiance()
        that.step === 3 ? that.launchSound(chordsDatas.chords[that.currentChord][2]) : ''
      }
    }

    handleKeyup(that, event) {
      if (event.keyCode === 32) {
        return
      }
      console.log('PERDU')
      window.removeEventListener('keydown', that.keyDownListener)
      window.removeEventListener('keyup', that.keyUpListener)
      !that.win ? that.openBox(true) : ''
      !that.win ? that.step = 0 : ''
      !that.win ? that.setAmbiance() : ''
      !that.win ? setTimeout( () => { that.enableGame() }, 1000) : ''
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
      let noteToPlay = new Audio(note)
      this.step === 0 ? noteToPlay.volume = 0.05 : ''
      this.step === 1 ? noteToPlay.volume = 0.10 : ''
      this.step === 2 ? noteToPlay.volume = 0.25 : ''
      this.step === 3 ? noteToPlay.volume = 0.60 : ''
      noteToPlay.play()
      this.boxIsOpen = false
    }

    launchSound(song) {
      console.log('GAGNE', song)
      this.win = true
      this.boxIsOpen = true

      this.songToPlay = new Audio(song)
      this.songToPlay.play()

      this.nextSongIndex = 1
      window.addEventListener('keydown', this.nextSongListener)

      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 4000)
    }

    launchNextSong(that, event) {
      if (event.keyCode === 32 && that.boxIsOpen) {
        that.nextSongToPlay ? that.nextSongToPlay.pause() : ''
        let indexSongToPlay = Math.round(Math.random() * (chordsDatas.songs[that.currentChord].length -1) )
        let song = chordsDatas.songs[that.currentChord][indexSongToPlay]

        that.nextSongToPlay = new Audio(song)
        that.songToPlay.pause()
        that.nextSongToPlay.play()
        that.nextSongIndex ++
        window.removeEventListener('keydown', that.nextSongListener)
        setTimeout( () => { window.addEventListener('keydown', that.nextSongListener) }, 500)
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
