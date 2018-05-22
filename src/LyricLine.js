import React from 'react';
import Color from 'color';

import Colors from './colors.js';

export default class LyricLine extends React.Component {
  constructor(props) {
    super(props);
  }

  darkenByOffset = (color, offset) => {
    const darkeningStep = 1;
    // More darkening inititially, less the further from zero offset we get
    return Color(Colors.prevLine).darken(Math.abs(this.props.offset - 1) * darkeningStep * 1/this.props.offset)
  }

  render() {
    let lineStyle = Object.assign({},
      styles.line,
      this.props.isCurrent && styles.current,
      this.props.offset < 0 && styles.previous,
      this.props.offset > 0 && styles.upcoming,
      this.props.offset < 0 && {
        color: this.darkenByOffset(Colors.prevLine, this.props.offset)
      },
      this.props.offset > 0 && {
        color: this.darkenByOffset(Colors.upcomingLine, this.props.offset)
      },
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
    fontSize: 'calc(16px + 2vw)',
    color: Colors.currentLine
  },
  previous: {
    // color: Colors.prevLine,
    fontSize: 'calc(10px + 0.5vw)'
  },
  upcoming: {
    // color: Colors.upcomingLine,
    fontSize: 'calc(12px + 1vw)'
  }
}
