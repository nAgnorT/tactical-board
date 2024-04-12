<template>
    <div class="flex justify-center w-full h-full " id="svg-container">

    </div>
    <div class = "flex justify-center">
  <button id="draw-player" x="10" y="10" width="100" height="30" class="svg-button" >Vẽ cầu thủ</button>
  <button id="draw-line" x="10" y="10" width="100" height="30"class="svg-button">Vẽ đường thẳng</button>
  <button id="save" x="10" y="10" width="100" height="30"class="svg-button">Lưu</button>
    </div>

  </template>
  
  <script>
import * as d3 from "d3";
import { onMounted } from "vue";
import d3Utils from "~/plugin/d3Utils";
import interactDrag from "~/plugin/d3Utils/drawing/interactDrag";
import interact from "interactjs"  
  export default {
    name: 'Boards',
    setup() {
    onMounted(() => {
      const menu = {
        drawingLine: false,
        drawingPlayer: false
      }
      const svg = d3.select("#svg-container").append('svg')
      const playerDrawButton = document.getElementById('draw-player')
      const lineDrawButton = document.getElementById('draw-line')
      playerDrawButton.onclick = function toggleDrawPlayer() {
        menu.drawingPlayer = !menu.drawingPlayer
        menu.drawingLine = false
        const button1Text = menu.drawingPlayer ? "Dừng vẽ" : "Vẽ cầu thủ";
        playerDrawButton.textContent = button1Text;
        const button2Text = menu.drawingLine ? "Dừng vẽ" : "Vẽ đường thẳng";
        lineDrawButton.textContent = button2Text;
}
      lineDrawButton.onclick = function toggleDrawLine() {
        menu.drawingLine = !menu.drawingLine
        menu.drawingPlayer = false
        const button1Text = menu.drawingPlayer ? "Dừng vẽ" : "Vẽ cầu thủ";
        playerDrawButton.textContent = button1Text;
        const button2Text = menu.drawingLine ? "Dừng vẽ" : "Vẽ đường thẳng";
        lineDrawButton.textContent = button2Text;
}
      let playerData = []
      let lineData =[]
      function resize () {

        const inputContainer = document.getElementById('svg-container')
        const inputWidth = inputContainer.offsetWidth
        const inputHeight = inputContainer.offsetHeight
        d3Utils(svg, inputWidth,inputHeight,playerData,lineData, menu)
      }
      window.addEventListener("resize", resize);
      interactDrag('player')
      resize()
    });
  },
  }
  </script>
  <style>
    rect{
      fill: none;
        stroke: black;
        stroke-width: "2px";
    }
    line, circle{
      stroke: black;
      stroke-width: "2px";
    }
    .svg-button{
      @apply py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
    }
</style>