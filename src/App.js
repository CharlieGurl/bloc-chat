import React, { Component } from 'react';
//import { Route, Link } from 'react-router-dom'; 
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


//<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>
//<script>
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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <h2 className="RoomList">
          Chat Rooms:
        </h2>

        <RoomList 
          firebase = {firebase}
          /> 
    
      </div>
    );
  }
}

export default App;