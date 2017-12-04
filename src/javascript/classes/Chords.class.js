import chordsDatas from '../datas/chordsDatas.js'
import TweenLite from 'gsap'

class Chords {

    constructor(options) {
      STORAGE.chordsClass = this

      this.keyDownListener = this.handleKeydown.bind(event, this)
      this.keyUpListener = this.handleKeyup.bind(event, this)
      this.nextSongListener = this.launchNextSong.bind(event, this)

      this.tutoMode = true

      this.step = 0
      this.currentChord = 0
      this.boxIsOpen = false

      this.songPlaying = false
      this.currentSongPlayingIndex = 0

      this.currentSongPlayingIndexSave
      this.currentChordSave

      this.previewStarted = false

      this.numberArtistFound = 0
      this.numberArtist = 3

      this.nextButton = document.querySelector('.songCarateristics .songsName .next-button')
      this.artistNameText = document.querySelector('.songCarateristics .songsName .artist')
      this.songNameText = document.querySelector('.songCarateristics .songsName .song')
      this.artistsLibraryContainer = document.querySelector('.artistsLibrary')

      this.lettersText = [
        document.querySelector('.songCarateristics .letters span.one'),
        document.querySelector('.songCarateristics .letters span.two'),
        document.querySelector('.songCarateristics .letters span.three')
      ]

      this.bind()
      this.setArtistFound()
      this.enableTuto()
    }

    bind() {
      window.setInterval(this.checkPreviewState.bind(event, this), 1000)
      this.nextButtonClickListener = this.handleNextButtonClick.bind(event, this)
      this.nextButton.addEventListener('click', this.nextButtonClickListener)
    }

    addListerners() {
      window.addEventListener('keydown', this.keyDownListener)
      window.addEventListener('keyup', this.keyUpListener)
      window.addEventListener('keydown', this.nextSongListener)
    }

    removeListerners() {
      window.removeEventListener('keydown', this.keyDownListener)
      window.removeEventListener('keyup', this.keyUpListener)
      window.removeEventListener('keydown', this.nextSongListener)
    }

    setArtistFound() {
      STORAGE.InterfaceClass.library_button.querySelector('.found').innerText = this.numberArtistFound
      STORAGE.InterfaceClass.library_button.querySelector('.total').innerText = this.numberArtist
    }

    enableTuto() {
      console.log('TUTO ENABLE')
      let that = this
      that.keysPressedTutoTab = []
      window.addEventListener('keydown', that.keyDownListener)
      window.addEventListener('keyup', that.keyUpListener)
    }

    enableGame() {
      console.log('GAME ENABLE')
      let that = this
      that.keysPressedTab = []
      this.win = false
      that.step = 0

      if (!STORAGE.InterfaceClass.gamePaused) {
        window.addEventListener('keydown', that.keyDownListener)
        window.addEventListener('keyup', that.keyUpListener)
      }
    }

    handleKeydown(that, event) {
      if (event.keyCode === 32) {
        return
      }

      if (that.tutoMode === true) {
        if (that.keysPressedTutoTab.indexOf(event.key) === -1 && that.keysPressedTutoTab.length < 3) {
          that.keysPressedTutoTab.push(event.key)
          chordsDatas.tuto.forEach((chord, index) => {
            if (chord.indexOf(that.keysPressedTutoTab[0]) !== -1) {
              that.checkTuto(event.key)
            }
          })
          that.launchNote(chordsDatas.notes[event.key])
        }
        return
      }

      that.currentSongPlayingIndexSave = that.currentSongPlayingIndex
      that.currentChordSave = that.currentChord

      if (that.keysPressedTab.indexOf(event.key) === -1 && that.keysPressedTab.length < 3 && !that.tutoMode) {
        that.keysPressedTab.push(event.key)

        let noteInAChord = false
        chordsDatas.chords.forEach((chord, index) => {
          if (chord[0].indexOf(that.keysPressedTab[0]) !== -1 ) {
            that.currentChord = index
            that.checkChords(event.key)
            noteInAChord = true
          }
        })

        if (!noteInAChord && event.keyCode >= 65 && event.keyCode <= 90) {
          that.setLetters(event.key, false)
        }

        if (!STORAGE.BoxClass.openIsImpossible) {
          console.log('je passe')
          that.openBox()
          that.launchNote(chordsDatas.notes[event.key])
          that.setAmbiance()
          that.step === 3 ? that.launchSound() : ''
        }
      }

    }

    handleKeyup(that, event) {
      if (event.keyCode === 32) {
        return
      }
      if (that.tutoMode === true) {
        console.log('PERDU')
        window.removeEventListener('keydown', that.keyDownListener)
        window.removeEventListener('keyup', that.keyUpListener)
        that.setLetters(0)
        setTimeout( () => { that.enableTuto() }, 300)
      } else {
        window.removeEventListener('keydown', that.keyDownListener)
        window.removeEventListener('keyup', that.keyUpListener)
        console.log(that.step)

        if (that.step === 0) {
          that.enableGame()
        } else {
          !that.win ? setTimeout( () => { that.enableGame() }, 650) : ''
        }

        !that.win ? that.step = 0 : ''
        !that.win ? that.openBox(true) : ''
        !that.win ? that.setAmbiance() : ''
        !that.win ? that.setSongName() : ''
        !that.win ? that.setArtistName() : ''
        !that.win ? that.setLetters(0) : ''
      }
    }

    checkTuto(key) {
      let that = this
      let numberOfNotesOk = 0
      this.keysPressedTutoTab.forEach((key) => {
        if (chordsDatas.tuto.indexOf(key) !== -1){
          numberOfNotesOk ++
        }
      })
      if (this.keysPressedTutoTab.length > numberOfNotesOk) {
        numberOfNotesOk = 0
        this.setLetters(0)
      } else {
        this.setLetters('tuto', true)
      }

      if (numberOfNotesOk === 3) {
        window.removeEventListener('keydown', that.keyDownListener)
        window.removeEventListener('keyup', that.keyUpListener)
        that.tutoMode = false
        setTimeout(() => {
          that.enableGame()
          that.setLetters(0)
          STORAGE.InterfaceClass.beginGame()
        }, 2000)

      }
    }

    checkChords(key) {
      this.step = 0
      let numberOfNotesOk = 0
      this.keysPressedTab.forEach((key) => {
        if (chordsDatas.chords[this.currentChord][0].indexOf(key) !== -1){
          numberOfNotesOk ++
        }
      })
      if (this.keysPressedTab.length > numberOfNotesOk) {
        numberOfNotesOk = 0
        this.setLetters(0)
      } else {
        this.setLetters('game', true)
      }
      this.step = numberOfNotesOk
    }

    launchNote(note) {
      let noteToPlay = new Audio(note)
      this.step === 0 ? noteToPlay.volume = 0.15 : ''
      this.step === 1 ? noteToPlay.volume = 0.25 : ''
      this.step === 2 ? noteToPlay.volume = 0.40 : ''
      this.step === 3 ? noteToPlay.volume = 0.55 : ''
      noteToPlay.play()
      this.boxIsOpen = false
    }

    launchSound() {
      console.log('GAGNE')
      this.win = true
      this.boxIsOpen = true

      this.songPlaying = true

      STORAGE.AudioClass.play(0, this.currentChord)
      this.currentSongPlayingIndex = 0

      this.setSongName(chordsDatas.songsName[this.currentChord][0])
      this.setArtistName(chordsDatas.artists[this.currentChord])
      this.setLetters(1)

      this.updateLibrary()

      window.addEventListener('keydown', this.nextSongListener)

      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 3000)
    }

    launchNextSong(that, event) {
      if ( (event.keyCode === 32 || event === 32) && that.boxIsOpen) {

        let newIndexSongToPlay = Math.round(Math.random() * (chordsDatas.songs[that.currentChord].length -1) )
        let song = chordsDatas.songs[that.currentChord][newIndexSongToPlay]

        that.setSongName(chordsDatas.songsName[that.currentChord][newIndexSongToPlay])

        STORAGE.AudioClass.stop(that.currentSongPlayingIndex, that.currentChord)
        STORAGE.AudioClass.play(newIndexSongToPlay, that.currentChord)
        that.currentSongPlayingIndex = newIndexSongToPlay

        that.previewStartedTime = Math.round(Date.now() / 1000)
        that.previewStarted = true

        window.removeEventListener('keydown', that.nextSongListener)
        setTimeout( () => { window.addEventListener('keydown', that.nextSongListener) }, 500)
      }
    }

    handleNextButtonClick(that, event) {
      that.launchNextSong(that, 32)
    }

    checkPreviewState(that) {
      if (that.previewStarted) {
        if ( Math.round(Date.now() / 1000) - that.previewStartedTime > 25 ) {
          that.launchNextSong(that, 32)
        }
      }
    }

    setAmbiance() {
      if (!STORAGE.BoxClass.openIsImpossible) {
        STORAGE.AmbianceClass.updateAmbiance(this.step, chordsDatas, this.currentChord)
      }
    }

    openBox(close) {
      console.log('HERE')
      let step
      if (close) {
        step = 0
        this.previewStarted = false
      } else {
        step = this.step
      }
      STORAGE.SceneManager.setSceneIndex(this.currentChord)
      STORAGE.SceneManager.displayScene(step)
      STORAGE.BoxClass.openBox(step)
    }

    setArtistName(artistName) {
      if (artistName) {
        TweenLite.to([this.artistNameText, this.nextButton], 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            this.artistNameText.innerText = artistName
            let src
            let clasName
            this.currentChord === 0 ? src = 'assets/next_mademoisellek.svg' : ''
            this.currentChord === 1 ? src = 'assets/next_mademoisellek.svg' : ''
            this.currentChord === 2 ? src = 'assets/next_petitbiscuit.svg' : ''
            this.currentChord === 0 ? clasName = 'gray' : ''
            this.currentChord === 1 ? clasName = 'yellow' : ''
            this.currentChord === 2 ? clasName = 'pink' : ''
            this.nextButton.setAttribute('src', src)
            this.artistNameText.classList.remove('pink', 'yellow', 'gray')
            this.artistNameText.classList.add(clasName)
            TweenLite.to([this.artistNameText, this.nextButton], 0.3, {
              opacity: 1,
              ease: Power2.easeInOut,
            })
          }
        })
      } else {
        TweenLite.to([this.artistNameText, this.nextButton], 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => { this.artistNameText.innerText = '' }
        })
      }
    }

    setSongName(songName) {
      if (songName) {
        TweenLite.to(this.songNameText, 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            this.songNameText.innerText = songName
            TweenLite.to(this.songNameText, 0.3, {
              opacity: 1,
              ease: Power2.easeInOut,
            })
          }
        })
      } else {
        TweenLite.to(this.songNameText, 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => { this.songNameText.innerText = '' }
        })
      }
    }

    setLetters(letter, goodLetter) {
      if (typeof letter === 'string' && goodLetter) { // good letter
        if (letter === 'tuto') {
          this.keysPressedTutoTab[0] ? this.lettersText[0].innerText = this.keysPressedTutoTab[0] : ''
          this.keysPressedTutoTab[1] ? this.lettersText[1].innerText = this.keysPressedTutoTab[1] : ''
          this.keysPressedTutoTab[2] ? this.lettersText[2].innerText = this.keysPressedTutoTab[2] : ''

          TweenLite.set(this.lettersText[this.keysPressedTutoTab.length - 1], {
            y: 20,
            onComplete : () => {
              TweenLite.to(this.lettersText[this.keysPressedTutoTab.length - 1], 0.2, {
                opacity: 1,
                y: 0,
                ease: Power2.easeInOut
              })
            }
          })

        } else if (letter === 'game') {
          this.keysPressedTab[0] ? this.lettersText[0].innerText = this.keysPressedTab[0] : ''
          this.keysPressedTab[1] ? this.lettersText[1].innerText = this.keysPressedTab[1] : ''
          this.keysPressedTab[2] ? this.lettersText[2].innerText = this.keysPressedTab[2] : ''

          TweenLite.set(this.lettersText[this.keysPressedTab.length - 1], {
            y: 20,
            onComplete : () => {
              TweenLite.to(this.lettersText[this.keysPressedTab.length - 1], 0.2, {
                opacity: 1,
                y: 0,
                ease: Power2.easeInOut
              })
            }
          })
        }

      } else if (typeof letter === 'string' && !goodLetter) { // wrong letter
        TweenLite.to(this.lettersText, 0.2, {
          opacity: 0,
          y: 20,
          ease: Power2.easeInOut,
          onComplete: () => {
            let randomIndex = Math.round(Math.random() * 2)
            this.lettersText[randomIndex].innerText = letter
            this.lettersText[0].setAttribute('class', 'one')
            this.lettersText[1].setAttribute('class', 'two')
            this.lettersText[2].setAttribute('class', 'three')
            TweenLite.to(this.lettersText[randomIndex], 0.2, {
              opacity: 1,
              y: 0,
              ease: Power2.easeInOut
            })
          }
        })

      } else if (letter === 0) { // remove letters
        this.boxIsOpen = false
        TweenLite.to(this.lettersText, 0.2, {
          opacity: 0,
          y: 20,
          ease: Power2.easeInOut,
          onComplete: () => {
            this.lettersText[0].innerText = ''
            this.lettersText[1].innerText = ''
            this.lettersText[2].innerText = ''
            this.lettersText[0].setAttribute('class', 'one')
            this.lettersText[1].setAttribute('class', 'two')
            this.lettersText[2].setAttribute('class', 'three')
          }
        })
      } else if (letter === 1) { // change color
        TweenLite.to(this.lettersText, 0.6, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            let clasName1
            let clasName2
            let clasName3
            if (this.currentChord === 0) {
              clasName1 = 'gray1'
              clasName2 = 'gray2'
              clasName3 = 'gray3'
            } else if (this.currentChord === 1) {
              clasName1 = 'red1'
              clasName2 = 'red2'
              clasName3 = 'red3'
            } else if (this.currentChord === 2) {
              clasName1 = 'blue1'
              clasName2 = 'blue2'
              clasName3 = 'blue3'
            }
            this.lettersText[0].classList.add(clasName1)
            this.lettersText[1].classList.add(clasName2)
            this.lettersText[2].classList.add(clasName3)
            TweenLite.to(this.lettersText, 0.6, {
              opacity: 1,
              ease: Power2.easeInOut
            })
          }
        })

      }
    }

    updateLibrary() {
      if (!chordsDatas.artistsFound[this.currentChord]) {
        let lock = document.querySelectorAll('.artistsLibrary .lock')
        lock[this.currentChord].classList.add('is-hidden')
        chordsDatas.artistsFound[this.currentChord] = true
        this.numberArtistFound ++
        this.setArtistFound()
      }
    }

}

export default Chords
