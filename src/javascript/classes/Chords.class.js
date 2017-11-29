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

      this.previewStarted = false

      this.artistNameText = document.querySelector('.songCarateristics .songsName .artist')
      this.songNameText = document.querySelector('.songCarateristics .songsName .song')
      this.lettersText = document.querySelector('.songCarateristics .letters p')
      this.artistsLibraryContainer = document.querySelector('.artistsLibrary')

      this.bind()
      this.enableTuto()
    }

    bind() {
      window.setInterval(this.checkPreviewState.bind(event, this), 1000)
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
      window.addEventListener('keydown', that.keyDownListener)
      window.addEventListener('keyup', that.keyUpListener)
    }

    handleKeydown(that, event) {
      that.noteTested = false

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

      if (that.songPlaying) {
        STORAGE.AudioClass.stopWithSmooth(that.currentSongPlayingIndex, that.currentChord)
        that.songPlaying = false
      }

      if (that.keysPressedTab.indexOf(event.key) === -1 && that.keysPressedTab.length < 3 && !that.tutoMode) {
        that.keysPressedTab.push(event.key)

        chordsDatas.chords.forEach((chord, index) => {
          
          if (chord[0].indexOf(that.keysPressedTab[0]) == -1 && that.noteTested != true) {
            console.log("accord", chord[0])
            console.log("note sans accord", event.key)
            that.lettersText.innerText = event.key
            TweenLite.to(that.lettersText, 0.1, {
              opacity: 1,
              ease: Power2.easeInOut,
              onComplete: () => {
                that.lettersText.innerText = ''
                TweenLite.to(that.lettersText, 1, {
                  opacity: 0,
                  ease: Power2.easeInOut,
                })
              }
            })
          }
          else if (chord[0].indexOf(that.keysPressedTab[0]) !== -1 ) {
            console.log("accord", chord[0])
            console.log("note avec accord", event.key)
            that.currentChord = index
            that.checkChords(event.key)
            that.noteTested = true
          }

        })

        that.openBox()
        that.launchNote(chordsDatas.notes[event.key])
        that.setAmbiance()
        that.step === 3 ? that.launchSound() : ''
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
        this.setLetters('tuto')
      }

      if (numberOfNotesOk === 3) {
        window.removeEventListener('keydown', that.keyDownListener)
        window.removeEventListener('keyup', that.keyUpListener)
        that.setLetters(1)
        that.tutoMode = false
        setTimeout(() => {
          that.enableGame()
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
        this.setLetters('game')
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
      setTimeout( () => { this.enableGame() }, 4000)
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
            if (letter === 'tuto') {
              this.lettersText.innerText = this.keysPressedTutoTab.join("")
            } else if (letter === 'game') {
              this.lettersText.innerText = this.keysPressedTab.join("")
            }
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
          onComplete: () => {
            TweenLite.set(this.lettersText, {
              scale: 1
            })
            this.lettersText.innerText = ''
          }
        })
      }
    }

    updateLibrary() {
      if (!chordsDatas.artistsFound[this.currentChord][2]) {
        let artist = document.createElement('div')
        artist.classList.add('artist')
        let name = document.createElement('a')
        name.classList.add('name')
        name.setAttribute('href', 'http://www.asterios.fr/fr/agenda')
        name.setAttribute('target', '_blanck')
        let chord = document.createElement('p')
        chord.classList.add('chord')
        let nameText = document.createTextNode(chordsDatas.artistsFound[this.currentChord][0])
        let chordText = document.createTextNode(chordsDatas.artistsFound[this.currentChord][1])

        name.appendChild(nameText)
        chord.appendChild(chordText)

        artist.appendChild(name)
        artist.appendChild(chord)
        this.artistsLibraryContainer.appendChild(artist)

        setTimeout(()=> { artist.classList.add('is-visible') },200)

        chordsDatas.artistsFound[this.currentChord][2] = true
      }
    }

}

export default Chords
