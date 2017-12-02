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
    this.helpButton_text = document.querySelector('.help_text')
    this.help_screen = document.querySelector('.help_screen')
    this.aboutButton = document.querySelector('.about')
    this.aboutButton_text = document.querySelector('.about_text')
    this.about_screen = document.querySelector('.about_screen')

    this.pause = document.querySelector('.pause')
    this.game = document.querySelector('.game')
    this.game_consigne = document.querySelector('.game_consigne')
    this.skip_tuto = document.querySelector('.skip_tuto')
    this.skip_arrow = document.querySelector('.skip_arrow')
    this.skip = document.querySelector('.skip')

    this.interface_fb = document.querySelector('.interface_fb')
    this.interface_twitter = document.querySelector('.interface_twitter')

    this.library_button = document.querySelector('.artist-lirary-button')
    this.library_close_button = document.querySelector('.libray-close-button')
    this.library = document.querySelector('.artistsLibrary')
    
    this.songCarateristics = document.querySelector('.songCarateristics')
 
    this.skipIntro = false

    this.interfaceIsBlurred = true
    this.bind()
  }

  bind() {
    this.OverlayClickListener = this.handleOverlayClick.bind(event, this)
    this.overlay.addEventListener('click', this.OverlayClickListener)

    this.skipClickListener = this.handleSkipClick.bind(event, this)
    this.skip.addEventListener('click', this.skipClickListener)

    this.HelpMouseOverListener = this.handleHelpMouseOver.bind(event, this)
    this.helpButton.addEventListener('mouseover', this.HelpMouseOverListener)
    this.HelpMouseOutListener = this.handleHelpMouseOut.bind(event, this)
    this.helpButton.addEventListener('mouseout', this.HelpMouseOutListener)
    this.HelpClickListener = this.handleHelpClick.bind(event, this)
    this.helpButton.addEventListener('click', this.HelpClickListener)

    this.AboutMouseOverListener = this.handleAboutMouseOver.bind(event, this)
    this.aboutButton.addEventListener('mouseover', this.AboutMouseOverListener)
    this.AboutMouseOutListener = this.handleAboutMouseOut.bind(event, this)
    this.aboutButton.addEventListener('mouseout', this.AboutMouseOutListener)
    this.AboutClickListener = this.handleAboutClick.bind(event, this)
    this.aboutButton.addEventListener('click', this.AboutClickListener)

    this.LibraryButtonClickListener = this.handleLibraryButtonClick.bind(event, this)
    this.library_button.addEventListener('click', this.LibraryButtonClickListener)
    this.LibraryCloseButtonClickListener = this.handleLibraryCloseButtonClick.bind(event, this)
    this.library_close_button.addEventListener('click', this.LibraryCloseButtonClickListener)
  }

  handleHelpMouseOver(that, event) {
    TweenLite.to(that.helpButton_text, 0.3, {
      x : +20,
      autoAlpha : 1
    })
  }
  handleHelpMouseOut(that, event) {
    TweenLite.to(that.helpButton_text, 0.3, {
      x : -7,
      autoAlpha : 0
    })
  }

  handleAboutMouseOver(that, event) {
    TweenLite.to(that.aboutButton_text, 0.3, {
      x : -20,
      autoAlpha : 1
    })
  }
  handleAboutMouseOut(that, event) {
    TweenLite.to(that.aboutButton_text, 0.3, {
      x : +7,
      autoAlpha : 0
    })
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
    TweenLite.to(that.help_screen, 0.3,{
      opacity: 1
    })
    TweenLite.to(that.pause, 0, {
      css : { 'border': 'solid 10px white'}
    })
    TweenLite.to([that.helpButton, that.aboutButton, that.interface_fb, that.interface_twitter, that.library_button], 0.3,{
      opacity: 0,
      visibility: "hidden"
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
    TweenLite.to(that.about_screen, 0.3,{
      opacity: 1
    })
    TweenLite.to(that.pause, 0, {
      css : { 'border': 'solid 10px white'}
    })
    TweenLite.to([that.helpButton, that.aboutButton, that.interface_fb, that.interface_twitter, that.library_button, that.songCarateristics], 0.3,{
      opacity: 0,
      visibility: "hidden"
    })
  }

  handleOverlayClick(that, event) {
    STORAGE.RendererClass.animateBlur(1)
    STORAGE.AudioClass.upVolume()
    TweenLite.set(that.overlay, {
      css : {'pointerEvents' : 'none'}
    })
    TweenLite.to([that.overlay, that.help_screen, that.about_screen], 0.3 , {
      opacity: 0
    })
    TweenLite.to(that.pause, 0, {
      css : {'border' : '0px'},
    })
    if (STORAGE.chordsClass.boxIsOpen) {
      TweenLite.to([that.aboutButton, that.interface_fb, that.interface_twitter, that.library_button, that.songCarateristics], 0.3,{
        opacity: 1,
        visibility: "visible"
      })
    } else {
      TweenLite.to([that.helpButton, that.aboutButton, that.interface_fb, that.interface_twitter, that.library_button, that.songCarateristics], 0.3,{
        opacity: 1,
        visibility: "visible"
      })
    }

  }

  handleSkipClick(that, event) {
    console.log("skip")
    that.skipIntro = true
    TweenLite.to([that.tuto_explanations, that.skip_tuto, that.skip_arrow], 0.5, {
      opacity: 0,
      display: "none",
      ease: Power2.easeInOut,
      delay: 0.5,
      onComplete: () => {
        that.beginGame()
        new Chords()
        STORAGE.chordsClass.tutoMode = false
        STORAGE.chordsClass.enableGame()
      }
    })
  }

  handleLibraryButtonClick(that, event) {
    TweenLite.to(that.library, 0.6, {
      opacity: 1,
      ease: Power2.easeInOut,
      onComplete: () => {
        TweenLite.set(that.library, {
          'pointerEvents' : 'all'
        })
      }
    })
  }

  handleLibraryCloseButtonClick(that, event) {
    console.log('je click')
    TweenLite.to(that.library, 0.6, {
      opacity: 0,
      ease: Power2.easeInOut,
      onComplete: () => {
        TweenLite.set(that.library, {
          'pointerEvents' : 'none'
        })
      }
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
          display: "block",
          ease: Power2.easeInOut,
          onComplete: () => {
            TweenLite.to([this.tuto_explanations, this.skip_tuto, this.skip_arrow], 0.5, {
              opacity: 0,
              display: "none",
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
        TweenLite.to(this.pause, 0, {
          css : {'border' : 'solid 0px white'}
        })
        TweenLite.to(this.game, 0.5, {
          opacity: 1,
          display: "block",
          ease: Power2.easeInOut,
          onComplete: () => {
            TweenLite.to(this.game_consigne, 0.5, {
              opacity: 0,
              delay: 2,
              ease: Power2.easeInOut
            })
          }
        })
      }
    })

  }

}

export default Interface
