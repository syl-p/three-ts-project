import * as THREE from 'three'
import Camera from "./Camera";
import Renderer from './Renderer';
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from './World/Resources';
import World from './World/World';
import sources from './sources'

export default class Experience {
  canvas: HTMLElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  camera: Camera
  renderer: Renderer
  world: World
  resources: Resources

  constructor(canvas: HTMLElement) {
    // @ts-ignore
    window.experience = this // Global access
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()

    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.resources = new Resources(sources)
    this.world = new World(this)

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update()
  }
}