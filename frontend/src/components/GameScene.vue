<template>
  <div>
    <!-- Menú de pausa -->
    <div v-if="paused && !showConfirmRestart && !showConfirmMenu" class="menu">
      <h1>Pausa</h1>
      <button @click="resumeGame">Reanudar</button>
      <button @click="openSettings">Ajustes</button>
      <button @click="confirmRestart">Reiniciar</button>
      <button @click="confirmGoToMenu">Volver al inicio</button>
    </div>

    <!-- Confirmación de reinicio -->
    <div v-if="showConfirmRestart" class="menu">
      <h1>¿Reiniciar?</h1>
      <div class="confirmation-buttons">
        <button @click="restartGame">Sí</button>
        <button @click="cancelConfirmations">No</button>
      </div>
    </div>

    <!-- Confirmación de volver al menú -->
    <div v-if="showConfirmMenu" class="menu">
      <h1>¿Volver al inicio?</h1>
      <div class="confirmation-buttons">
        <button @click="goToMainMenu">Sí</button>
        <button @click="cancelConfirmations">No</button>
      </div>
    </div>

    <!-- Escena 3D -->
    <ThreeMap />
    <PlayerCube :paused="paused" />
    <Enemies />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ThreeMap from './ThreeMap.vue'
import PlayerCube from './PlayerCube.vue'
import Enemies from './Enemies.vue'
import { resetScene } from '@/sceneGlobals' // Debe limpiar todos los objetos 3D

const emit = defineEmits(['goToMenu'])

const paused = ref(false)
const showConfirmRestart = ref(false)
const showConfirmMenu = ref(false)

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      paused.value = !paused.value
      cancelConfirmations()
    }
  })
})

function resumeGame() {
  paused.value = false
}

function openSettings() {
  alert("Ajustes todavía no implementados.")
}

function confirmRestart() {
  showConfirmRestart.value = true
  showConfirmMenu.value = false
}

function confirmGoToMenu() {
  showConfirmMenu.value = true
  showConfirmRestart.value = false
}

function cancelConfirmations() {
  showConfirmRestart.value = false
  showConfirmMenu.value = false
}

function restartGame() {
  resetScene()             // Elimina todos los elementos de la escena
  paused.value = false
  cancelConfirmations()
}

function goToMainMenu() {
  resetScene()
  paused.value = false
  cancelConfirmations()
  emit('goToMenu')         // Comunica al padre que debe cambiar la vista
}
</script>

<style src="@/style.css"></style>
