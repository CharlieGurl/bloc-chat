import React, { Component } from 'react';

class RoomList extends Component {
    constructor (props) {
      super(props);
      this.state = {
        rooms: [],
        newRoom: ' '
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

    handleChange(e) {
      this.setState({newRoom: e.target.value});
    }
    
    handleSubmit() {
      if (!this.state.newRoom) {return}
      this.roomsRef.push({
        name: this.state.newRoom
      });
      this.setState({newRoom: ''}); 
    }

    
    render(){
      let rooms = this.state.rooms
      return (
        <div> 
          {rooms.map(room =>
            <Room key={room.name} room={room} />)}
        <div/>
        <section className="form">
            <form onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newRoomName) } }>
              <input type="text" placeholder="Create New Room" value= { this.state.newRoomName } onChange={ (e) => this.handleChange (e) } />
              <input type="submit" />
            </form>
          </section>
        </div>
        
      )
    }
}
const Room = (props) => <h4>{props.room.name}</h4>
   

export default RoomList; 