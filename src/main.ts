import './style.css'
import Experience from './Experience/Experience'


const canvas: HTMLElement | null = document.querySelector('#app canvas')
if (canvas) {
  const experience = new Experience(canvas)
}

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import * as dat from 'lil-gui'
// import { CubeTextureLoader } from 'three'

// const gui = new dat.GUI()
// const debugObject = {
//   environmentMapIntensity: 5
// }
// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('#app canvas')

// // Scene
// const scene = new THREE.Scene()

// // update all materials
// const updateAllMat = () => {
//   scene.traverse((child) => {
//     if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
//       // child.material.envMap = environmentMap
//       child.material.envMapIntensity = debugObject.environmentMapIntensity
//       child.material.needsUpdate = true
//       child.castShadow = true
//       child.receiveShadow = true
//     }
//   })
// }
// gui.add(debugObject, 'environmentMapIntensity').min(0).max(10).onChange(updateAllMat)

// // Back
// const cubeTextureLoader = new CubeTextureLoader()
// const environmentMap = cubeTextureLoader.load([
//   'textures/environmentMaps/1/px.png',
//   'textures/environmentMaps/1/nx.png',
//   'textures/environmentMaps/1/py.png',
//   'textures/environmentMaps/1/ny.png',
//   'textures/environmentMaps/1/pz.png',
//   'textures/environmentMaps/1/nz.png',
// ])

// environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
// scene.environment = environmentMap

// // const dracoLoader = new DRACOLoader()
// // dracoLoader.setDecoderPath('/draco/')


// const gltfLoader = new GLTFLoader()
// // gltfLoader.setDRACOLoader(dracoLoader)

// gltfLoader.load('/models/burger.glb', 
//   (gltf) => {
//     // while (gltf.scene.children.length > 0) {
//     //     scene.add(gltf.scene.children[0])
//     // }

//     // const childs = [...gltf.scene.children]
//     // for (const child of childs) {
//     //   scene.add(child)
//     // }

//     gltf.scene.scale.set(0.5, 0.5, 0.5)
//     gltf.scene.position.set(0, 0, 0)
//     scene.add(gltf.scene)
//     updateAllMat()

//     gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
//   },
//   () => {}, 
//   () => {}
// )



// /**
//  * Sizes
//  */
//  const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight
// }

// if (canvas) {
//   /**
//    * Camera
//    */

//   // Base camera
//   const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//   camera.position.set(- 3, 3, 3)
//   scene.add(camera)

//   // Controls
//   const controls = new OrbitControls(camera, canvas)

//   const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2)
//   directionalLight.position.set(0.25, 3, - 2.25)
//   directionalLight.castShadow = true

//   const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//   directionalLight.shadow.camera.far = 15
//   directionalLight.shadow.mapSize.set(1024, 1024)
//   directionalLight.shadow.normalBias = 0.05
  
//   scene.add(directionalLight)

//   scene.add(directionalLightCameraHelper)
  
//   gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001)
//   gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
//   gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)
//   gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001)

//   /**
//    * Renderer
//    */
//   const renderer = new THREE.WebGLRenderer({
//       canvas: canvas,
//       antialias: true
//   })
//   renderer.setSize(sizes.width, sizes.height)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//   renderer.physicallyCorrectLights = true
//   renderer.outputEncoding = THREE.sRGBEncoding
//   renderer.toneMapping = THREE.ReinhardToneMapping
//   renderer.shadowMap.enabled = true
//   renderer.shadowMap.type = THREE.PCFShadowMap

//   gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping
//   })

//   gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


//   window.addEventListener('resize', () =>
//   {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//   })



//   /**
//    * Animate
//    */
//   const clock = new THREE.Clock()
//   let previousTime = 0
//   const tick = () =>
//   {
//     const elapsedTime = clock.getElapsedTime();
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime
    
//     // sphere.position.copy(sphereBody.position)

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
//   }

//   tick()

// }


