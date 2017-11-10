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
        STORAGE.SceneObjectClass.removeScene()
        STORAGE.SceneShaderClass.removeShaders()
      }, 800)
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
    } else if (step === 1 && STORAGE.chordsClass.boxIsOpen) {
      setTimeout(() => {
        STORAGE.SceneObjectClass.removeScene()
        STORAGE.SceneShaderClass.removeShaders()
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
      }, 800)
    } 
  }
}

export default SceneManager
