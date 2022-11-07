import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Experience from "../Experience";
import Environment from './Environment';
import Resources from './Resources';

export default class World {
  experience: Experience
  scene: THREE.Scene
  environment!: Environment
  resources: Resources

  // My World objects
  fox: {model: GLTF | null, animationMixer: THREE.AnimationMixer | null} = {
    model: null,
    animationMixer: null
  }

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.setFloor()
      this.setFox()
      this.environment = new Environment(this.experience)
    })
  }

  setFloor() {
    const textures: {color: THREE.Texture, normal: THREE.Texture} = {
      color: this.resources.items.grassColorTexture,
      normal: this.resources.items.grassNormalTexture
    }

    textures.color.encoding = THREE.sRGBEncoding
    textures.color.repeat.set(1.5, 1.5)
    textures.color.wrapS = THREE.RepeatWrapping
    textures.color.wrapT = THREE.RepeatWrapping

    textures.normal.repeat.set(1.5, 1.5)
    textures.normal.wrapS = THREE.RepeatWrapping
    textures.normal.wrapT = THREE.RepeatWrapping

    const floorMesh = new THREE.Mesh(
      new THREE.CircleGeometry(5, 64),
      new THREE.MeshStandardMaterial({
        map: this.resources.items.grassColorTexture,
        normalMap: this.resources.items.grassNormalTexture
      })
    )
    
    floorMesh.receiveShadow = true
    floorMesh.rotateX(- Math.PI * 0.5)
    this.scene.add(floorMesh)
  }

  setFox() {
    // Set Model 
    this.fox.model = this.resources.items.foxModel

    if (this.fox.model) {
      this.fox.model.scene.scale.set(0.02, 0.02, 0.02)
      this.fox.model.scene.position.set(0, 0, 0)
      this.scene.add(this.fox.model.scene)
  
      this.fox.model.scene.traverse((child) => {
        if(child instanceof THREE.Mesh) {
          child.castShadow = true
        }
      })
  
  
      // Animations
      this.fox.animationMixer = new THREE.AnimationMixer(this.fox.model.scene)
      const actionSurvey = this.fox.animationMixer.clipAction(this.fox.model.animations[0])
      const actionRun = this.fox.animationMixer.clipAction(this.fox.model.animations[2])
  
      let currentAction = actionSurvey
      currentAction.play()
    }
  }

  update() {
    if (this.fox.animationMixer)
      this.fox.animationMixer.update(this.experience.time.delta * 0.001)
  }
}

