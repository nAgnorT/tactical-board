<template>
    <div class="flex justify-center w-full h-full " id = "svg-container">
    </div>
  </template>
  
  <script>
import * as d3 from "d3";
import { onMounted } from "vue";
  
  export default {
    name: 'Boards',
    setup() {
    onMounted(() => {
      // Sử dụng D3 để thao tác với SVG
      var svgWidth= 1, svgHeight= 1;
const svg = d3.select("#svg-container")
    .append("svg")

// Responsive
function resize() {
    // Cập nhật kích thước SVG
    const element = document.getElementById('svg-container')
    const width = element.offsetWidth * 0.8
    const height = element.offsetHeight * 0.9
    do {
        if(svgWidth < width && svgHeight < height ){
            svgWidth = width
            svgHeight = svgWidth*0.64
            }
        else if (svgHeight > height) {
            svgHeight = height
            svgWidth = svgHeight * 100/64
        }
        else {
            svgWidth = width
            svgHeight = svgWidth*0.64
        }
    } while(svgHeight > height)
    setTimeout(()=> {
        svg.selectAll("*").remove()
    svg
        .attr("width", svgWidth)
        .attr("height", svgHeight)
    const pitchWidth = svgWidth*0.9
    const pitchHeight = pitchWidth*0.64
    const bigCircle = pitchWidth*0.0915
    const penaltyKick = pitchWidth * 0.11
    const penaltyAreaHeight = pitchWidth * 0.403
    const penaltyAreaWidth = pitchWidth * 0.165
    const goalAreaHeight = pitchWidth * 0.283
    const goalAreaWidth = pitchWidth * 0.055
    const goalWidth = pitchWidth*0.02
    const goalHeight = pitchWidth*0.0732
    const centerX = svgWidth/2
    const centerY = svgHeight / 2
    svg.append('rect')
    .attr("x", centerX - pitchWidth/2)
    .attr("y", centerY - pitchHeight/2)
    .attr("width", pitchWidth)
    .attr("height", pitchHeight)
    // vòng giữa sân
svg.append("circle")
.attr("cx", centerX)
.attr("cy", centerY)
.attr("r", bigCircle)
// chấm giữa sân
svg.append("circle")
.attr("cx", centerX)
.attr("cy", centerY)
.attr("r", 3)

// đường giữa sân
svg.append("line")
.attr("x1", centerX)
.attr("y1", centerY - pitchHeight/2)
.attr("x2", centerX)
.attr("y2", centerY + pitchHeight/2)

// vòng bán nguyệt trước vòng cấm
svg.append("circle")
.attr("cx", centerX - pitchWidth/2 + penaltyKick)
.attr("cy", centerY)
.attr("r", bigCircle)
svg.append("circle")
.attr("cx", centerX + pitchWidth/2 - penaltyKick)
.attr("cy", centerY)
.attr("r", bigCircle)
// vòng cấm
svg.append('rect')
.attr("x",centerX - pitchWidth/2)
.attr("y", centerY - penaltyAreaHeight/2)
.attr("width", penaltyAreaWidth)
.attr("height", penaltyAreaHeight)
svg.append('rect')
.attr("x",centerX + pitchWidth/2 -penaltyAreaWidth)
.attr("y", centerY - penaltyAreaHeight/2)
.attr("width", penaltyAreaWidth)
.attr("height", penaltyAreaHeight)
// vòng 5m50
svg.append('rect')
.attr("x", centerX- pitchWidth/2)
.attr("y", centerY - goalAreaHeight/2)
.attr("width", goalAreaWidth)
.attr("height", goalAreaHeight)
svg.append('rect')
.attr("x", centerX + pitchWidth/2 - goalAreaWidth)
.attr("y", centerY - goalAreaHeight/2)
.attr("width", goalAreaWidth)
.attr("height", goalAreaHeight)
// chấm penalty
svg.append("circle")
.attr("cx", centerX - pitchWidth/2 + penaltyKick)
.attr("cy", centerY)
.attr("r", 2)
svg.append("circle")
.attr("cx", centerX + pitchWidth/2 - penaltyKick)
.attr("cy", centerY)
.attr("r", 2)
// cầu môn
svg.append("rect")
.attr("x", centerX-pitchWidth/2-goalWidth)
.attr("y", centerY-goalHeight/2)
.attr("width", goalWidth)
.attr("height", goalHeight)
svg.append("rect")
.attr("class", "goal")
.attr("x", centerX+pitchWidth/2)
.attr("y", centerY-goalHeight/2)
.attr("width", goalWidth)
.attr("height", goalHeight)
    },500)
  }
  
  // Gọi hàm resize khi kích thước cửa sổ thay đổi
  window.addEventListener("resize", resize);
  
  // Gọi hàm resize một lần khi tải trang
  resize();

    });
  },
  }
  </script>
  <style>
    rect{
        fill:white;
        stroke: black;
        stroke-width: "2px";
    }
    line, circle{
      fill:none;
      stroke: black;
      stroke-width: "2px";
    }
</style>