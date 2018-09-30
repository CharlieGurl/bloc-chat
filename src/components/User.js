import React, { Component } from 'react'; 


class User extends Component {
    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }


    handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ); 
    }

    handleSignOut() {
      this.props.firebase.auth().signOut(); 
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }


    render() {
        return (
            <section className="User-Auth">
              <button id="signInButton" onClick={this.handleSignIn}>Sign In</button>
              <button id ="signOutButton" onClick={this.handleSignOut}>Sign Out</button>
              <p>Current user: {this.props.user ? this.props.user.displayName: "Guest"} </p> 
            </section> 
        )
    }
}

export default User; 
