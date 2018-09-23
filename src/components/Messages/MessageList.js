import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ""
        };
        
        this.messagesRef = this.props.firebase.database().ref('messages');
        
    }  

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val(); 
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) })
        });
    }

    handleSubmit(newMessage) {
        this.messagesRef.push({
            username: this.props.user,
            content: this.state.newMessage,
            roomId: this.props.value,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        }); 
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }
   

    
    render() { 
        return (
            <div className="messagesWrapper">
            <div className="messages">
              <ul className="message-list">
                {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map ( (message, index) => 
                <div key={index}>{message.username}{message.content}{message.sentAt}</div>
                )}
              </ul>
            </div>
           <section className="submitMessage">
              <form onSubmit={ (e) => this.handleSubmit(e) }>
               <input type="text" placeholder="Create New Message" value= { this.state.newMessage } onChange={ (e) => this.handleChange (e) } />
               <input type="submit" />
             </form>
            </section>
            </div>
        )
    }

   
    
}


export default MessageList; 