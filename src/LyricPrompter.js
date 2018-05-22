import React from 'react';

class LyricPrompter extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   title: this.props.lyric.title,
    //   artist: this.props.lyric.artist,
    //   lyricLines: this.props.lyric.lines,
    //   currentLyricIndex: this.props.currentLyricIndex
    // }

  }

  render() {
    return (
      <div className='line-container'>
        <div></div>
        <div>{this.props.lyric.lines[this.props.currentLyricIndex]}</div>
        <div></div>
      </div>
    );
  }
}

export default LyricPrompter;
