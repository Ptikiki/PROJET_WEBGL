class Interface {

  constructor(options) {
    STORAGE.InterfaceClass = this
    this.helpButton = document.querySelector('.help')
    this.overlay = document.querySelector('.overlay')

    this.interfaceIsBlurred = false
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
}

export default Interface
