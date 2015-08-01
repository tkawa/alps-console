import React from 'react';

class UrlInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <input id="url" type="url" className="form-control" placeholder="http://" style={{width: '500px'}}
       onChange={this.handleChange.bind(this)}
       value={this.state.value} />
    );
  }  
}

export default UrlInput;
