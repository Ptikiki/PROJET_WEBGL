import Chords from './Chords.class.js'

class Interface {

  constructor(options) {
    STORAGE.InterfaceClass = this
    this.canvas = document.querySelector('canvas')
    this.loader = document.querySelector('.loader_logo')

    this.overlay = document.querySelector('.overlay')
    this.interface = document.querySelector('.interface')
    this.splash = document.querySelector('.splash')

    this.tuto_explanations = document.querySelector('.tuto_explanations')
    this.tuto_training = document.querySelector('.tuto_training')

    this.interface_logo = document.querySelector('.interface_logo')

    this.helpButton = document.querySelector('.help')
    this.aboutButton = document.querySelector('.about')

    this.pause = document.querySelector('.pause')
    this.game = document.querySelector('.game')
    this.game_consigne = document.querySelector('.game_consigne')
    this.skip_tuto = document.querySelector('.skip_tuto')
    this.skip_arrow = document.querySelector('.skip_arrow')
    this.skip = document.querySelector('.skip')

    this.skipIntro = false

    this.interfaceIsBlurred = true
    this.bind()
  }

  bind() {
    this.OverlayClickListener = this.handleOverlayClick.bind(event, this)
    this.overlay.addEventListener('click', this.OverlayClickListener)

    this.skipClickListener = this.handleSkipClick.bind(event, this)
    this.skip.addEventListener('click', this.skipClickListener)

    this.HelpClickListener = this.handleHelpClick.bind(event, this)
    this.helpButton.addEventListener('click', this.HelpClickListener)

    this.AboutClickListener = this.handleAboutClick.bind(event, this)
    this.aboutButton.addEventListener('click', this.AboutClickListener)
  }

  handleHelpClick(that, event) {
    STORAGE.RendererClass.animateBlur(0)
    STORAGE.AudioClass.lowVolume()
    TweenLite.set(that.overlay, {
      css : {'pointerEvents' : 'all'}
    })
    TweenLite.to(that.overlay, 0.3,{
      opacity: 0.6
    })
  }
  handleAboutClick(that, event) {
    STORAGE.RendererClass.animateBlur(0)
    STORAGE.AudioClass.lowVolume()
    TweenLite.set(that.overlay, {
      css : {'pointerEvents' : 'all'}
    })
    TweenLite.to(that.overlay, 0.3,{
      opacity: 0.6
    })
  }

  handleSkipClick(that, event) {
    console.log("skip")
    that.skipIntro = true
    TweenLite.to([that.tuto_explanations, that.skip_tuto, that.skip_arrow], 0.5, {
      opacity: 0,
      ease: Power2.easeInOut,
      delay: 0.5,
      onComplete: () => {
        that.beginGame()
        new Chords()
        STORAGE.chordsClass.tutoMode = false
        STORAGE.chordsClass.enableGame()
        // STORAGE.chordsClass.setLetters(0)
      }
    })
    
  }

  handleOverlayClick(that, event) {
    STORAGE.RendererClass.animateBlur(1)
    STORAGE.AudioClass.upVolume()
    TweenLite.set(that.overlay, {
      css : {'pointerEvents' : 'none'}
    })
    TweenLite.to(that.overlay, 0.3 , {
      opacity: 0
    })
  }

  removeLoader() {
    TweenLite.to(this.canvas, 0.3, {
      opacity: 1,
      onComplete: () => {
        TweenLite.to([this.overlay, this.loader], 0.6 , {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            let enterSong = new Audio('assets/ambiance/enter.mp3')
            enterSong.play()
            STORAGE.RendererClass.animateBlur(2)
            this.removeSplash()
          }
        })
      }
    })
  }

  removeSplash() {
    TweenLite.to(this.splash, 0.5, {
      opacity: 0,
      delay: 4,
      onComplete: () => { 
        TweenLite.to([this.tuto_explanations, this.skip_tuto, this.skip_arrow, this.interface_logo], 0.5, {
          opacity: 1,
          ease: Power2.easeInOut,
          onComplete: () => {
            TweenLite.to([this.tuto_explanations, this.skip_tuto, this.skip_arrow], 0.5, {
              opacity: 0,
              ease: Power2.easeInOut,
              delay: 4,
              onComplete: () => {
                this.skipIntro != true ? this.addTuto() : ''
              }
            })
          }
        })
      }
    })
  }

  addTuto() {
    TweenLite.to(this.tuto_training, 0.5, {
      opacity: 1,
      ease: Power2.easeInOut
    })
    new Chords() 
  }

  beginGame() {
    TweenLite.to(this.tuto_training, 0.5, {
      opacity: 0,
      ease: Power2.easeInOut,
      onComplete: () => {
        TweenLite.to(this.pause, 0.5, {
          css : {'border' : '0px'},
        })
        TweenLite.to(this.game, 0.5, {
          opacity: 1,
          ease: Power2.easeInOut,
          onComplete: () => {
            TweenLite.to(this.game_consigne, 0.5, {
              opacity: 0,
              delay: 3,
              ease: Power2.easeInOut
            })
          }
        })
      }
    })

  }

}

export default Interface
