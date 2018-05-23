import React from 'react';

import SearchResult from './SearchResult.js';
import Database from './database.js';

// let submitted = false;

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.db = new Database();

    this.state = {
      searchTerm: '',
      results: null,
      submitted: false
    };

    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(`Prev: ${this.state.submitted} Next: ${nextState.submitted}`);
  //   // return !this.state.submitted;
  //   let update = !(this.state.submitted || nextState.submitted);
  //   console.log(`Update: ${update}`);
  //   return update;
  //   // return false;
  //   // return true;
  // }

  onSearchClicked(event) {
    // console.log(`Submitted: ${submitted}`);
    if (this.state.submitted) return;
    this.db.search(this.state.searchTerm, this.onResultReceived);
    this.setState({submitted: true});
    // submitted = true;
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
    event.preventDefault();
  }

  onResultReceived = (results) => {
    this.setState({
      results: results
    });
  }

  render() {
    // const resultComponents = [];
    // // this.state.results.forEach((result) => {
    // for (let result in this.state.results) {
    //   console.log(result);
    //   resultComponents.push(
    //     <SearchResult song={result} />
    //   );
    //   // }, this);
    // }

    return (
      <div style={styles.container}>
        <form onSubmit={this.onSearchClicked}>
          <input type='text' value={this.state.searchTerm} onChange={this.handleChange}/>
          <input type='submit' value='Search' />
        </form>
        {/* <div >
          {resultComponents}
        </div> */}

        <SearchResult song={this.state.results}></SearchResult>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    color: 'white'
  }
}
