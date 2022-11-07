import * as THREE from 'three'
import Experience from "../Experience";
import Resources from './Resources';

export default class Environment {
  experience: Experience
  scene: THREE.Scene
  light!: THREE.DirectionalLight
  resources: Resources
  environmentMap: {
    updateMaterial?: () => void,
    intensity: number,
    texture: THREE.Texture | null,
    encoding: THREE.TextureEncoding
  } = {
    intensity: 0.4,
    encoding: THREE.sRGBEncoding,
    texture: null
  }

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    
    this.setLight()
    this.setEnvironmentMap()
  }

  setLight() {
    this.light = new THREE.DirectionalLight('#ffffff', 4)
    this.light.castShadow = true
    this.light.shadow.camera.far = 15
    this.light.shadow.mapSize.set(1024, 1024)
    this.light.shadow.normalBias = 0.05
    this.light.position.set(3.5, 2, - 1.25)

    this.scene.add(this.light)
  }

  setEnvironmentMap() {
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }

    this.environmentMap.updateMaterial()
  }
}

