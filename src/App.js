import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';

import Lyric from './Lyric.js';
import LyricPrompter from './LyricPrompter.js';
import testLyric from './testlyric.js';

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

  getCurrentLine = () => {
    return 'Current line';
  };

  getPreviousLine = () => {
    return 'Previous line';
  };

  getNextLine = () => {
    return 'Next line';
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
        <Lyric text={testLyric}></Lyric>

        <button onClick={() => this.send()}>Send message</button>

        <LyricPrompter
          prevLine={this.getPreviousLine()}
          currentLine={this.getCurrentLine()}
          nextLine={this.getNextLine()}>
          </LyricPrompter>
      </div>
    );
  }
}

export default App;
