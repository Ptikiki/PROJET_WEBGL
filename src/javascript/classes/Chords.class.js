import chordsDatas from '../datas/chordsDatas.js'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this
      this.chordIndexInProgress = null
      this.chordTabInProgress = []
    
      this.bind()
    }

    bind() {
      let that = this
      window.addEventListener('keydown', that.handleKeydown)
      window.addEventListener('keyup', that.handleKeyup)
    }

    handleKeydown(event) {
      console.log(event.keyCode)

      for (let i = 0; i < chordsDatas.chords.length; i++ ) {
        if (STORAGE.chordsClass.chordIndexInProgress === null) {
          for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
            if (event.key === chordsDatas.chords[i].notes[j].key) {
              STORAGE.chordsClass.chordIndexInProgress = i
            }
          }
        }
        else if (STORAGE.chordsClass.chordIndexInProgress === i) {
          let noteIsOk = false
          for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
            if (event.key === chordsDatas.chords[i].notes[j].key) {
              noteIsOk = true
              if (STORAGE.chordsClass.chordTabInProgress.indexOf(chordsDatas.chords[i].notes[j].key) === -1) {
                STORAGE.chordsClass.chordTabInProgress.push(chordsDatas.chords[i].notes[j].key)
                let noteToPlay = new Audio(chordsDatas.chords[i].notes[j].src)
                noteToPlay.play()
                console.log('jajoute', chordsDatas.chords[i].notes[j].key, STORAGE.chordsClass.chordTabInProgress)
                window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                setTimeout(function() {
                  window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                  window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                }, 100)
                if (STORAGE.chordsClass.chordTabInProgress.length === 3) {
                  console.log('GAGNE')
                  let songToPlay = new Audio(chordsDatas.chords[i].song)
                  songToPlay.play()
                  window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                  window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  setTimeout(function() {
                    window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                    window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  }, 1000)
                }
              }
            }
          }
          if (noteIsOk) {
            return
          } else {
            console.log("PERDU")
            STORAGE.chordsClass.chordIndexInProgress = null
            STORAGE.chordsClass.chordTabInProgress = []
          }
        }
      }
    }

    handleKeyup(event) {
      console.log("PERDU")
      STORAGE.chordsClass.chordIndexInProgress = null
      STORAGE.chordsClass.chordTabInProgress = []
    }
}

export default Chords
