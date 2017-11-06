import chordsDatas from '../datas/chordsDatas.js'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this
      this.keysPressedTab = []
      this.win = false

      this.bind()
    }

    bind() {
      let that = this
      window.addEventListener('keydown', that.handleKeydown)
      window.addEventListener('keyup', that.handleKeyup)
    }

    handleKeydown(event) {

      //console.log(event.key)
      if ( STORAGE.chordsClass.keysPressedTab.indexOf(event.key) === -1 && STORAGE.chordsClass.keysPressedTab.length < 3) {
        STORAGE.chordsClass.keysPressedTab.push(event.key)
        for (let i = 0; i < chordsDatas.chords.length; i++ ) {
          // PLAYING NOTES // mieux ici ou à dupliquer dans les deux if-for ?
          for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
            if (event.key === chordsDatas.chords[i].notes[j].key) {
              let noteToPlay = new Audio(chordsDatas.chords[i].notes[j].src)
              noteToPlay.play()
           }
          }
        }
      }

      for (let i = 0; i < chordsDatas.chords.length; i++ ) {
        for (var j = 0; j < chordsDatas.chords[i].notes.length; j++) {

          if (STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[j].key) !== -1 && !STORAGE.chordsClass.win) {
            console.log('je suis dans accord ' , i)
            if (STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[0].key) !== -1 && STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[1].key) !== -1 && STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[2].key) !== -1) {
              console.log('GAGNE')
              STORAGE.chordsClass.win = true
              STORAGE.chordsClass.keysPressedTab = []
              let songToPlay = new Audio(chordsDatas.chords[i].song)
              songToPlay.play()
              window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
              window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
              setTimeout(function() {
                window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                STORAGE.chordsClass.win = false
              }, 10000)
            }

          }
        }
      }

      // for (let i = 0; i < chordsDatas.chords.length; i++ ) {
      //   if (STORAGE.chordsClass.chordIndexInProgress === null) {
      //     for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
      //       if (STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[j].key) === -1) {
      //         STORAGE.chordsClass.chordIndexInProgress = i
      //       }
      //     }
      //   }
      //   else if (STORAGE.chordsClass.chordIndexInProgress === i) {
      //     let noteIsOk = false
      //     for (let j = 0; j < chordsDatas.chords[i].notes.length; j++ ) {
      //       if (STORAGE.chordsClass.keysPressedTab.indexOf(chordsDatas.chords[i].notes[j].key) === -1) {
      //         noteIsOk = true
      //         if (STORAGE.chordsClass.chordTabInProgress.indexOf(chordsDatas.chords[i].notes[j].key) === -1) {
      //           STORAGE.chordsClass.chordTabInProgress.push(chordsDatas.chords[i].notes[j].key)
      //           let noteToPlay = new Audio(chordsDatas.chords[i].notes[j].src)
      //           noteToPlay.play()
      //           console.log('jajoute', chordsDatas.chords[i].notes[j].key, STORAGE.chordsClass.chordTabInProgress)
      //                         console.log("CHORD EN COURS", STORAGE.chordsClass.chordTabInProgress)

      //           if (STORAGE.chordsClass.chordTabInProgress.length === 3) {
      //             console.log('GAGNE')
      //             let songToPlay = new Audio(chordsDatas.chords[i].song)
      //             songToPlay.play()
      //             window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
      //             window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
      //             setTimeout(function() {
      //               window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
      //               window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
      //             }, 1000)
      //           }
      //         }
      //       }
      //     }
      //     if (noteIsOk) {
      //       return
      //     } else {
      //       console.log("PERDU")
      //       STORAGE.chordsClass.chordIndexInProgress = null
      //       STORAGE.chordsClass.keysPressedTab = []
      //     }
      //   }
      // }
    }

    handleKeyup(event) {
      console.log("PERDU")
      STORAGE.chordsClass.keysPressedTab = []
    }
}

export default Chords
