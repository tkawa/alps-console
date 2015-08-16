import React from 'react';
import {Profile, Semantics} from 'alpinist';
import DocumentAddressBar from './DocumentAddressBar';
import ProfileAddressBar from './ProfileAddressBar';
import ResponseView from './ResponseView';
import DocumentationView from './DocumentationView';
import RewriteProfileFetcher from './RewriteProfileFetcher';

class ConsoleApp extends React.Component {
  constructor(props) {
    super(props);
    this.fetcher = new RewriteProfileFetcher();
    this.profileFetcher = new RewriteProfileFetcher();
    this.state = {
      currentDocumentUrl: 'http://example.com/api/foobar.json',
      currentProfileUrl: 'http://alps.io/schema.org/Person',
      response:
`Hi,

This is the ALPS Console - a generic client for ALPS-powered Web APIs.
The user interface consists of three parts: the address bar on the top, this response pane, and the documentation pane.

As the name suggests, the address bar allows you to enter an URL to access the Web API.
The response will then be rendered in the response pane and in the pane to the right you'll find the corresponding documentation.

This is a work in progress so that now this can load an URL of the ALPS profile instead of the Web API.

To get started, enter the URL of the ALPS in the address bar above and click on "Load".
If you wish, you can use the demo ALPS below.

${this.convertAbsoluteUrl('./github-user-alps.json')}
${this.convertAbsoluteUrl('./rubygems-alps.json')}`,
      documentation: null
    };
  }

  convertAbsoluteUrl(path) {
    if (typeof window === 'undefined') {
      return path;
    }
    let anchor = window.document.createElement('a');
    anchor.href = path;
    return anchor.href;
  }

  fetchUrl(url) {
    this.fetcher.fetch(url).then((doc) => {
      this.setState({
        currentProfileUrl: url,
        response: doc,
        documentation: null
      });
      return Profile.parse(doc, url);
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6">
            <DocumentAddressBar onSubmit={this.fetchUrl.bind(this)} url={this.state.currentDocumentUrl} disabled={true} />
            <ResponseView doc={this.state.response} />
          </div>
          <div className="col-xs-6">
            <ProfileAddressBar onSubmit={this.fetchUrl.bind(this)} url={this.state.currentProfileUrl} />
            <DocumentationView semantics={this.state.documentation} />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsoleApp;
