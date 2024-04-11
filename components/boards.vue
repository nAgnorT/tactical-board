<template>
    <div class="flex justify-center w-full h-full " id="svg-container">
    </div>
    <button id="draw-player" x="10" y="10" width="100" height="30">Vẽ cầu thủ</button>
  <button id="draw-line" x="10" y="10" width="100" height="30">Vẽ đường thẳng</button>
  <button id="save" x="10" y="10" width="100" height="30">Lưu</button>
  </template>
  
  <script>
import * as d3 from "d3";
import { onMounted } from "vue";
import d3Utils from "~/plugin/d3Utils";
import interactDrag from "~/plugin/d3Utils/drawing/interactDrag";
  
  export default {
    name: 'Boards',
    setup() {
    onMounted(() => {
      const svg = d3.select("#svg-container").append('svg')
      let playerData = []
      function resize () {

        const inputContainer = document.getElementById('svg-container')
        const inputWidth = inputContainer.offsetWidth
        const inputHeight = inputContainer.offsetHeight
        d3Utils(svg, inputWidth,inputHeight,playerData)
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
</style>