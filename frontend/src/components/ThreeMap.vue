<template>
  <div ref="container" style="width: 100vw; height: 100vh; background-color: black;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const container = ref(null)

onMounted(() => {
  // --- 1) Escena, cámara, renderer ---
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x202020)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // cámara inicial mirando al punto del cubo
  camera.position.set(10.25, 5, 10.5)
  camera.lookAt(10.25, 0, 0.5)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // --- 2) Luces ---
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(10, 20, 10)
  scene.add(dirLight)
  scene.add(new THREE.AmbientLight(0x404040))

  // --- 3) Controles Orbit (solo para vista) ---
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableRotate = false
  controls.enableZoom = false

  // --- 4) Cubo jugador ---
  const playerGeo = new THREE.BoxGeometry(1, 2, 1)
  const playerMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  const player    = new THREE.Mesh(playerGeo, playerMat)
  player.position.set(10.25, 0, 0.5)
  player.scale.set(0.5, 0.5, 0.5)
  scene.add(player)

  // --- 5) Enemigos (cubos rojos) ---
  const enemies = []
  const N = 6
  for (let i = 0; i < N; i++) {
    const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const e   = new THREE.Mesh(geo, mat)
    // espaciarlos en círculo a radio ~10
    const angle = (i / N) * Math.PI * 2
    e.position.set(
      player.position.x + Math.cos(angle) * 10,
      0.5,  // mitad de altura para que queden sobre el suelo
      player.position.z + Math.sin(angle) * 10
    )
    scene.add(e)
    enemies.push(e)
  }

  // --- 6) Carga opcional del mapa GLB ---
  const loader = new GLTFLoader()
  loader.load(
    '/models/MapaConCubo.glb',
    gltf => scene.add(gltf.scene),
    undefined,
    err => console.error('Error al cargar el mapa:', err)
  )

  // --- 7) Lógica de movimiento ---
  const velocity = new THREE.Vector3()
  const keyboard = {}
  const speed    = 0.1

  window.addEventListener('keydown', e => (keyboard[e.key.toLowerCase()] = true))
  window.addEventListener('keyup',   e => (keyboard[e.key.toLowerCase()] = false))

  function movePlayer() {
    velocity.set(0, 0, 0)
    if (keyboard['w']) velocity.z -= speed
    if (keyboard['s']) velocity.z += speed
    if (keyboard['a']) velocity.x -= speed
    if (keyboard['d']) velocity.x += speed
    player.position.add(velocity)
  }

  function moveEnemies() {
    const chaseSpeed = 0.02
    enemies.forEach(e => {
      const dir = new THREE.Vector3()
        .subVectors(player.position, e.position)
        .setY(0)
        .normalize()
      e.position.addScaledVector(dir, chaseSpeed)
    })
  }

  // --- 8) Bucle de animación ---
  function animate() {
    requestAnimationFrame(animate)
    movePlayer()
    moveEnemies()
    controls.update()
    // Cámara sigue al jugador
    const targetCam = player.position.clone().add(new THREE.Vector3(0, 5, 10))
    camera.position.lerp(targetCam, 0.1)
    camera.lookAt(player.position)
    renderer.render(scene, camera)
  }
  animate()

  // --- 9) Responsivo ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>
