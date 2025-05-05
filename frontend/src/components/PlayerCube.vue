<template><div style="display: none;"></div></template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { scene, camera, updateFunctions } from '@/sceneGlobals'

let player

onMounted(() => {
  player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  )
  player.position.set(10.25, 1, 0.5)
  player.scale.set(0.5, 0.5, 0.5)
  scene.add(player)

  const velocity = new THREE.Vector3()
  const keys = {}
  const speed = 0.05

  let isJumping = false
  let verticalSpeed = 0
  const gravity = -0.01
  const groundY = 0.5  // Altura del suelo

  window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true)
  window.addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false)

  const move = () => {
    velocity.set(0, 0, 0)

    // Movimiento lateral
    if (keys['w']) velocity.z -= speed
    if (keys['s']) velocity.z += speed
    if (keys['a']) velocity.x -= speed
    if (keys['d']) velocity.x += speed

    // Salto
    if (keys['f'] && !isJumping) {
      verticalSpeed = 0.14         // fuerza del salto
      isJumping = true
    }

    // Aplicar gravedad si está en el aire
    if (isJumping) {
      verticalSpeed += gravity
      player.position.y += verticalSpeed

      // Si llega al suelo, detener caída
      if (player.position.y <= groundY) {
        player.position.y = groundY
        verticalSpeed = 0
        isJumping = false
      }
    }

    // Aplicar movimiento
    player.position.add(velocity)

    // Cámara sigue al jugador
    const offset = new THREE.Vector3(0, 5, 10)
    const target = player.position.clone().add(offset)
    camera.position.lerp(target, 0.1)
    camera.lookAt(player.position)
  }

  updateFunctions.push(move)

  // Compartir el jugador globalmente
  window.player = player
})
</script>
