import * as d3 from "d3"
import { isVertical,isHorizontal } from "./checking/checkPitch"
import isMobile from "./checking/isMobile"
import { loadHorizontalPitch,loadVerticalPitch } from "./drawing/pitchDrawing"
import { loadPlayerData, playerDraw } from "./drawing/playerDrawing"
import { loadLineData,drawLine } from "./drawing/lineDrawing"
export default (svg, inputWidth, inputHeight, playerData,lineData, menu)=> {
    let svgSize

    let svgWidth= 1,svgHeight= 1
    let ratio = 1
    if(isMobile()){
        svgSize = isVertical(svgWidth, svgHeight, inputWidth, inputHeight)
    }
    else{
        svgSize = isHorizontal(svgWidth, svgHeight, inputWidth, inputHeight)
    }
    svgWidth = svgSize.svgWidth
    svgHeight = svgSize.svgHeight
    const centerX = svgWidth/2
    const centerY = svgHeight / 2
    svg.selectAll("*").remove()
    svg
          .attr("width", svgWidth)
          .attr("height", svgHeight)
    if (svgHeight>svgWidth) {
            const pitchHeight = svgHeight*0.95
            ratio = pitchHeight/100
            loadVerticalPitch(svg,pitchHeight,centerX,centerY)
    }
    else{
            const pitchWidth = svgWidth * 0.95
            ratio = pitchWidth/100
            loadHorizontalPitch(svg,pitchWidth,centerX,centerY)
    }
    svg.call(loadPlayerData,playerData, ratio, centerX,centerY)
    svg.call(playerDraw, playerData, ratio,centerX,centerY, menu)
    svg.call(drawLine,ratio, lineData,centerX,centerY, menu)
    svg.call(loadLineData, ratio, lineData,centerX,centerY)

}