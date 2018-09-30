import React, { Component } from 'react';
import './styles.css'; 

class RoomList extends Component {
    constructor (props) {
      super(props);
     
      this.state = {
        rooms: [],
        newRoom: ''
      };
     
      this.roomsRef = this.props.firebase.database().ref('rooms'); 
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) });
      });
    }

    
    //push new room to database and clear form after submitted
  
    handleSubmit(newRoom) {
      if (!this.state.newRoom) { return }
      this.setState({ rooms: [...this.state.rooms], newRoom: ''}); 
      this.roomsRef.push( {
        name: this.state.newRoom});
    }


    //assigns text typed in field to new room name
    handleChange(e) {
      this.setState({ newRoom: e.target.value });
    }


    render(){
        return (
          <div className="roomsWrapper"> 
            <div className='room-list'>
              {this.state.rooms.map( (room, index) => 
                  <div className="room-names" key={index} onClick={() => this.props.setActiveRoom(room)} >{room.name}
                  </div>)}
            </div>

          <section className="form">
              <form onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newRoom) } }>
                <input type="text" placeholder="Create New Room" value= { this.state.newRoom } onChange={ (e) => this.handleChange (e) } />
                <input type="submit" />
              </form>
            </section>
          </div>
          
        );
      }
  }
  //const Room = (props) => <h4>{props.room.name}</h4>
   

export default RoomList; 