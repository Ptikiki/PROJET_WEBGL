import chordsDatas from '../datas/chordsDatas.js'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this
      /*this.chordsTab = [
        // Orelsan ==> Grands Parents ==> mi, sol#, si // E5, G5#, B5
        [ 'm', 'j', 'c'],
        [ 'x', 'u', 's']
      ]*/

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

      for (let i = 0; i < chordsDatas.chords.length; i++ ) {

        // PLAYING NOTES // mieux ici ou à dupliquer dans les deux if-for ?
        for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
          if (event.key === chordsDatas.chords[i].notes[j].key) {
            let noteToPlay = new Audio(chordsDatas.chords[i].notes[j].src)
            noteToPlay.play()
          }
        }

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
      
/*      STORAGE.chordsClass.chordsTab.forEach((chord, index) => {
        if (STORAGE.chordsClass.chordIndexInProgress === null) {
          chord.forEach((note) => {
            if (event.key === note) {
              console.log(event.key, note, index)
              STORAGE.chordsClass.chordIndexInProgress = index
            }
          })
        }
        else if (STORAGE.chordsClass.chordIndexInProgress === index) {
          let noteIsOk = false
          chord.forEach((note) => {
            if (event.key === note) {
              noteIsOk = true
              if (STORAGE.chordsClass.chordTabInProgress.indexOf(note) === -1) {
                STORAGE.chordsClass.chordTabInProgress.push(note)
                if (STORAGE.chordsClass.chordTabInProgress.length === 3) {
                  console.log('OKKKKKKKKKKK')
                  // let songToPlay = new Audio(chordsDatas.chords[i].song)
                  // songToPlay.play()
                  window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                  window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  setTimeout(function() {
                    window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                    window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  }, 1000)
                }
              }
              console.log(event.key, note, index, 'HERE', STORAGE.chordsClass.chordTabInProgress)
            }
          })
          if (noteIsOk) {
            return
          } else {
            STORAGE.chordsClass.chordIndexInProgress = null
            STORAGE.chordsClass.chordTabInProgress = []
          }
        } 
      })*/

    }

    handleKeyup(event) {
      console.log("PERDU")
      STORAGE.chordsClass.chordIndexInProgress = null
      STORAGE.chordsClass.chordTabInProgress = []
    }
}

export default Chords
