<template>
    <div class="flex justify-center w-full h-full " id="svg-container">

    </div>
    <div class = "flex justify-center">
  <button id="draw-home-player" x="10" y="10" width="100" height="30" class="svg-button" >Vẽ cầu thủ đội nhà</button>
  <button id="draw-away-player" x="10" y="10" width="100" height="30" class="svg-button" >Vẽ cầu thủ đội khách</button>
  <button id="draw-line" x="10" y="10" width="100" height="30"class="svg-button">Vẽ đường thẳng</button>
  <button id="delete" x="10" y="10" width="100" height="30"class="svg-button">Xoa tat ca</button>
    </div>

  </template>
  
  <script>
import * as d3 from "d3";
import { onMounted } from "vue";
import d3Utils from "~/plugin/d3Utils";
import interactDrag from "~/plugin/d3Utils/drawing/interactDrag";
import interact from "interactjs"  
import axios from "axios";
import { saveAwayPlayerData, saveLineData,saveHomePlayerData } from "~/plugin/d3Utils/controller/data.controller";
  export default {
    name: 'Boards',
    setup() {
    onMounted(() => {
      const menu = {
        drawingLine: false,
        drawingHomePlayer: false,
        drawingAwayPlayer: false
      }

      const svg = d3.select("#svg-container").append('svg')
      const homePlayerDrawButton = document.getElementById('draw-home-player')
      const awayPlayerDrawButton = document.getElementById('draw-away-player')
      const lineDrawButton = document.getElementById('draw-line')
      const deleteButton = document.getElementById('delete')

      homePlayerDrawButton.onclick = function toggleDrawPlayer() {
        menu.drawingHomePlayer = !menu.drawingHomePlayer
        menu.drawingLine = false
        menu.drawingAwayPlayer = false
        const button1Text = menu.drawingHomePlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội nhà";
        homePlayerDrawButton.textContent = button1Text;
        const button2Text = menu.drawingLine ? "Dừng vẽ" : "Vẽ đường thẳng";
        lineDrawButton.textContent = button2Text;
        const button3Text = menu.drawingAwayPlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội khách";
        awayPlayerDrawButton.textContent = button3Text;
  }
      awayPlayerDrawButton.onclick = function toggleDrawPlayer() {
        menu.drawingAwayPlayer = !menu.drawingAwayPlayer
        menu.drawingLine = false
        menu.drawingHomePlayer = false
        const button1Text = menu.drawingHomePlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội nhà";
        homePlayerDrawButton.textContent = button1Text;
        const button2Text = menu.drawingLine ? "Dừng vẽ" : "Vẽ đường thẳng";
        lineDrawButton.textContent = button2Text;
        const button3Text = menu.drawingAwayPlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội khách";
        awayPlayerDrawButton.textContent = button3Text;
  }
      lineDrawButton.onclick = function toggleDrawLine() {
        menu.drawingLine = !menu.drawingLine
        menu.drawingHomePlayer = false
        menu.drawingAwayPlayer = false
        const button1Text = menu.drawingHomePlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội nhà";
        homePlayerDrawButton.textContent = button1Text;
        const button2Text = menu.drawingLine ? "Dừng vẽ" : "Vẽ đường thẳng";
        lineDrawButton.textContent = button2Text;
        const button3Text = menu.drawingHomePlayer ? "Dừng vẽ" : "Vẽ cầu thủ đội khách";
        awayPlayerDrawButton.textContent = button3Text;
  }
      interactDrag('home-player')
      interactDrag('away-player')

      function resize () {
        svg.selectAll("*").remove()
        const inputContainer = document.getElementById('svg-container')
        const inputWidth = inputContainer.offsetWidth
        const inputHeight = inputContainer.offsetHeight
        d3Utils(svg, inputWidth,inputHeight, menu)
      }
      deleteButton.onclick = function deleteData() {
        const trong = []
        saveAwayPlayerData(trong)
        saveHomePlayerData(trong)
        saveLineData(trong)
        setTimeout(resize(), 500)
      }
      window.addEventListener("resize", resize);
      resize()
    })
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