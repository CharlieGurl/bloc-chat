import React, { Component } from 'react';

class RoomList extends Component {
    constructor (props) {
      super(props);
      this.state = {
        rooms: []
      };
      this.roomsRef = this.props.firebase.database().ref('rooms'); 
    }
   
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
              console.log(this.state.rooms);
        }); 
    }
    
    render(){
      let rooms = this.state.rooms
      return (
        <div> 
          {rooms.map(room =>
            <Room key={room.name} room={room} />)}
         </div> 
      )
    }
}
const Room = (props) => <h4>{props.room.name}</h4>
   

export default RoomList; 