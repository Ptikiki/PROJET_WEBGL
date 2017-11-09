class SceneManager {
  constructor(options) {
    STORAGE.SceneManager = this
    this.actualSceneIndex = null
  }

  setSceneIndex(index) {
    this.actualSceneIndex !== index ? this.actualSceneIndex = index : ''
  }

  displayScene(step) {
    if (step === 0) {
      setTimeout(() => { STORAGE.SceneObjectClass.removeScene() }, 800)
    }
    if (step === 1 && !STORAGE.chordsClass.win) {
      this.actualSceneIndex === 0 ? STORAGE.SceneObjectClass.displayOrelsan() : ''
      this.actualSceneIndex === 1 ? STORAGE.SceneObjectClass.displayMlleK() : ''
      this.actualSceneIndex === 2 ? STORAGE.SceneObjectClass.displayPetitBiscuit() : ''
    }
    console.log(STORAGE.SceneObjectClass, step)
  }
}

export default SceneManager
