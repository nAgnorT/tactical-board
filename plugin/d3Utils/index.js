import * as d3 from "d3"
import { isVertical,isHorizontal } from "./checking/checkPitch"
import isMobile from "./checking/isMobile"
import { loadHorizontalPitch,loadVerticalPitch } from "./drawing/pitchDrawing"
import { loadPlayerData, playerDraw } from "./drawing/playerDrawing"
import { loadLineData,drawLine } from "./drawing/lineDrawing"
export default (svg, inputWidth, inputHeight, menu)=> {
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
    svg.call(playerDraw, ratio, centerX, centerY,menu)

    svg.call(loadPlayerData, ratio, centerX,centerY)
    svg.call(drawLine,ratio, centerX,centerY, menu)
    svg.call(loadLineData, ratio, centerX,centerY)

}