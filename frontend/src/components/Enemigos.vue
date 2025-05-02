<template>
  <div style="display: none;"></div>
</template>

<script setup>
import { onMounted, inject } from 'vue'
import * as THREE from 'three'

// Inyectamos la escena y el cubo jugador
const scene  = inject('scene')
const player = inject('player')

onMounted(() => {
  if (!scene || !player) {
    console.error('Enemigos.vue: scene o player no proporcionados')
    return
  }

  // 1. Crear N enemigos
  const enemies = []
  const N = 6
  for (let i = 0; i < N; i++) {
    const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const e   = new THREE.Mesh(geo, mat)
    const angle = (i / N) * Math.PI * 2
    e.position.set(
      player.position.x + Math.cos(angle) * 10,
      player.position.y,
      player.position.z + Math.sin(angle) * 10
    )
    scene.add(e)
    enemies.push(e)
  }

  // 2. Función que actualiza cada frame
  function updateEnemies() {
    const speed = 0.02
    enemies.forEach(e => {
      const dir = new THREE.Vector3()
        .subVectors(player.position, e.position)
        .setY(0)
        .normalize()
      e.position.addScaledVector(dir, speed)
    })
  }

  // 3. Registrar en el ciclo de animación de ThreeMap.vue
  window.updateFunctions = window.updateFunctions || []
  window.updateFunctions.push(updateEnemies)
})
</script>
