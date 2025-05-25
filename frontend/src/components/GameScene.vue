<template>
  <div>
    <!-- Menú de pausa -->
    <div v-if="paused && !showConfirmMenu" class="pause-menu">
      <h1 class="pause-title">PAUSA</h1>
      <div class="menu-buttons">
        <button @click="resumeGame">Reanudar</button>
        <button @click="confirmGoToMenu">Volver al inicio</button>
      </div>
    </div>

    <!-- Confirmación para volver al menú -->
    <div v-if="showConfirmMenu" class="pause-menu">
      <h1 class="pause-title">¿Volver al inicio?</h1>
      <div class="confirmation-buttons">
        <button @click="goToMainMenu">Sí</button>
        <button @click="cancelConfirmations">No</button>
      </div>
    </div>

    <!-- Escena del juego -->
    <ThreeMap v-show="!paused" />
    <PlayerCube :paused="paused" />
    <Enemies :paused="paused" v-show="!paused" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ThreeMap from './ThreeMap.vue'
import PlayerCube from './PlayerCube.vue'
import Enemies from './Enemies.vue'
import { resetScene } from '@/sceneGlobals'

const emit = defineEmits(['goToMenu'])

const paused = ref(false)
const showConfirmMenu = ref(false)

function handleKeydown(e) {
  if (e.key === 'Escape') {
    paused.value = !paused.value
    cancelConfirmations()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function resumeGame() {
  paused.value = false
}

function confirmGoToMenu() {
  showConfirmMenu.value = true
}

function cancelConfirmations() {
  showConfirmMenu.value = false
}

function goToMainMenu() {
  resetScene()
  paused.value = false
  showConfirmMenu.value = false
  emit('goToMenu')
}
</script>

<style scoped>

</style>
