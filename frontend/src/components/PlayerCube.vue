<template>
  <div @click="enablePointerLock" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; cursor: crosshair;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { scene, camera, updateFunctions } from '@/sceneGlobals'

let player
const pitchObject = new THREE.Object3D() // vertical (mirada arriba/abajo)
const yawObject = new THREE.Object3D()   // horizontal (mirada izquierda/derecha)

yawObject.add(pitchObject)
pitchObject.add(camera)

const speed = 0.1
const gravity = -0.01
let isJumping = false
let verticalSpeed = 0
const groundY = 0.4

const getSafeLimits = () => {
  return window.mapLimits || {
    xMin: -50,
    xMax: 50,
    zMin: -50,
    zMax: 50
  }
}

// Teclado
const keys = {}
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true)
window.addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false)

// Mouse — mirar con el puntero
let isPointerLocked = false
function enablePointerLock() {
  const el = document.body
  el.requestPointerLock?.()
}

document.addEventListener('pointerlockchange', () => {
  isPointerLocked = document.pointerLockElement === document.body
})

document.addEventListener('mousemove', event => {
  if (!isPointerLocked) return
  const movementX = event.movementX || 0
  const movementY = event.movementY || 0
  yawObject.rotation.y -= movementX * 0.002
  pitchObject.rotation.x -= movementY * 0.002
  pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x))
})

onMounted(() => {
  player = new THREE.Object3D()
  player.position.set(10.25, groundY, 0.5)
  scene.add(player)
  player.add(yawObject)

  const velocity = new THREE.Vector3()
  const direction = new THREE.Vector3()

  const move = () => {
    velocity.set(0, 0, 0)

    if (keys['w']) velocity.z -= 1
    if (keys['s']) velocity.z += 1
    if (keys['a']) velocity.x -= 1
    if (keys['d']) velocity.x += 1

    if (velocity.length() > 0) {
      velocity.normalize().multiplyScalar(speed)
      direction.copy(velocity).applyEuler(yawObject.rotation)
      player.position.add(direction)
    }

    // Salto
    if (keys[' '] && !isJumping) {
      verticalSpeed = 0.10
      isJumping = true
    }

    // Gravedad
    if (isJumping) {
      verticalSpeed += gravity
      player.position.y += verticalSpeed
      if (player.position.y <= groundY) {
        player.position.y = groundY
        verticalSpeed = 0
        isJumping = false
      }
    }

    // ✅ Aplicar límites — sin flotar en bordes
    const limits = getSafeLimits()
    player.position.x = Math.max(limits.xMin, Math.min(limits.xMax, player.position.x))
    player.position.z = Math.max(limits.zMin, Math.min(limits.zMax, player.position.z))
    player.position.y = Math.max(groundY, player.position.y) // evitar flotar

    // Cámara queda fija en los "ojos"
    const cameraOffset = new THREE.Vector3(0, 0, 0) // ya está montada sobre pitchObject
    camera.position.copy(cameraOffset)
  }

  updateFunctions.push(move)
  window.player = player
})
</script>
