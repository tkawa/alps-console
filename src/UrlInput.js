import React from 'react';

class UrlInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <input id={this.props.inputId} type="url" className="form-control url-input" placeholder={this.props.placeholder}
       disabled={this.props.disabled}
       onChange={this.handleChange.bind(this)}
       value={this.state.value} />
    );
  }
}

export default UrlInput;
