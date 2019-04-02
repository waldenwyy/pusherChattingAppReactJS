import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import './App.css';
import { tokenUrl, instanceLocator } from './config'
class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messages:[]
        }
    }
    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: 'Walden',
            tokenProvider: new TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            currentUser.subscribeToRoomMultipart({
                roomId: '31198680',
                messageLimit: 20,
                hooks: {
                    onMessage: message => {
                        console.log('message.text: ', message.parts[0].payload.content);
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        })
    }
    render() {
        console.log(this.state.messages);
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App