import React from 'react';
import PropTypes from 'prop-types';

import PasteBox from './PasteBox.js';

export default class PasteLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleClearForm() {
    this.setState({content: ''});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onLoadFunc(this.state.content);
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h5>Paste text</h5>
        <PasteBox
          rows={20}
          content={this.state.content}
          controlFunc={this.handleContentChange}
        />
        <button
          onClick={this.handleClearForm}>Clear</button>
        <input
          type="submit"
          value="Load"
        />
        </form>
      );
    }
  }

  PasteLoader.propTypes = {
    onLoadFunc: PropTypes.func.isRequired
  };
