import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default class Sessionroute extends Component{
    constructor(props){
        super(props);
        this.state=({roomCode: null});  
        this.clearRoomCode = this.clearRoomCode.bind(this);
    };

    async componentDidMount() {
        fetch("/musicApi/user-room")
        .then((response) => response.json())
        .then((data) => {
          this.setState({roomCode: data.rm_code});
        });
    }
    
    clearRoomCode(){
        this.setState({
            roomCode: null
        })
    }

    render(){
        return this.state.roomCode ? 
            <Navigate replace to={`/rooms/${this.state.roomCode}`}  /> 
            : <Outlet /> ;
    };
}