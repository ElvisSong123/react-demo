/*
 * @Author: your name
 * @Date: 2020-10-15 18:55:48
 * @LastEditTime: 2020-11-04 15:45:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \井字棋\my-app\src\App.js
 */ 

import React, { Component } from 'react'
import MoveBar from './components/moveBar'

function createBar(arr){ 
  console.log(arr);
  return arr.map((ele)=>{
    let math = (Math.random() + 0.5).toFixed(2) ;
    let colora = Math.random() * 256;
    let colorb = Math.random() * 256;
    let colorc = Math.random() * 256;
    let opacity = Math.random() * 0.7 + 0.1;
    let top = Math.random() * 600;
    let left = Math.random() * 1200;
    let speedX = Math.random() + 0.5;
    let speedY = Math.random() + 0.5;
    return {
      background:`rgba(${colora},${colorb},${colorc},${opacity})`,
      width:math * 100,
      height:math * 100,
      top:top,
      left:left,
      speedX:speedX,
      speedY:speedY
    }
  })
}
function App() { 
  let arr = new Array(10).fill(1);
  let newArr = createBar(arr);
  console.log(newArr);
  return (
    <div className="App">
      {
        newArr.map((item,index)=>{
          return <MoveBar key={index} {...item}></MoveBar>
        })
      }
      
    </div>
  )
}

export default App
