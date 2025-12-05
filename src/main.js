import './style.css'
import { PLAYER_1, PLAYER_2, SYSTEM } from '@rcade/plugin-input-classic'
// import { SPINNER_1, SPINNER_2 } from '@rcade/plugin-input-spinners'

import * as THREE from 'three'

const app = document.querySelector('#app')
app.innerHTML = `
  <div id="status">Press 1P START</div>
  <canvas id="three"></canvas>
`

const status = document.querySelector('#status')

/*
    SETUP --------------------------------------------------------------------------------
*/

const canvas = document.querySelector('#three')
const renderer = new THREE.WebGLRenderer({ canvas })

const WIDTH = 336
const HEIGHT = 262

renderer.setSize(WIDTH, HEIGHT, false)
renderer.setPixelRatio(1)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 4

const geometryP1 = new THREE.BoxGeometry()
const materialP1 = new THREE.MeshStandardMaterial({ color: 'hotpink' })
const cubeP1 = new THREE.Mesh(geometryP1, materialP1)
scene.add(cubeP1)

const geometryP2 = new THREE.BoxGeometry()
const materialP2 = new THREE.MeshStandardMaterial({ color: 'hotpink' })
const cubeP2 = new THREE.Mesh(geometryP2, materialP2)
scene.add(cubeP2)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(3, 3, 3)
scene.add(light)


/*
    GAME STATE --------------------------------------------------------------------------------
*/

let gameStarted = false

/*
    MAIN LOOP --------------------------------------------------------------------------------
*/
function update() {
    if (!gameStarted) {
        if (SYSTEM.ONE_PLAYER) {
            gameStarted = true
            status.textContent = 'Game Started!'
        }
        if (SYSTEM.TWO_PLAYER) {
            gameStarted = true
            status.textContent = 'Game Started!'
        }
        requestAnimationFrame(update)
        return
    }

    status.style.display = 'none'

    // Player 1 controls
    const speed = 0.04

    if (PLAYER_1.DPAD.up) cubeP1.position.y += speed
    if (PLAYER_1.DPAD.down) cubeP1.position.y -= speed
    if (PLAYER_1.DPAD.left) cubeP1.position.x -= speed
    if (PLAYER_1.DPAD.right) cubeP1.position.x += speed

    // Player 2 controls
    if (PLAYER_2.DPAD.up) cubeP2.position.y += speed
    if (PLAYER_2.DPAD.down) cubeP2.position.y -= speed
    if (PLAYER_2.DPAD.left) cubeP2.position.x -= speed
    if (PLAYER_2.DPAD.right) cubeP2.position.x += speed

    cubeP1.rotation.x += 0.01
    cubeP1.rotation.y += 0.02
    cubeP2.rotation.x += 0.01
    cubeP2.rotation.y += 0.02

    renderer.render(scene, camera)
    requestAnimationFrame(update)
}

update()
