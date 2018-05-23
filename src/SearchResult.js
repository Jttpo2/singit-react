import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.title}>
          {this.props.song ? this.props.song.title : null}
        </div>
        <div style={styles.artist}>
          {this.props.song ? this.props.song.artist : null}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: 'calc(4px + 0.25vmax)',
    marginBottom: 'calc(6px + 0.25vmax)'
  },
  title: {
    fontSize: 'calc(16px + 0.25vw)',
    fontWeight: 'bold',
    marginBottom: 'calc(4px + 0.25vmax'
  },
  artist: {
    fontSize: 'calc(12px + 0.25vw)'
  }
}
