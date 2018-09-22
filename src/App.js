import React, { Component } from 'react';
//import { Route, Link } from 'react-router-dom'; 
import './App.css';
import * as firebase from "firebase";
import 'firebase/database'; 
import RoomList from './components/Rooms/RoomList';
import MessageList from './components/Messages/MessageList';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCPMhXbW1vUf0rGt4PKDcZhxyIYmYY3Egs",
    authDomain: "bloc-chat-8944c.firebaseapp.com",
    databaseURL: "https://bloc-chat-8944c.firebaseio.com",
    projectId: "bloc-chat-8944c",
    storageBucket: "bloc-chat-8944c.appspot.com",
    messagingSenderId: "189317626549"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
      this.activeRoom = this.activeRoom.bind(this);
    
      this.state = {
      activeRoom: '',
      roomMessages: ''
    };
  }
  

  activeRoom(room) {
    this.setState({activeRoom: room.key}); 
    console.log(this.state.activeRoom);
  }

  


  render() {
    return (
      <div className="roomsWrapper">
        <div className="roomsHeader">
          <div className="heading">Bloc Chat</div>
        </div>
        <div className="roomBody">
           <RoomList firebase = {firebase} action = {this.activeRoom} />
           <MessageList firebase = {firebase} value = {this.state.activeRoom.key} /> 
        </div>
      </div>
    );
  }
}

export default App;
