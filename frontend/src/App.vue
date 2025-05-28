<template>
  <div id="app">
    <!-- Menú principal -->
    <div v-if="showMenu" class="menu">
      <h1>Dead Rising</h1>

      <div class="menu-buttons">
        <button @click="startGame">Iniciar</button>
        <button @click="toggleInstructions">¿Cómo jugar?</button>
      </div>

      <div v-if="showInstructions" class="instructions">
        <p>🧟 Usa <b>W, A, S, D</b> para moverte, click izquierdo para disparar.</p>
        <p>🎯 ¡Evita que los zombies te toquen o perderás vida!</p>
      </div>
    </div>

    <!-- Escena del juego -->
    <GameScene v-else @goToMenu="returnToMenu" />
  </div>
</template>

<script>
import GameScene from '@/components/GameScene.vue'
import { renderer, scene, camera, updateFunctions } from './sceneGlobals'

export default {
  name: 'App',
  components: { GameScene },
  data() {
    return {
      showMenu: true,
      showInstructions: false,
      animationFrameId: null
    }
  },
  methods: {
    startGame() {
      this.showMenu = false
    },
    toggleInstructions() {
      this.showInstructions = !this.showInstructions
    },
    returnToMenu() {
      this.showMenu = true
      // Detener la generación de enemigos si es necesario
      window.stopSpawning = false; // o true, según el caso
    }
  },
  mounted() {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate)
      updateFunctions.forEach(fn => fn())
      try {
        renderer.render(scene, camera)
      } catch (e) {
        console.error('Render error:', e)
      }
    }
    animate()

    this.cancelAnimation = () => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }
    }
  },
  beforeUnmount() {
    if (this.cancelAnimation) this.cancelAnimation()

    updateFunctions.length = 0

    while (scene.children.length > 0) {
      const obj = scene.children[0]
      scene.remove(obj)
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    }

    renderer.dispose()
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
