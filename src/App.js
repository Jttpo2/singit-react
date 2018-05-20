import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';

const PORT = 4001;

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: 'http://192.168.1.62:' + PORT,
      lyric: '[nufink]'
    }
  }

  componentDidMount() {
    const socket = socketIoClient(this.state.endpoint);

    socket.on('message', (msg) => {
      this.setState({
        lyric: msg
      });
    })

    this.setState({
      socket: socket
    });
  }

  send = () => {
    let message = 'Testing connection';
    if (!this.state.socket) {
      alert('No socket.');
      return;
    }
    this.state.socket.emit('message', message);
  };

  render() {
    return (
      <div className='App'>
        <div className='lyric'>
          {this.state.lyric}
        </div>
        <button onClick={() => this.send()}>Send message</button>
      </div>
    );
  }
}

export default App;
