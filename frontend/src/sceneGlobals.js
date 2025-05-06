import * as THREE from 'three'

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
export const renderer = new THREE.WebGLRenderer({ antialias: true })
export const updateFunctions = []

export function resetScene() {
  // Eliminar todos los objetos de la escena y liberar memoria
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

  // Limpiar funciones de actualización
  updateFunctions.length = 0

  // Eliminar o reiniciar el jugador
  if (window.player) {
    // Si prefieres reiniciar su posición en vez de borrarlo, usa esto:
    window.player.position.set(10.25, 1, 0.5)
    window.player.rotation.set(0, 0, 0)
  } else {
    // Si prefieres forzar que se vuelva a crear desde cero:
    delete window.player
  }
}
