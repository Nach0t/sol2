<template>
  <div v-if="showMenu" class="menu">
    <h1>Bienvenido a Brain Rots</h1>
    <button @click="startGame">Jugar</button>
  </div>

  <div v-else>
    <ThreeMap />
    <PlayerCube />
    <Enemies />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThreeMap from './components/ThreeMap.vue'
import PlayerCube from './components/PlayerCube.vue'
import Enemies from './components/Enemies.vue'

const showMenu = ref(true)

function startGame() {
  showMenu.value = false
}
</script>

<style src="./style.css"></style>
