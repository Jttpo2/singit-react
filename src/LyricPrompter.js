import React from 'react';
import styled from 'styled-components';

import LyricLine from './LyricLine.js';

export default class LyricPrompter extends React.Component {
  getPreviousLines = () => {
    const currentIndex = this.props.currentLyricIndex;
    const lines = [];

    let i = currentIndex - this.props.noOfPrevLines;
    i = i > 0 ? i : 0;
    for (; i<currentIndex; i++) {
      lines.push(
        <LyricLine
          line={this.props.lyric.lines[i]}
          offset={i - currentIndex}
          key={i}>
        </LyricLine>);
      };
      return lines;
    };

    getCurrentLine = () => {
      const currentIndex = this.props.currentLyricIndex;
      return <LyricLine
        isCurrent={true}
        line={this.props.lyric.lines[currentIndex]}
        offset={0}
        key={currentIndex}>
      </LyricLine>;
    }

    getUpcomingLines = () => {
      const currentIndex = this.props.currentLyricIndex;
      const allLines = this.props.lyric.lines;

      const lines = [];
      let end = currentIndex + this.props.noOfUpcomingLines + 1;
      end = end < allLines.length ? end : allLines.length;
      for (let i=currentIndex + 1; i<end; i++) {
        lines.push(<LyricLine
          line={this.props.lyric.lines[i]}
          offset={i - currentIndex}
          key={i}>
        </LyricLine>);
      }
      return lines;
    }

    render() {
      return (
        <Container>
          <PrevLines>
            {this.getPreviousLines()}
          </PrevLines>
          <CurrentLine>
            {this.getCurrentLine()}
          </CurrentLine>
          <UpcomingLines>
            {this.getUpcomingLines()}
          </UpcomingLines>
        </Container>
      );
    }
  }

  const Container = styled.div`
  flex: .4;
  width: 90%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  `;

  const LineContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  overflow: hidden;
  `;

  const CurrentLine = LineContainer.extend`
    flex: .2;
    justify-content: center;
  `;

  const PrevLines = LineContainer.extend`
  flex: .1 0;
  justify-content: flex-end;
  `;

  const UpcomingLines = LineContainer.extend`
  flex: 0.4;
  justify-content: flex-start;
  `;
