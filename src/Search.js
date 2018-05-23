import React from 'react';

import SearchResult from './SearchResult.js';
import Database from './database.js';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.db = new Database();

    this.state = {
      searchTerm: '',
      results: [],
      submitted: false
    };

    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {

  }

  componentWillUpdate() {

  }

  onSearchClicked(event) {
    this.db.search(this.state.searchTerm, this.onResultReceived);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onResultReceived = (results) => {
    this.setState({
      results: results
    });
  };

  onResultSelected = (id) => (event) => {
    this.db.get(id, (song) => {
      console.log(`Song selected in search: ${song}`);
      this.props.onResultSelected(song);
    });
  };

  render() {
    const resultComponents = [];
    this.state.results.forEach((result, index) => {
      resultComponents.push(
          <SearchResult
            song={result}
            key={result.id}
            onClick={this.onResultSelected(result.id)}/>
        );
    });

    return (
      <div style={styles.container}>
        <form onSubmit={this.onSearchClicked}>
          <input type='text' value={this.state.searchTerm} onChange={this.handleChange}/>
          <input type='submit' value='Search' />
        </form>
        <div >
          {resultComponents}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 0.5,
    color: 'white'
  }
}
