import chordsDatas from '../datas/chordsDatas.js'
import OrelsanScene from '../classes/OrelsanScene.class.js'
import TweenLite from 'gsap'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this

      this.keyDownListener = this.handleKeydown.bind(event, this)
      this.keyUpListener = this.handleKeyup.bind(event, this)

      this.step = 0
      this.currentChord = 0

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

            /*STORAGE.scene.children.forEach((child, index) => {
              if (child.name === 'base_boite' || child.name === 'couvercle_boite') {
                return
              } 
              else if (child.type === 'Mesh' || child.type === 'Group') {
                STORAGE.scene.remove(child)
              }

              if (chord[3] === "Orelsan") {
                new OrelsanScene()
              }
            })*/
            
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
      !that.win ? setTimeout( () => { that.enableGame() }, 500) : ''
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

      let songToPlay = new Audio(song)
      songToPlay.play()

      window.removeEventListener('keydown', this.keyDownListener)
      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 10000)
    }

    setAmbiance() {
      STORAGE.AmbianceClass.updateAmbiance(this.step, chordsDatas, this.currentChord)
    }

    openBox(close) {
      let step = close ? 0 : this.step
      STORAGE.BoxClass.openBox(step)
    }

}

export default Chords
