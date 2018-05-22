import React from 'react';

class LyricPrompter extends React.Component {
  constructor(props) {
    super(props);


  }

  getTidiedLine = (index) => {
    let line = this.props.lyric.lines[index];
    line = line === '' ? ' ' : line;
    return line;
  }

  getLinesToDisplay = () => {
    const noOfLines = this.props.visibleLines;
    const currentIndex = this.props.currentLyricIndex;
    const allLines = this.props.lyric.lines;

    const noOfPreviousLines = (noOfLines - 1) / 2;
    const noOfUpcomingLines = (noOfLines + 1) / 2;

    const lines = [];

    // Prev noOfPreviousLines
    let i = currentIndex - noOfPreviousLines;
    i = i > 0 ? i : 0;
    for (; i<currentIndex; i++) {

      lines.push(<div>{this.getTidiedLine(i)}</div>);
    }

    // Current line
    lines.push(<div><strong>{this.getTidiedLine(currentIndex)}</strong></div>);

    // Upcoming lines
    let end = currentIndex + noOfUpcomingLines;
    end = end < allLines.length ? end : allLines.length;
    for (let i=currentIndex + 1; i<end; i++) {
      lines.push(<div>{this.getTidiedLine(i)}</div>);
    }

    return lines;
  }


  render() {
    const lines = [];

    return (
      <div className='line-container'>
        {/* <div>{this.props.lyric.lines[this.props.currentLyricIndex]}</div> */}
        {this.getLinesToDisplay()}
      </div>
    );
  }
}

export default LyricPrompter;
