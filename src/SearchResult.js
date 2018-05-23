import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    return (
      <div>
        <h4>
          {this.props.song ? this.props.song.title : null}
        </h4>
        <h6>
          {this.props.song ? this.props.song.artist : null}
        </h6>
      </div>
    );
  }
}
