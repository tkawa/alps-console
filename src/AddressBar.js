import React from 'react';
import UrlInput from './UrlInput';

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileEnabled: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profileEnabled: !!nextProps.profileUrl});
  }

  handleSubmit(event) {
    event.preventDefault();
    const documentUrl = this.refs.document.state.value;
    let profileUrl = ''
    if (this.state.profileEnabled) {
      profileUrl = this.refs.profile.state.value;
    }
    this.props.onSubmit(documentUrl, profileUrl);
  }

  handleChangeProfileEnabled(event) {
    const profileEnabled = event.currentTarget.checked;
    this.setState({profileEnabled});
  }

  render() {
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <form id="addressbar" className="navbar-form form-inline" onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="document-url">Document URL:</label>
                <div className="form-group">
                  <div className="input-group">
                    <UrlInput value={this.props.documentUrl} ref="document" inputId="document-url" disabled={this.props.disabled} />
                    <span className="input-group-btn">
                      <button id="load" className="btn btn-primary" type="submit" disabled={this.props.disabled}>
                        <span className="glyphicon glyphicon-refresh icon-white"></span> Load
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="profile-url">Profile URL:</label>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" onChange={this.handleChangeProfileEnabled.bind(this)} checked={this.state.profileEnabled}/> Manual set
                  </label>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <UrlInput value={this.props.profileUrl} ref="profile" inputId="profile-url" disabled={!this.state.profileEnabled}
                     placeholder="http://alps.io/schema.org/Person" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddressBar;
