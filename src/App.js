import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';
// import Radium from 'radium';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';

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

  showSettings(e) {
    e.preventDefault();
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
      // const menu = <StyledMenu>
      //   <a id="paste-loader" className="menu-item" href="/paste">Copy-paste</a>
      // </StyledMenu>;

      const menu = <Menu styles={styles}>
        {/* <a id="paste-loader" className="menu-item" href="/paste">Copy-paste</a> */}
        <div>test</div>
      </Menu>;

      return (
        // <div style={styles.container}>
          <div>
          {menu}

          {/* <Search onResultSelected={this.loadSong}></Search> */}
          {/* <PasteLoader onLoadFunc={this.loadFromForm}/> */}

          {/* <LyricPrompter
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
    </div> */}
  </div>
);
}
}

// export default Radium(App);
export default App;

// const styles = {
//   container: {
//     // height: '100%',
//     // display: 'flex',
//     // flexFlow: 'column',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//
//     background: Colors.background
//   },
//   buttonContainer: {
//     position: 'absolute',
//     // flex: 0.5,
//     height: '30vh',
//     width: '100%',
//     bottom: 0,
//
//     display: 'flex',
//     flexFlow: 'row',
//     justifyContent: 'flex-start'
//   },
//   button: {
//     // maxWidth: '100px',
//     flex: 0.5,
//     background: Colors.ctrlButtonBackground,
//     border: 'none',
//
//     ':focus': {
//       outline: 'none'
//     }
//   },
//   // menu: {
//   //   bmBurgerButton: {
//   //     position: 'fixed',
//   //     width: '36px',
//   //     height: '30px',
//   //     left: '36px',
//   //     top: '36px'
//   //   },
//   //   bmBurgerBars: {
//   //     background: '#373a47'
//   //   }
//   //
//   // }
// };

const StyledMenu = styled(Menu)`
/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/* General sidebar styles */
.bm-menu {
  ${'' /* background: #373a47; */}
  background: green;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
`;

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: 'green',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(100, 0, 0, 0.4)'
  }
}
