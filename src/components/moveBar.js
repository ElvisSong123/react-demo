/*
 * @Author: your name
 * @Date: 2020-11-04 11:37:59
 * @LastEditTime: 2020-11-05 11:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react项目练习\my-app\src\components\moveBar.js
 */
import React, { Component } from 'react'

export default class moveBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            top:this.props.top || 0,
            left:this.props.left || 0,
            width:this.props.width || 100,
            height:this.props.height || 100,
            background:this.props.background || 'red',
            speedX:this.props.speedX || 1,
            speedY:this.props.speedY || 2
        }
        this.style = {
            width:this.state.width + 'px',
            height:this.state.height + 'px',
            borderRadius:'50%',
            backgroundColor:this.state.background,
            position:'absolute',
            top:this.state.top + 'px',
            left:this.state.left + 'px',
        }
        this.timer = null;
    }
    move=()=>{ 
        this.setState(()=>{
            return {
                top:this.state.top + this.state.speedY,
                left:this.state.left + this.state.speedX,
            }
        },()=>{
            this.style = {
                width:this.state.width + 'px',
                height:this.state.height + 'px',
                borderRadius:'50%',
                backgroundColor:this.state.background,
                position:'absolute',
                top:this.state.top + 'px',
                left:this.state.left + 'px',
            } 
            if(this.state.top >= document.body.clientHeight - this.state.height){
                this.setState({
                    speedY : -(this.state.speedY),
                    top:document.body.clientHeight - this.state.height
                })
            }
            if(this.state.top <= 0){
                this.setState({
                    speedY : -(this.state.speedY),
                    top:0,
                })
            }
            if(this.state.left >= document.body.clientWidth - this.state.width){
                this.setState({
                    speedX : -(this.state.speedX),
                    left:document.body.clientWidth - this.state.width,
                })
            }
            if(this.state.left <= 0){
                this.setState({
                    speedX : -(this.state.speedX),
                    left:0,
                })
            }
        })
    }
    startMove=()=>{
       this.timer = requestAnimationFrame(()=>{
            this.move();
            if(this.timer) cancelAnimationFrame(this.timer);
            this.startMove();
        })
    }
    componentDidMount() {
        this.startMove();
    }
    
    render() { 
        if(this.timer) cancelAnimationFrame(this.timer);
        return (
            <div className="bar" style={this.style}>
                
            </div>
        )
    }
}
