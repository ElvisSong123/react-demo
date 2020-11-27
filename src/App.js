/*
 * @Author: your name
 * @Date: 2020-10-15 18:55:48
 * @LastEditTime: 2020-11-27 14:15:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \井字棋\my-app\src\App.js
 */
import './App.css'
import global from './global.js'

import React, { Component } from 'react'
class Content extends Component {
  constructor(props) {
    super(props)
    this.boxRef = React.createRef();
    this.state = {
      base: [10, 10],
      contentArr: [],
      piece: 5,
      count: 0,
      position: [],
    }
  }
  boxClick = (position) => {
    this.state.contentArr.push(position)
    this.state.position = [...position]
    this.judgeWin(position)
  }
  judgeWin = (position) => {
    let userArr = this.state.contentArr.filter((ele) => {
      return ele[2] == position[2]
    })
    console.log(userArr)
    if (userArr.length >= 2) {
      let res = this.countNum(position, userArr)
      if (res) {
        setTimeout(()=>{
          window.confirm(`${position[2]}赢了`); 
          this.state.contentArr.forEach((ele)=>{
            if(typeof ele[3] == 'function'){
              ele[3]()
            }
          }) 
        },200)
      }
    }
  }
  countNum = (position, userArr) => {
    let posiX = position[0]
    let posiY = position[1]
    let winState = false
    // 横向判断
    if (!winState) {
      this.state.count = 0
      for (let i = posiY - 1; i >= 0; i--) {
        if (
          userArr.some((ele) => {
            return ele[0] == posiX && ele[1] == i
          })
        ) { 
          this.state.count++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else { 
          break
        }
      }
      for (let i = posiY; i < this.state.base[1]; i++) {
        if (
          userArr.some((ele) => {
            return ele[0] == posiX && ele[1] == i
          })
        ) { 
          this.state.count++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else { 

          break
        }
      }
    }
    // 纵向判断
    if (!winState) {
      this.state.count = 0
      for (let i = posiX - 1; i >= 0; i--) {
        if (
          userArr.some((ele) => {
            return ele[0] == i && ele[1] == posiY
          })
        ) { 
          this.state.count++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else { 
          break
        }
      }
      for (let i = posiX; i < this.state.base[0]; i++) {
        if (
          userArr.some((ele) => {
            return ele[0] == i && ele[1] == posiY
          })
        ) { 
          this.state.count++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else {
          break
        }
      }
    }
    // 斜向1判断
    if (!winState) {
      this.state.count = 0
      let x = position[0]
      let y = position[1]
      while (x >= 0 && y >= 0) {
        if (
          userArr.some((ele) => {
            return ele[0] == x && ele[1] == y
          })
        ) {
          this.state.count++
          x--
          y--
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else {
          break
        }
      }
      x = position[0]
      y = position[1]
      while (x < this.state.base[1] && y < this.state.base[1]) {
        if (
          userArr.some((ele) => {
            return ele[0] == x + 1 && ele[1] == y + 1
          })
        ) {
          this.state.count++
          x++
          y++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else {
          break
        }
      }
    }
    // 斜向2判断
    if (!winState) {
      this.state.count = 0
      let x = position[0]
      let y = position[1]
      while (x >= 0 && y < this.state.base[1]) {
        if (
          userArr.some((ele) => {
            return ele[0] == x && ele[1] == y
          })
        ) {
          this.state.count++
          x--
          y++
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else {
          break
        }
      }
      x = position[0]
      y = position[1]
      while (x < this.state.base[1] && y >= 0) {
        if (
          userArr.some((ele) => {
            return ele[0] == x + 1 && ele[1] == y - 1
          })
        ) {
          this.state.count++
          x++
          y--
          if (this.state.count == this.state.piece) {
            winState = true
            return true
          }
        } else {
          break
        }
      }
    } 
    return winState
  }
  renderBox(index) {
    let boxArr = []
    for (let i = 0; i < this.state.base[1]; i++) {
      boxArr.push(
        <Box
          ref={this.boxRef}
          position={[index, i]}
          key={index + i}
          boxClick={this.boxClick}
        > 
        </Box>

      )
    }
    return boxArr
  }
  render() {
    let rendArr = []
    for (let i = 0; i < this.state.base[0]; i++) {
      rendArr.push(
        <div className="boxWrapper" key={i}>
          {this.renderBox(i)}
        </div>
      )
    }
    return <div ref={this.boxRef}> {rendArr} </div>
  }
}

class Box extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      position: '',
      className:'box'
    }
  }
  repaint() { }
  boxClick = () => {
    if (this.state.position) return
    global.currentUser++
    this.setState(
      {
        position: this.props.position,
        user: global.currentUser % 2 == 0 ? '玩家1' : '玩家2',
      },
      () => { 
        this.repaint()
        this.props.boxClick([...this.props.position, this.state.user,this.clearContent])
      }
    )
  }
  clearContent = () => { 
    this.setState(
      ()=>{
        return {
          position: [],
          user: '',
        }
      }
    ) 
    this.setState(()=>{
        return {
          className:this.state.user == '' ? 'box' : this.state.className
        }
      }) 

  }
  returnClass() {  
    if (this.state.user == '玩家1'){
      this.state.className = 'box red'
    }
    if (this.state.user == '玩家2'){
      this.state.className = 'box blue'
    }
    return '';
  }
  render(){
    console.log('执行了render',['box', this.returnClass()].join(' '));
    // const abc = ['box', this.returnClass()].join(' ');
    return (
      <div
        className={this.state.className}
        onClick={this.boxClick}
      ></div>
    )
  }
}

function App() { 
  return (
    <div className="App">
      <Content> </Content>
    </div>
  )
}

export default App
