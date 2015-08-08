import React from 'react';
import UrlInput from './UrlInput';

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.todo};
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = this.refs.url.state.value;
    this.props.onSubmit(url);
  }

  render() {
    const todo = this.props.todo;
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <form id="addressbar" className="navbar-form form-inline" onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="url">Enter an URL:</label>
              <div className="form-group">
                <div className="input-group">
                  <UrlInput value={todo} ref="url" />
                  <span className="input-group-btn">
                    <button id="load" className="btn btn-primary" type="submit" data-loading-text="Loading...">
                      <span className="glyphicon glyphicon-refresh icon-white"></span> Load
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressBar;
