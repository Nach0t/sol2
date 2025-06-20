<template>
  <div id="app">
    <!-- Intro Video -->
    <div v-if="showIntro" class="intro-video">
      <video
        ref="introVideo"
        @ended="onIntroEnd"
        class="video-element"
        playsinline
      >
        <source src="/video/intro.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>

    <!-- Menú principal -->
    <div v-else-if="showMenu" class="menu">
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
      showIntro: true,
      showMenu: false,
      showInstructions: false,
      animationFrameId: null,
      enterHoldStart: null,
      enterHoldTimeout: null
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
      window.stopSpawning = false
    },
    onIntroEnd() {
      this.showIntro = false
      this.showMenu = true
    },
    skipIntro() {
      const video = this.$refs.introVideo
      if (video) {
        video.pause()
        video.currentTime = 0
      }
      this.onIntroEnd()
    }
  },
  mounted() {
    // Render loop
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

    // Intro video con sonido tras interacción
    const video = this.$refs.introVideo
    const playVideoWithSound = () => {
      if (video) {
        video.muted = false
        video.volume = 1.0
        video.play().catch(e => console.warn('Autoplay failed:', e))
      }
      window.removeEventListener('keydown', playVideoWithSoundOnce)
      window.removeEventListener('mousedown', playVideoWithSoundOnce)
    }

    const playVideoWithSoundOnce = () => {
      playVideoWithSound()
    }

    window.addEventListener('keydown', playVideoWithSoundOnce)
    window.addEventListener('mousedown', playVideoWithSoundOnce)

    // Detectar mantener presionado Enter por 5 segundos
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !this.enterHoldStart) {
        this.enterHoldStart = Date.now()
        this.enterHoldTimeout = setTimeout(() => {
          if (this.showIntro) this.skipIntro()
        }, 5000)
      }
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.enterHoldStart = null
        clearTimeout(this.enterHoldTimeout)
      }
    })

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

.intro-video {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
