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
        {this.props.line}
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
