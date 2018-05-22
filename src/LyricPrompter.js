import React from 'react';

import LyricLine from './LyricLine.js';

export default class LyricPrompter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // getTidiedLine = (index) => {
  //   let line = this.props.lyric.lines[index];
  //   // line = line === '' ? '' : line;
  //   return line;
  // }

  getPreviousLines = () => {
    const currentIndex = this.props.currentLyricIndex;
    const lines = [];

    let i = currentIndex - this.props.noOfPrevLines;
    i = i > 0 ? i : 0;
    for (; i<currentIndex; i++) {
      lines.push(
        <LyricLine
          line={this.props.lyric.lines[i]}
          offset={i - currentIndex}>
        </LyricLine>);
      };
      return lines;
    };

    getCurrentLine = () => {
      const currentIndex = this.props.currentLyricIndex;
      return <LyricLine
        isCurrent={true}
        line={this.props.lyric.lines[currentIndex]}
        offset={0}>
      </LyricLine>;
    }

    getUpcomingLines = () => {
      const currentIndex = this.props.currentLyricIndex;
      const allLines = this.props.lyric.lines;

      const lines = [];
      let end = currentIndex + this.props.noOfUpcomingLines + 1;
      end = end < allLines.length ? end : allLines.length;
      for (let i=currentIndex + 1; i<end; i++) {
        lines.push(
          <LyricLine
            line={this.props.lyric.lines[i]}
            offset={i - currentIndex}>
          </LyricLine>);
        }
        return lines;
      }

      render() {
        const prevLinesStyle = Object.assign({},
          styles.lineContainer,
          styles.prevLines
        );

        const currentLineStyle = Object.assign({},
          styles.lineContainer,
          styles.currentLine
        );

        const upcomingLinesStyle = Object.assign({},
          styles.lineContainer,
          styles.upcomingLines
        );

        return (
          <div style={styles.container}>
            <div style={prevLinesStyle}>
              {this.getPreviousLines()}
            </div>
            <div style={currentLineStyle}>
              {this.getCurrentLine()}
            </div>
            <div style={upcomingLinesStyle}>
              {this.getUpcomingLines()}
            </div>
          </div>
        );
      }
    }

    const styles = {
      container: {
        flex: '0.4',
        width: '90%',

        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
        // margin: '2vmax',
        // background: 'green'
      },
      lineContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center'
      },
      currentLine: {
        flex: 0.5,

        justifyContent: 'center'
      },
      prevLines: {
        flex: 0.1,

        justifyContent: 'flex-end'
      },
      upcomingLines: {
        flex: 0.4,

        justifyContent: 'flex-start'
      }
    }
