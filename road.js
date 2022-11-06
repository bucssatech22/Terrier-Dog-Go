import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const roadElems = document.querySelectorAll("[data-road]")

export function setupRoad() {
  setCustomProperty(roadElems[0], "--left", 0)
  setCustomProperty(roadElems[1], "--left", 300)
}

export function updateRoad(delta, speedScale) {
  roadElems.forEach(road => {
    incrementCustomProperty(road, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(road, "--left") <= -300) {
      incrementCustomProperty(road, "--left", 600)
    }
  })
}
