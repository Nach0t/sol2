<template>
  <div style="display: none;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { scene, updateFunctions } from '@/sceneGlobals'

let enemies = []
let spawnInterval
let player
let enemySpeed = 0.035
const maxEnemies = 12000

function spawnEnemies(count = 3) {
  if (!player) return

  const radius = 10
  const baseAngle = Math.random() * Math.PI * 2

  for (let i = 0; i < count && enemies.length < maxEnemies; i++) {
    const angle = baseAngle + (i / count) * Math.PI * 2
    const enemy = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    )
    enemy.position.set(
      player.position.x + Math.cos(angle) * radius,
      0.5,
      player.position.z + Math.sin(angle) * radius
    )
    scene.add(enemy)
    enemies.push(enemy)
  }
}

function startSpawningEnemies() {
  // Primera oleada luego de 15 segundos
  setTimeout(() => {
    spawnEnemies(3)

    // Luego una nueva oleada cada 10 segundos
    spawnInterval = setInterval(() => {
      spawnEnemies(5 )
    }, 10000)
  }, 15000) // Segundos para los primeros enemigos
}

function updateEnemyLogic() {
  const playerBox = new THREE.Box3().setFromObject(player)

  enemies.forEach((enemy, i) => {
    const direction = new THREE.Vector3()
      .subVectors(player.position, enemy.position)
      .setY(0)
      .normalize()

    const nextPos = enemy.position.clone().addScaledVector(direction, enemySpeed)
    const nextBox = new THREE.Box3().setFromCenterAndSize(nextPos, new THREE.Vector3(1, 1, 1))

    let canMove = true

    if (nextBox.intersectsBox(playerBox)) {
      canMove = false
    }

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
}

onMounted(() => {
  player = window.player
  if (!player) {
    console.warn('Enemies: jugador aún no cargado')
    return
  }

  startSpawningEnemies()
  updateFunctions.push(updateEnemyLogic)
})

onBeforeUnmount(() => {
  clearInterval(spawnInterval)
  enemies.forEach(e => scene.remove(e))
  enemies = []
})
</script>
