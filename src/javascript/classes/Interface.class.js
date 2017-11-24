class Interface {

  constructor(options) {
    STORAGE.InterfaceClass = this
    this.helpButton = document.querySelector('.help')

    this.interfaceIsBlurred = false
    this.bind()
  }

  bind() {
    this.HelpClickListener = this.handleHelpClick.bind(event, this)
    this.helpButton.addEventListener('click', this.HelpClickListener)
  }

  handleHelpClick(that, event) {
    that.interfaceIsBlurred = !that.interfaceIsBlurred
  }
}

export default Interface
