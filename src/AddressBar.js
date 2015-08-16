import React from 'react';
import UrlInput from './UrlInput';

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: props.url };
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = this.refs.input.state.value;
    this.props.onSubmit(url);
  }

  render() {
    const label = this.label || 'URL:';
    const url = this.props.url;
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <form id="addressbar" className="navbar-form form-inline" onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="url">{label}</label>
              <div className="form-group">
                <div className="input-group">
                  <UrlInput value={url} ref="input" disabled={this.props.disabled} />
                  <span className="input-group-btn">
                    <button id="load" className="btn btn-primary" type="submit" disabled={this.props.disabled}>
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
