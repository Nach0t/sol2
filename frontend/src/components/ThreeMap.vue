<template>
  <div ref="container" style="width: 100vw; height: 100vh;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(10, 20, 10)
  scene.add(light)

  // Cámara
  camera.position.set(0, 5, 15)

  // Controles de cámara (Orbit)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  let player = null;  // Inicializamos player como null

  // Mover el jugador con WASD
  let playerSpeed = 0.1
  let velocity = new THREE.Vector3()

  function movePlayer() {
    if (!player) return; // Asegurarse de que el modelo esté cargado

    if (keyboard[87]) { // W - Adelante
      player.position.z -= playerSpeed;
    } else if (keyboard[83]) { // S - Atrás
      player.position.z += playerSpeed;
    }

    if (keyboard[65]) { // A - Izquierda
      player.position.x -= playerSpeed;
    } else if (keyboard[68]) { // D - Derecha
      player.position.x += playerSpeed;
    }

    // Actualizar la cámara para que siga al jugador
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10;
  }

  // Detectar teclas presionadas
  let keyboard = {}
  window.addEventListener('keydown', (event) => {
    keyboard[event.keyCode] = true
  })
  window.addEventListener('keyup', (event) => {
    keyboard[event.keyCode] = false
  })

  // Cargar el mapa
  const loader = new GLTFLoader()
  loader.load('/models/City.glb', gltf => {
    const model = gltf.scene
    scene.add(model)
  }, undefined, error => {
    console.error('Error al cargar el modelo del mapa:', error)
  })

  // Cargar el modelo del jugador (CharacterGirl.glb)
  loader.load('/models/CharacterGirl.glb', gltf => {
    player = gltf.scene;
    scene.add(player);
    player.scale.set(0.1, 0.1, 0.1);  // Ajustar la escala si es necesario

  }, undefined, error => {
    console.error('Error al cargar el modelo del jugador:', error)
  })

  // Loop de animación
  const animate = () => {
    requestAnimationFrame(animate)
    movePlayer()
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Responsivo
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>