import React, { Component } from 'react';
//import { Route, Link } from 'react-router-dom'; 
import * as firebase from "firebase";
import 'firebase/database'; 
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './components/styles.css';



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
    super(props)
      this.state = {
      activeRoom: '',
      roomMessages: '',
      user: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }
  

  setActiveRoom(room) {
    this.setState({ 
      activeRoom: room 
    }); 
  }

  setUser(user) {
    if(user) {
      this.setState({ user: user });
    } else {
      this.setState ({ user: null });
    }
  }

  setMessage(message) {
    this.setState({ currentMessage: message })
  }

  render() {
    return (
      <div className="roomsWrapper">
        <div className="roomsHeader">
          <div className="heading">Bloc Chat</div>
        </div>
        <div className="roomBody">
           <RoomList 
             firebase = {firebase} 
             setActiveRoom = {(activeRoom) => this.setActiveRoom (activeRoom)} />
           <MessageList 
             firebase = {firebase} 
             activeRoom = {this.state.activeRoom} 
             user = {this.state.user} 
             setMessage={this.setMessage}/>

           <User 
             firebase = {firebase}
             setUser = {(user) => this.setUser(user)}
             user = {this.state.user}
             /> 

        </div>
      </div>
    );
  }
}

export default App;