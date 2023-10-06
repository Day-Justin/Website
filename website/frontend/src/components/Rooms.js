import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

class Rooms extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        const { roomCode } = this.props.params;
        this.roomCode = roomCode;
        this.getRoom();
    }
    
    getRoom(){
        fetch('/api/get-room?code=' + this.roomCode
        ).then((response) => response.json()
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    render(){
        return(
            <div>
                <h3>
                    Room: {this.roomCode}
                </h3>
                <p>
                    Votes: {this.state.votesToSkip.toString()}
                </p>
                <p>
                    Guest: {this.state.guestCanPause.toString()}
                </p>
                <p>
                    Host: {this.state.isHost.toString()}
                </p>
            </div>
        );
    }
}

export default (props) => (
    <Rooms
        {...props}
        params={useParams()}
    />
);