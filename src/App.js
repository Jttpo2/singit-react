import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';
import styled from 'styled-components';
import { Route, Link, withRouter } from 'react-router-dom';

import Colors from './colors.js';
import Song from './Song.js';
import StyledMenu from './StyledMenu.js';
import MainView from './MainView.js';
import Search from './Search.js';
import PasteLoader from './PasteLoader.js';
import testLyric from './testlyric3.js';

const DEV_MODE = false;

const PORT = 4001;
// const PORT = 5000; // Heroku default port?
// const IP = '192.168.1.62';
// const IP = '10.0.1.3';
// const IP = '192.168.10.115';
const LOCAL_IP = 'localhost';
const HEROKU_URL = 'singit.herokuapp.com';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // endpoint: `http://${IP}:${PORT}`,
      // endpoint: 'https://singit.herokuapp.com',
      endpoint: DEV_MODE ? `http://${LOCAL_IP}:${PORT}` : `https://${HEROKU_URL}`,
      lyric: testLyric,
      currentLyricIndex: 0,
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

  nextLine = () => {
    this.send('lyric-index', this.state.currentLyricIndex + 1);
  };

  prevLine = () => {
    this.send('lyric-index', this.state.currentLyricIndex -1);
  };

  loadSong = (song) => {
    this.setState({
      lyric: song,
      currentLyricIndex: 0
    });
    this.goHome();
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

  goHome = () => {
    this.props.history.push('/');
  }

  render() {
    const menu = (
      <StyledMenu>
        <nav>
          <menu>
            <li>
              <Link to="/paste" className='menu-item'>Paste</Link>
            </li>
            <li>
              <Link to="/search" className='menu-item'>Search</Link>
            </li>
          </menu>
        </nav>
      </StyledMenu>
    );

    return (
      <OuterContainer>
        {menu}
        <Container>
          <Route exact path='/'
          render={
            (props) =>
            <MainView
              {...props}
              handleNext={this.nextLine}
              handlePrev={this.prevLine}
              lyric={this.state.lyric}
              currentLyricIndex={this.state.currentLyricIndex}
              noOfPrevLines={this.state.noOfPrevLines}
              noOfUpcomingLines={this.state.noOfUpcomingLines}/>
            }
          />
          <Route path='/paste'
          render={
            (props) => <PasteLoader {...props} onLoadFunc={this.loadFromForm}/>
          }/>
          <Route path='/search'
          render={
            (props) => <Search onResultSelected={this.loadSong} />
          } />
        </Container>
      </OuterContainer>
    );
  }
}

export default withRouter(App);

const OuterContainer = styled.div`
height: 100%;
background: ${Colors.background};
`;

const Container = styled.div`
height: 100%;

display: flex;
justify-content: center;
`;
