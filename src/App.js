import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';

import LyricPrompter from './LyricPrompter.js';
import testLyric from './testlyric.js';

const PORT = 4001;
// const IP = '192.168.1.62';
const IP = '10.0.1.3';

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: `http://${IP}:${PORT}`,
      lyric: testLyric,
      currentLyricIndex: 0
    }
  }

  componentDidMount() {
    const socket = socketIoClient(this.state.endpoint);

    socket.on('lyric', (song) => {
      this.setState({
        lyric: song
      });
    });

    socket.on('lyric-index', (index) => {
      this.setState({
        currentLyricIndex: index
      });
    });

    this.setState({
      socket: socket
    });
  }

  send = (header, content) => {
    if (!this.state.socket) {
      alert('No socket.');
      return;
    }
    this.state.socket.emit(header, content);
  };

  testConnection = () => {
    let message = 'Testing connection';
    this.send('message', message);
  };

  nextButtonClicked = () => {
    this.send('lyric-index', this.state.currentLyricIndex + 1);
  };

  prevButtonClicked = () => {
    this.send('lyric-index', this.state.currentLyricIndex -1);
  };

  render() {
    return (
      <div className='App'>
        <button onClick={() => this.prevButtonClicked()}>Previous line</button>
        <button onClick={() => this.nextButtonClicked()}>Next line</button>

        <LyricPrompter
          lyric={this.state.lyric}
          currentLyricIndex={this.state.currentLyricIndex}
          visibleLines={5}>
        </LyricPrompter>
      </div>
    );
  }
}

export default App;
