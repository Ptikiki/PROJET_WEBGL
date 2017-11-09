class SceneManager {
  constructor(options) {
    STORAGE.SceneManager = this
    this.actualSceneIndex = null
    this.loadScenes()
  }

  loadScenes() {

  }

  setSceneIndex(index) {
    this.actualSceneIndex !== index ? this.actualSceneIndex = index : ''
  }
}

export default SceneManager
