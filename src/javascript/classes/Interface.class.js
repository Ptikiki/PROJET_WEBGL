import Chords from './Chords.class.js'

class Interface {

  constructor(options) {
    STORAGE.InterfaceClass = this
    this.canvas = document.querySelector('canvas')
    this.loader = document.querySelector('.loader')
    this.helpButton = document.querySelector('.help')
    this.overlay = document.querySelector('.overlay')
    this.interface = document.querySelector('.interface')
    this.splash = document.querySelector('.splash')
    this.tuto_explanations = document.querySelector('.tuto_explanations')
    this.tuto_training = document.querySelector('.tuto_training')
    this.interface_logo = document.querySelector('.interface_logo')
    this.pause = document.querySelector('.pause')
    this.game = document.querySelector('.game')
    this.game_consigne = document.querySelector('.game_consigne')

    this.interfaceIsBlurred = true
    this.bind()
  }

  bind() {
    this.OverlayClickListener = this.handleOverlayClick.bind(event, this)
    this.loader.addEventListener('click', this.OverlayClickListener)

    this.HelpClickListener = this.handleHelpClick.bind(event, this)
    this.helpButton.addEventListener('click', this.HelpClickListener)
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
        TweenLite.to(this.loader, 0.6 , {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            let enterSong = new Audio('assets/ambiance/enter.mp3')
            enterSong.play()
            STORAGE.RendererClass.animateBlur(2)
            this.addTuto()
          }
        })
      }
    })
  }

  addTuto() {
    TweenLite.to(this.splash, 0.5, {
      opacity: 0,
      delay: 4,
      onComplete: () => {
        TweenLite.to([this.tuto_explanations, this.interface_logo], 0.5, {
          opacity: 1,
          ease: Power2.easeInOut,
          onComplete: () => {
            TweenLite.to(this.tuto_explanations, 0.5, {
              opacity: 0,
              ease: Power2.easeInOut,
              delay: 4,
              onComplete: () => {
                TweenLite.to(this.tuto_training, 0.5, {
                  opacity: 1,
                  ease: Power2.easeInOut
                })
                new Chords()
              }
            })
          }
        })
      }
    })
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
