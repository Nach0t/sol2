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
  const speed = 0.05 // jugador velocitad

  window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true)
  window.addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false)

  const move = () => {
    velocity.set(0, 0, 0)
    if (keys['w']) velocity.z -= speed
    if (keys['s']) velocity.z += speed
    if (keys['a']) velocity.x -= speed
    if (keys['d']) velocity.x += speed
    player.position.add(velocity)

    const offset = new THREE.Vector3(0, 5, 10)
    const target = player.position.clone().add(offset)
    camera.position.lerp(target, 0.1)
    camera.lookAt(player.position)
  }

  updateFunctions.push(move)

  // Compartir el jugador para otros componentes
  window.player = player
})
</script>
