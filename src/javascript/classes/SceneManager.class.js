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
      setTimeout(() => {
        if (STORAGE.chordsClass.step === 0 && STORAGE.SceneObjectClass.myObjects[0]) {
          STORAGE.SceneObjectClass.removeScene()
          STORAGE.SceneShaderClass.removeShaders()
        }
        if (STORAGE.SceneObjectClass.myObjects.length > 3) {
          STORAGE.SceneObjectClass.removeSceneSkiped()
          STORAGE.SceneShaderClass.removeShadersSkiped()
        }
      }, 600)
    }
    if (step === 1 && !STORAGE.chordsClass.boxIsOpen) {
      if (this.actualSceneIndex === 0) {
        STORAGE.SceneObjectClass.displayOrelsan()
        STORAGE.SceneShaderClass.displayOrelsanShader()
      }
      if (this.actualSceneIndex === 1) {
        STORAGE.SceneObjectClass.displayMlleK()
        STORAGE.SceneShaderClass.displayMlleKShader()
      }
      if (this.actualSceneIndex === 2) {
        STORAGE.SceneObjectClass.displayPetitBiscuit()
        STORAGE.SceneShaderClass.displayPetitBiscuitShader()
      }
    }
  }
}

export default SceneManager
