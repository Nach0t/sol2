<template> 
  <!-- Menú principal -->
  <div v-if="showMenu" class="menu">
    <h1>Bienvenido a Brain Rots</h1>
    <button @click="startGame">Jugar</button>
  </div>

  <!-- Escena del juego -->
  <GameScene v-else @goToMenu="returnToMainMenu" />
</template>

<script setup>
import { ref } from 'vue'
import GameScene from './components/GameScene.vue'

// Control para mostrar el menú
const showMenu = ref(true)

// Iniciar el juego
function startGame() {
  showMenu.value = false
}

// Volver al menú principal (se llama desde GameScene)
function returnToMainMenu() {
  showMenu.value = true
}
</script>

<style src="./style.css"></style>
