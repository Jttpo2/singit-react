import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';
import Radium from 'radium';

import Colors from './colors.js';
import Song from './Song.js';
import LyricPrompter from './LyricPrompter.js';
import testLyric from './testlyric3.js';
import Search from './Search.js';
import PasteLoader from './PasteLoader.js';

const PORT = 4001;
// const IP = '192.168.1.62';
// const IP = '10.0.1.3';
const IP = '192.168.10.115';

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: `http://${IP}:${PORT}`,
      lyric: testLyric,
      currentLyricIndex: 0,
      // visibleLines: 5
      noOfPrevLines: 0,
      noOfUpcomingLines: 3
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
      // Don't allow too much overflow
      if (index > this.state.lyric.lines.length || index < 0) return;

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

  loadSong = (song) => {
    this.setState({
        lyric: song,
        currentLyricIndex: 0
    });
  };

  loadFromForm = (text) => {
    this.loadSong(
      new Song(
        'Pasted by user',
        'unknown',
        this._convertToLyric(text)
      ));
  };

  _convertToLyric(stringLiteral) {
    return stringLiteral.split('\n');
  }

  render() {
    return (
      <div style={styles.container}>

        {/* <Search onResultSelected={this.loadSong}></Search> */}
        {/* <PasteLoader onLoadFunc={this.loadFromForm}/> */}

        <LyricPrompter
          lyric={this.state.lyric}
          currentLyricIndex={this.state.currentLyricIndex}
          noOfPrevLines={this.state.noOfPrevLines}
          noOfUpcomingLines={this.state.noOfUpcomingLines}
          style={styles.lyricPrompter}>
        </LyricPrompter>
        <div style={styles.buttonContainer}>
          <button
            onClick={() => this.prevButtonClicked()}
            style={styles.button}
            key='prevButton'>
            Previous line
          </button>
          <button
            onClick={() => this.nextButtonClicked()}
            style={styles.button}
            key='nextButton'>
            Next line
          </button>
        </div>
      </div>
    );
  }
}

export default Radium(App);

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    background: Colors.background
  },
  buttonContainer: {
    position: 'absolute',
    // flex: 0.5,
    height: '30vh',
    width: '100%',
    bottom: 0,

    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start'
  },
  button: {
    // maxWidth: '100px',
    flex: 0.5,
    background: '#f2f2f2',
    border: 'none',

    ':focus': {
      outline: 'none'
    }
  }
};
