class Chords {

    constructor(options) {
      STORAGE.chordsClass = this
      this.chordsTab = [
        [ 'm', 'j', 'c'],
        [ 'x', 'a', 's']
      ]
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
      STORAGE.chordsClass.chordsTab.forEach((chord, index) => {
        if (STORAGE.chordsClass.chordIndexInProgress === index) {
          let noteIsOk = false
          chord.forEach((note) => {
            if (event.key === note) {
              noteIsOk = true
              if (STORAGE.chordsClass.chordTabInProgress.indexOf(note) === -1) {
                STORAGE.chordsClass.chordTabInProgress.push(note)
                if (STORAGE.chordsClass.chordTabInProgress.length === 3) {
                  console.log('OKKKKKKKKKKK')
                  window.removeEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                  window.removeEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  setTimeout(function() {
                    window.addEventListener('keydown', STORAGE.chordsClass.handleKeydown)
                    window.addEventListener('keyup', STORAGE.chordsClass.handleKeyup)
                  }, 10000)
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
        } else if (STORAGE.chordsClass.chordIndexInProgress === null) {
          chord.forEach((note) => {
            if (event.key === note) {
              console.log(event.key, note, index)
              STORAGE.chordsClass.chordIndexInProgress = index
            }
          })
        }
      })
    }

    handleKeyup(event) {
      STORAGE.chordsClass.chordIndexInProgress = null
      STORAGE.chordsClass.chordTabInProgress = []
    }
}

export default Chords
