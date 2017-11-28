class Interface {

  constructor(options) {
    STORAGE.InterfaceClass = this
    this.canvas = document.querySelector('canvas')
    this.loader = document.querySelector('.loader')
    this.helpButton = document.querySelector('.help')
    this.overlay = document.querySelector('.overlay')

    this.interfaceIsBlurred = true
    this.bind()
  }

  bind() {
    this.OverlayClickListener = this.handleOverlayClick.bind(event, this)
    this.overlay.addEventListener('click', this.OverlayClickListener)

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
    TweenLite.set(this.overlay, {
      css : {'pointerEvents' : 'none'}
    })
    TweenLite.to(this.loader, 0.3 , {
      opacity: 0,
      ease: Power2.easeInOut
    })
    TweenLite.to(this.canvas, 0.3, {
      opacity: 1,
      onComplete: () => {
        TweenLite.to(this.overlay, 0.6 , {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            let enterSong = new Audio('assets/ambiance/enter.mp3')
            enterSong.play()
            STORAGE.RendererClass.animateBlur(2)
          }
        })
      }
    })
  }
}

export default Interface
