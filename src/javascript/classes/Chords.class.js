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

      this.songPlaying = false

      this.currentSongToPlayIndex = 0

      this.artistNameText = document.querySelector('.songsName .artist')
      this.songNameText = document.querySelector('.songsName .song')
      this.lettersText = document.querySelector('.letters p')

      this.previewStarted = false

      this.bind()
      this.enableGame()
    }

    bind() {
      window.setInterval(this.checkPreviewState.bind(event, this), 1000)
    }

    enableGame() {
      console.log('GAME ENABLE')
      let that = this
      that.keysPressedTab = []
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

        if ( that.songPlaying) {
          STORAGE.AudioClass.stopWithSmooth(that.currentSongToPlayIndex, that.currentChord)
          that.songPlaying = false
        }

        chordsDatas.chords.forEach((chord, index) => {
          if (chord[0].indexOf(that.keysPressedTab[0]) !== -1) {
            that.currentChord = index
            that.checkChords(event.key)
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
      !that.win ? that.setSongName() : ''
      !that.win ? that.setArtistName() : ''
      !that.win ? that.setLetters(0) : ''
      !that.win ? setTimeout( () => { that.enableGame() }, 1000) : ''
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
        this.setLetters(key)
      }
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

      this.songPlaying = true

      STORAGE.AudioClass.play(0, this.currentChord)
      this.currentSongToPlayIndex = 0

      this.setSongName(chordsDatas.songsName[this.currentChord][0])
      this.setArtistName(chordsDatas.artists[this.currentChord])
      this.setLetters(1)

      window.addEventListener('keydown', this.nextSongListener)

      window.removeEventListener('keyup', this.keyDownListener)
      setTimeout( () => { this.enableGame() }, 4000)
    }

    launchNextSong(that, event) {
      if ( (event.keyCode === 32 || event === 32) && that.boxIsOpen) {

        let newIndexSongToPlay = Math.round(Math.random() * (chordsDatas.songs[that.currentChord].length -1) )
        let song = chordsDatas.songs[that.currentChord][newIndexSongToPlay]

        that.setSongName(chordsDatas.songsName[that.currentChord][newIndexSongToPlay])

        STORAGE.AudioClass.stop(that.currentSongToPlayIndex, that.currentChord)
        STORAGE.AudioClass.play(newIndexSongToPlay, that.currentChord)
        that.currentSongToPlayIndex = newIndexSongToPlay

        that.previewStartedTime = Math.round(Date.now() / 1000)
        that.previewStarted = true

        window.removeEventListener('keydown', that.nextSongListener)
        setTimeout( () => { window.addEventListener('keydown', that.nextSongListener) }, 500)
      }
    }

    setAmbiance() {
      STORAGE.AmbianceClass.updateAmbiance(this.step, chordsDatas, this.currentChord)
    }

    openBox(close) {
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

    checkPreviewState(that) {
      if (that.previewStarted) {
        if ( Math.round(Date.now() / 1000) - that.previewStartedTime > 25 ) {
          that.launchNextSong(that, 32)
        }
      }
    }

    setArtistName(artistName) {
      if (artistName) {
        TweenLite.to(this.artistNameText, 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            this.artistNameText.innerText = artistName
            TweenLite.to(this.artistNameText, 0.3, {
              opacity: 1,
              ease: Power2.easeInOut,
            })
          }
        })
      } else {
        TweenLite.to(this.artistNameText, 0.3, {
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

    setLetters(letter) {
      if (typeof letter === 'string') {
        TweenLite.to(this.lettersText, 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            this.lettersText.innerText += letter
            TweenLite.to(this.lettersText, 0.3, {
              opacity: 1,
              ease: Power2.easeInOut
            })
          }
        })
      } else if (letter === 0) {
        TweenLite.to(this.lettersText, 0.3, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => { this.lettersText.innerText = '' }
        })
      } else if (letter === 1) {
        TweenLite.to(this.lettersText, 0.3, {
          scale: 1.3,
          opacity: 0,
          delay: 0.6,
          ease: Power2.easeInOut,
          onComplete: () => { this.lettersText.innerText = '' }
        })
      }
    }

}

export default Chords
