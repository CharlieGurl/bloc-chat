import React, { Component } from 'react'; 

class User extends Component {
    constructor(props){
        super(props);
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
              <button classname="sign-in" value="sign-in" onClick={() => this.handleSignIn() }>Sign In</button>
              <button classname="sign-out" value="sign-out" onClick={() => this.handleSignOut() }>Sign Out</button>
              <div>Current user: {this.props.user ? this.props.user.displayName: "Guest"} </div> 
            </section> 
        )
    }
}

export default User; 