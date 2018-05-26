import React from 'react';
// import Color from 'color';
import styled from 'styled-components';

import Colors from './colors.js';
import Helper from './Helper.js';

export default class LyricLine extends React.Component {


  render() {
    // let lineStyle = Object.assign({},
    //   styles.line,
    //   this.props.isCurrent && styles.current,
    //   this.props.offset < 0 && styles.previous,
    //   this.props.offset > 0 && styles.upcoming,
    //   this.props.offset < 0 && {
    //     color: this.darkenByOffset(Colors.prevLine, this.props.offset)
    //   },
    //   this.props.offset > 0 && {
    //     color: this.darkenByOffset(Colors.upcomingLine, this.props.offset)
    //   },
    // );

    return(
      // <div style={lineStyle}>
      <Line {...this.props}>
        {/* '\u00A0' is unicode for '$nbsp;', to make div have size when empty */}
        {this.props.line !== '' ? this.props.line : '\u00A0'}
      </Line>
      // </div>

    );
  }
}

const Line = styled.div`
fontFamily: arial;
fontWeight: ${props => props.isCurrent ? 'bold' : 'none'};
font-size: ${props => {
  // return 'calc(10px + 0.5vw)';
  if (props.offset < 0) return 'calc(10px + 0.5vw)';
  if (props.offset === 0) return 'calc(16px + 2vw)';
  if (props.offset > 0) return 'calc(12px + 1vw)';
}
};
color: ${props => {
  // return Colors.currentLine;
  if (props.offset < 0) return Helper.darkenByOffset(Colors.prevLine, props.offset);
  if (props.offset === 0) return Colors.currentLine;
  if (props.offset > 0) return Helper.darkenByOffset(Colors.upcomingLine, props.offset);
}
}

}
`;



// const styles ={
//   line: {
//     fontFamily: 'arial',
//     // background: 'blue'
//   },
//   current: {
//     fontWeight: 'bold',
//     fontSize: 'calc(16px + 2vw)',
//     color: Colors.currentLine
//   },
//   previous: {
//     fontSize: 'calc(10px + 0.5vw)'
//   },
//   upcoming: {
//     fontSize: 'calc(12px + 1vw)'
//   }
// }
