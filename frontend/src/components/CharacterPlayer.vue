<script setup>
import { inject, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = inject('scene')
const camera = inject('camera')

let playerBox = null
let characterModel = null
let keyboard = {}
const speed = 0.1
const velocity = new THREE.Vector3()

onMounted(() => {
  // Cubo invisible o básico
  const geometry = new THREE.BoxGeometry(1, 2, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, visible: false })
  playerBox = new THREE.Mesh(geometry, material)
  playerBox.position.set(0, 1, 0)
  scene.add(playerBox)

  // Cargar el modelo 3D
  const loader = new GLTFLoader()
  loader.load('/models/CharacterGirl.glb', gltf => {
    characterModel = gltf.scene
    characterModel.scale.set(1, 1, 1)
    characterModel.position.set(0, -1, 0) // ajuste para que se vea encima del cubo
    playerBox.add(characterModel)
  })

  // Teclado
  window.addEventListener('keydown', e => keyboard[e.key.toLowerCase()] = true)
  window.addEventListener('keyup', e => keyboard[e.key.toLowerCase()] = false)

  const move = () => {
    velocity.set(0, 0, 0)
    if (keyboard['w']) velocity.z -= speed
    if (keyboard['s']) velocity.z += speed
    if (keyboard['a']) velocity.x -= speed
    if (keyboard['d']) velocity.x += speed

    playerBox.position.add(velocity)

    // Cámara sigue al jugador
    camera.position.x = playerBox.position.x
    camera.position.z = playerBox.position.z + 10
  }

  const loop = () => {
    requestAnimationFrame(loop)
    move()
  }
  loop()
})
</script>
