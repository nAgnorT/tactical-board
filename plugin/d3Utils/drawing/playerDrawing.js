import * as d3 from 'd3'
import { translatePlayerPosition,swapDeviceX,swapDeviceY } from '../checking/translate'
import { getAwayPlayerData,getHomePlayerData,saveAwayPlayerData, saveHomePlayerData } from '../controller/data.controller'
const server ='http://127.0.0.1:3056'


async function playerDraw (svg, ratio,centerX,centerY,menu) {
    let homePlayerData = await getHomePlayerData()
    let playerData = await getAwayPlayerData()
    svg.on("click", function(e){
         if (menu.drawingHomePlayer){
          let number = homePlayerData.length === 0? 1 : homePlayerData[homePlayerData.length-1].number + 1
          let [baseX,baseY] = d3.pointer(e)
          const r = ratio * 1.5
          const player = svg.append('g').attr("data-home-player",number).attr("class","home-player").style("cursor", "pointer")
          const [transX, transY] = translatePlayerPosition(centerX,centerY, ratio, baseX,baseY)
          const homePlayerPoint = {
            number: number,
            x: transX,
            y: transY,
            type: 'home'
           }
          homePlayerData.push(homePlayerPoint)
           saveHomePlayerData(homePlayerData)
            player.append("circle")
              .attr("cx", baseX)
              .attr("cy", baseY)
              .attr("r", r)
              .attr("fill", "#ff6961");
          
          
            player.append("text")
              .attr("x", baseX)
              .attr("y", baseY+r/2)
              .attr("font-size", "1rem")
              .attr("text-anchor", "middle")
              .attr("font", "bold")
              .attr("color", "white")
              .text(number);
          
            player.call(dragPlayer(homePlayerData,centerX,centerY,ratio))
          
          
         }
         if(menu.drawingAwayPlayer) {
          let number = playerData.length === 0? 1 : playerData[playerData.length-1].number + 1
          let [baseX,baseY] = d3.pointer(e)
          const r = ratio * 1.5
          const player = svg.append('g').attr("data-away-player",number).attr("class","away-player").style("cursor", "pointer")
          const [transX, transY] = translatePlayerPosition(centerX,centerY, ratio, baseX,baseY)
           const playerPoint = {
            number: number,
            x: transX,
            y: transY,
            type: 'away'
           }
            playerData.push(playerPoint)
           saveAwayPlayerData(playerData)
            player.append("circle")
              .attr("cx", baseX)
              .attr("cy", baseY)
              .attr("r", r)
              .attr("fill", "#dbe9f4");
          
          
            player.append("text")
              .attr("x", baseX)
              .attr("y", baseY+r/2)
              .attr("font-size", "1rem")
              .attr("text-anchor", "middle")
              .attr("font", "bold")
              .attr("color", "white")
              .text(number);
          
            player.call(dragPlayer(playerData,centerX,centerY,ratio))
          
          
        }
    })
}

async function loadPlayerData(svg, ratio, centerX,centerY) {
  let homePlayerData = await getHomePlayerData()
  let awayPlayerData = await getAwayPlayerData()
  const r = 1.5*ratio
  for( let i = 0; i<homePlayerData.length; i++) {
    const d = homePlayerData[i]
    const player = svg.append('g').attr("data-home-player", d.number).attr("class","home-player").style("cursor","pointer")
    player.append('circle')
      .attr("cx", centerX - swapDeviceX(d.x,d.y)*ratio )
      .attr("cy", centerY - swapDeviceY(d.x,d.y)*ratio)
      .attr("r",r)
      .attr("fill", "#ff6961") 
    player.append('text')
      .attr("x", centerX - swapDeviceX(d.x,d.y)*ratio)
      .attr("y", centerY - swapDeviceY(d.x,d.y)*ratio + r/2)
      .attr("font-size", "1 rem")
      .attr("text-anchor", "middle")
      .text(d.number);
    player.call(dragPlayer(homePlayerData,centerX,centerY,ratio))
  }
  for( let i = 0; i<awayPlayerData.length; i++) {
    const d = awayPlayerData[i]
    const player = svg.append('g').attr("data-away-player", d.number).attr("class","away-player").style("cursor","pointer")
    player.append('circle')
      .attr("cx", centerX - swapDeviceX(d.x,d.y)*ratio )
      .attr("cy", centerY - swapDeviceY(d.x,d.y)*ratio)
      .attr("r",r)
      .attr("fill", "#dbe9f4") 
    player.append('text')
      .attr("x", centerX - swapDeviceX(d.x,d.y)*ratio)
      .attr("y", centerY - swapDeviceY(d.x,d.y)*ratio + r/2)
      .attr("font-size", "1 rem")
      .attr("text-anchor", "middle")
      .text(d.number);
    player.call(dragPlayer(awayPlayerData,centerX,centerY,ratio))
  }
  
}
const dragPlayer = (playerData,centerX,centerY,ratio) => {
    let baseX, baseY,newX,newY
    function dragStarted (event) {
      // console.log(this)
      [baseX,baseY]= d3.pointer(event)
      d3.select(this).raise().attr("cursor", "grabbing")
    }
  
    function dragged (event){
      
      [newX, newY] = [event.x, event.y]
      d3.select(this).attr("transform", `translate(${newX - baseX}, ${newY - baseY})`)
    }
  
    function dragEnded (event) {
      [newX, newY] = translatePlayerPosition(centerX,centerY,ratio,event.x,event.y)
      const type = d3.select(this).attr("class")
      if (type==='home-player') {
        const number = d3.select(this).attr("data-home-player")
        let id
        for (let i=0; i<playerData.length; i++){
          if(playerData[i].number == number) id = i
        }
        playerData[id].x=newX
        playerData[id].y=newY
        saveHomePlayerData(playerData)
      }
      else{
        const number = d3.select(this).attr("data-away-player")
        let id
        for (let i=0; i<playerData.length; i++){
          if(playerData[i].number == number) id = i
        }
        playerData[id].x=newX
        playerData[id].y=newY
        saveAwayPlayerData(playerData)
      }
      d3.select(this).attr("cursor", "default")
    }
  
    return d3.drag()
              .on("start",dragStarted)
              .on("drag", dragged)
              .on("end", dragEnded)
  }
  export {
    loadPlayerData,
    playerDraw,
  }