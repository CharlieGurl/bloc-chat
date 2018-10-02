import React, { Component } from 'react';



class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ""
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        
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
            username: this.props.user ? this.props.user.displayName: "Guest",
            content: this.state.newMessage,
            roomId: this.props.activeRoom.key,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            
        }); 
        this.setState ({newMessage: ""}); 
    }

    //assign new text in message input
    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }
   


    render() { 
        return (
            <section className="messagesWrapper">
            <p>Chat Room: {this.props.activeRoom.name}</p> 
              <section className='messages'>
               {this.state.messages.map( (message, index) => this.props.activeRoom.key === message.roomId && (
                <div className="message-text" key={index}>
                <div key={message.key}>
                  <div>Message: {message.content}</div>
                  <div>User: {message.username} </div>
                </div>

                </div>

                ))}
              </section>

               <section className="submitMessage">
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                  <input className="text" 
                  placeholder="Create New Message" value= { this.state.newMessage } onChange={ (e) => this.handleChange (e) } 
                  style={{height:40, width: '20%'}}
                  />
                  <input type="submit" />
                </form>
               </section>
            </section>
        )
    }
}

export default MessageList; 


