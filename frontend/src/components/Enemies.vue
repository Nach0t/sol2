<template><div style="display: none;"></div></template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { scene, updateFunctions } from '@/sceneGlobals'

onMounted(() => {
  const player = window.player
  if (!player) {
    console.warn('Enemies: jugador aún no cargado')
    return
  }

  setTimeout(() => {
    const enemies = []
    const N = 6
    const radius = 10

    for (let i = 0; i < N; i++) {
      const enemy = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
      )
      const angle = (i / N) * Math.PI * 2
      enemy.position.set(
        player.position.x + Math.cos(angle) * radius,
        0.5,
        player.position.z + Math.sin(angle) * radius
      )
      scene.add(enemy)
      enemies.push(enemy)
    }

    const enemySpeed = 0.035

    updateFunctions.push(() => {
      const playerBox = new THREE.Box3().setFromObject(player)

      enemies.forEach((enemy, i) => {
        const direction = new THREE.Vector3()
          .subVectors(player.position, enemy.position)
          .setY(0)
          .normalize()

        const nextPos = enemy.position.clone().addScaledVector(direction, enemySpeed)
        const nextBox = new THREE.Box3().setFromCenterAndSize(nextPos, new THREE.Vector3(1, 1, 1))

        let canMove = true

        // Colisión con el jugador
        if (nextBox.intersectsBox(playerBox)) {
          canMove = false
        }

        // Colisión con otros enemigos
        for (let j = 0; j < enemies.length; j++) {
          if (i === j) continue
          const other = enemies[j]
          const otherBox = new THREE.Box3().setFromObject(other)
          if (nextBox.intersectsBox(otherBox)) {
            canMove = false
            break
          }
        }

        if (canMove) {
          enemy.position.copy(nextPos)
        }
      })
    })
  }, 3000)
})
</script>
