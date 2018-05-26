import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';
import styled from 'styled-components';

import Colors from './colors.js';
import Song from './Song.js';
import StyledMenu from './StyledMenu.js';
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
    this.loadSong(new Song(
      'Pasted by user',
      'unknown',
      this._convertToLyric(text)
    ));
  };

  _convertToLyric(stringLiteral) {
    return stringLiteral.split('\n');
  }

  render() {
    const menu = (
      <StyledMenu>
        <a id="paste-loader" className="menu-item" href="/paste">Copy-paste</a>
      </StyledMenu>
    );

    return (
      <OuterContainer>
        {menu}
        <Container>

          {/* <Search onResultSelected={this.loadSong}></Search> */}
          {/* <PasteLoader onLoadFunc={this.loadFromForm}/> */}

          <LyricPrompter
            lyric={this.state.lyric}
            currentLyricIndex={this.state.currentLyricIndex}
            noOfPrevLines={this.state.noOfPrevLines}
            noOfUpcomingLines={this.state.noOfUpcomingLines}>
          </LyricPrompter>
          <ControlButtonContainer>
            <PrevButton
              onClick={() => this.prevButtonClicked()}
              key='prevButton'>
              Previous line
            </PrevButton>
            <NextButton
              onClick={() => this.nextButtonClicked()}
              key='nextButton'>
              Next line
            </NextButton>
          </ControlButtonContainer>
        </Container>
      </OuterContainer>
    );
  }
}

export default App;

const OuterContainer = styled.div`
height: 100%;
`;

const Container = styled.div`
height: 100%;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;

background: ${Colors.background};
`;

const ControlButtonContainer = styled.div`
position: absolute;
width: 100%;
height: 35%;
bottom: 0;
z-index: 1;

display: flex;
flex-flow: column;
`;

const ControlButton = styled.button`
background: ${Colors.ctrlButtonBackground};
${'' /* color: ${Colors.ctrlButttonLabel}; */}
border: none;

:focus {
  outline: none
}

display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
`;

const PrevButton = ControlButton.extend`
flex: 0.3;
${'' /* background: green; */}
font-size: calc(8px + 1vh);
color: ${Colors.prevButtonLabel};

justify-content: flex-end;
padding-bottom: 16px;
`;

const NextButton = ControlButton.extend`
flex: 0.7;
${'' /* background: blue; */}
font-size: calc(18px + 1vh);
font-weight: bold;
color: ${Colors.nextButtonLabel}
`;
