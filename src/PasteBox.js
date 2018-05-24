import React from 'react';
import PropTypes from 'prop-types';

export default class PasteBox extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="form-group">
        <label className="form-label">{this.props.title}</label>
        <textarea
          className="form-input"
          style={this.props.resize  ? null : {resize: 'none'}}
          rows={this.props.rows}
          value={this.props.content}
          onChange={this.props.controlFunc}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

PasteBox.proptTypes = {
  title: PropTypes.string,
  resize: PropTypes.bool,
  rows: PropTypes.number,
  content: PropTypes.string,
  placeholder: PropTypes.string,
  controlFunc: PropTypes.func.isRequired
};
