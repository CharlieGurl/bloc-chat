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

    //assign new text in message input
    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }
   


    render() { 
        return (
            <section className="messagesWrapper">
              <section className="messages">
                {this.state.messages.map( (message) =>
                this.props.activeRoom.key === message.roomId && (
                <div className="message-text"> 
                <div key={message.key}>
                  <div>Chat Room: {this.props.activeRoom.name}</div> 
                  <div>Message: {message.content}</div>
                </div>
                </div>
                ))}
              </section>
           
           <section className="submitMessage">
              <form onSubmit={ (e) => this.handleSubmit(e) }>
               <input type="text" placeholder="Create New Message" value= { this.state.newMessage } onChange={ (e) => this.handleChange (e) } />
               <input type="submit" />
             </form>
            </section>
            </section>
        )
    }
    
}


export default MessageList; 