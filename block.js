import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const BLOCK_INTERVAL_MIN = 1000
  const BLOCK_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextBlockTime
  export function setupBlock() {
    nextBlockTime = BLOCK_INTERVAL_MIN
    document.querySelectorAll("[data-block]").forEach(block => {
      block.remove()
    })
  }
  
  export function updateBlock(delta, speedScale) {
    document.querySelectorAll("[data-block]").forEach(block => {
      incrementCustomProperty(block, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(block, "--left") <= -100) {
        block.remove()
      }
    })
  
    if (nextBlockTime <= 0) {
      createBlock()
      nextBlockTime =
        randomNumberBetween(BLOCK_INTERVAL_MIN, BLOCK_INTERVAL_MAX) / speedScale
    }
    nextBlockTime -= delta
  }
  
  export function getBlockRects() {
    return [...document.querySelectorAll("[data-block]")].map(block => {
      return block.getBoundingClientRect()
    })
  }
  
  function createBlock() {
    const block = document.createElement("img")
    block.dataset.block = true
    block.src = "imgs/block.png"
    block.classList.add("block")
    setCustomProperty(block, "--left", 100)
    worldElem.append(block)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  