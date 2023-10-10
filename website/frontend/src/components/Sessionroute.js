import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default class Sessionroute extends Component{
    constructor(props){
        super(props);
        this.state=({roomCode: null});  
    };

    async componentDidMount() {
        fetch("/api/user-room")
        .then((response) => response.json())
        .then((data) => {
          this.setState({roomCode: data.rm_code});
        });
    }

    render(){return this.state.roomCode ? <Navigate to={`/rooms/${this.state.roomCode}`} /> : <Outlet /> ;};
}