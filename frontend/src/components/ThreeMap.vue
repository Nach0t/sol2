<template>
  <div ref="container" style="width: 100vw; height: 100vh; background-color: black;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { scene, camera, renderer, updateFunctions } from '@/sceneGlobals'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

const container = ref(null)

onMounted(() => {
  scene.background = new THREE.Color(0x202020)
  camera.position.set(10.25, 5, 10.5)
  camera.lookAt(10.25, 0, 0.5)

  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableRotate = false
  controls.enableZoom = false

  scene.add(new THREE.AmbientLight(0x404040))
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(10, 20, 10)
  scene.add(light)

  const loader = new GLTFLoader()
  loader.load('/models/MapaConCubo.glb', gltf => {
    scene.add(gltf.scene)
  })

  function animate() {
    requestAnimationFrame(animate)
    updateFunctions.forEach(fn => fn())
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>
