import React from 'react';

import Colors from './colors.js';

export default class LyricLine extends React.Component {
  render() {
    let lineStyle = Object.assign({},
      styles.line,
      this.props.isCurrent && styles.current,
      this.props.offset < 0 && styles.previous,
      this.props.offset > 0 && styles.upcoming,
    );

    return(
      <div style={lineStyle}>
        {/* '\u00A0' is unicode for '$nbsp;', to make div have size when empty */}
        {this.props.line !== '' ? this.props.line : '\u00A0'}
      </div>
    );
  }
}

const styles ={
  line: {
    fontFamily: 'arial',
    // background: 'blue'
  },
  current: {
    fontWeight: 'bold',
    color: Colors.currentLine
  },
  previous: {
    color: Colors.prevLine
  },
  upcoming: {
    color: Colors.upcomingLine
  }
}
