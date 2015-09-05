import React from 'react';
import {Profile, Semantics} from 'alpinist';
import AddressBar from './AddressBar';
import ResponseView from './ResponseView';
import DocumentationView from './DocumentationView';
import RewriteProfileFetcher from './RewriteProfileFetcher';
import RewriteFetcher from './RewriteFetcher';
import Config from './Config';

class ConsoleApp extends React.Component {
  constructor(props) {
    super(props);
    this.documentFetcher = new RewriteFetcher(Config.profileRewriters);
    this.profileFetcher = new RewriteFetcher(Config.profileRewriters);
    this.currentPath = this.getCurrentPath();
    this.state = {
      documentUrl: this.currentPath + 'github-user.json',
      profileUrl: '',
      response:
`Hi,

This is the ALPS Console - a generic client for ALPS-powered Web APIs.
The user interface consists of three parts: the address bar on the top, this response pane, and the documentation pane.

As the name suggests, the address bar allows you to enter an URL to access the Web API.
The response will then be rendered in the response pane and in the pane to the right you'll find the corresponding documentation.

To get started, enter the URL of the API in the address bar above and click on "Load".
If you wish, you can use the examples below.`,
      documentation: null
    };
  }

  getCurrentPath() {
    if (typeof window === 'undefined') {
      return '/';
    }
    let anchor = window.document.createElement('a');
    anchor.href = './';
    return anchor.href;
  }

  fetchUrl(documentUrl, profileUrl) {
    let headers;
    this.documentFetcher.fetch(documentUrl).then((res) => {
      headers = res.headers;
      return res.text();
    }).then((doc) => {
      var link = headers.get('link'); // TODO: Multiple profiles
      this.setState({
        documentUrl: documentUrl,
        profileUrl: '',
        contentType: headers.get('content-type'),
        link: link,
        response: doc,
        documentation: null
      });
      return link;
    }).then((discoveredProfileUrl) => {
      profileUrl = discoveredProfileUrl || profileUrl;
      if (profileUrl) {
        this.fetchProfileUrl(profileUrl);
      } else {
        console.error('Profile URL not found.');
      }
    }).catch((e) => {
      setTimeout(() => {throw e;});
    });
  }

  fetchProfileUrl(profileUrl) {
    this.profileFetcher.fetch(profileUrl).then((res) => res.text()).then((doc) => {
      this.setState({
        profileUrl: profileUrl,
        documentation: null
      });
      return Profile.parse(doc, profileUrl);
    }).then((profile) => {
      return new Semantics(profile, this.profileFetcher).build();
    }).then((semantics) => {
      semantics.printTree();
      this.setState({
        documentation: semantics
      });
    }).catch((e) => {
      setTimeout(() => {throw e;});
    });
  }

  handleClickExample(event) {
    event.preventDefault();
    const documentUrl = event.currentTarget.href;
    const profileUrl = event.currentTarget.dataset.profile;
    this.setState({documentUrl, profileUrl});
  }

  render() {
    return (
      <div>
        <AddressBar onSubmit={this.fetchUrl.bind(this)} documentUrl={this.state.documentUrl} profileUrl={this.state.profileUrl} />
        <div className="row">
          <div className="col-sm-6">
            <ResponseView doc={this.state.response} contentType={this.state.contentType} link={this.state.link} />
          </div>
          <div className="col-sm-6">
            <DocumentationView semantics={this.state.documentation} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Examples</h4>
            </div>
            <div className="panel-body">
              <a onClick={this.handleClickExample.bind(this)}
                 href={this.currentPath + 'github-user.json'}
                 data-profile={this.currentPath + 'github-user-alps.json'}
                 className="btn btn-default">
                <span className="glyphicon glyphicon-user"></span> GitHub User
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConsoleApp;
