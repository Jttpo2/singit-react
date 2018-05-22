import React from 'react';

import LyricLine from './LyricLine.js';

export default class LyricPrompter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  getTidiedLine = (index) => {
    let line = this.props.lyric.lines[index];
    line = line === '' ? '' : line;
    return line;
  }

  getPreviousLines = () => {
    const noOfLines = this.props.visibleLines;
    const currentIndex = this.props.currentLyricIndex;

    const noOfPreviousLines = (noOfLines - 1) / 2;

    const lines = [];

    let i = currentIndex - noOfPreviousLines;
    i = i > 0 ? i : 0;
    for (; i<currentIndex; i++) {
      lines.push(
        <LyricLine
          line={this.getTidiedLine(i)}
          offset={i - currentIndex}>
        </LyricLine>);
      };
      return lines;
    };

    getCurrentLine = () => {
      const currentIndex = this.props.currentLyricIndex;
      return <LyricLine
        isCurrent={true}
        line={this.getTidiedLine(currentIndex)}>
      </LyricLine>;
    }

    getUpcomingLines = () => {
      const noOfLines = this.props.visibleLines;
      const currentIndex = this.props.currentLyricIndex;
      const allLines = this.props.lyric.lines;

      const noOfUpcomingLines = (noOfLines + 1) / 2;

      const lines = [];

      let end = currentIndex + noOfUpcomingLines;
      end = end < allLines.length ? end : allLines.length;
      for (let i=currentIndex + 1; i<end; i++) {
        lines.push(
          <LyricLine
            line={this.getTidiedLine(i)}
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
        flex: '0.5',
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
        flex: 0.2,

        justifyContent: 'center'
      },
      prevLines: {
        flex: 0.4,

        justifyContent: 'flex-end'
      },
      upcomingLines: {
        flex: 0.4,

        justifyContent: 'flex-start'
      }
    }
