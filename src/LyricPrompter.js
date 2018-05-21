import React from 'react';

class LyricPrompter extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='line-container'>
        <div>{this.props.prevLine}</div>
        <div>{this.props.currentLine}</div>
        <div>{this.props.nextLine}</div>
      </div>
    );
  }
}

export default LyricPrompter;
