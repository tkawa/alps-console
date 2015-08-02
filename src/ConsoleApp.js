import React from 'react';
import {Profile, Semantics} from 'alpinist';
import AddressBar from './AddressBar';
import ResponseView from './ResponseView';
import DocumentationView from './DocumentationView';
import RewriteProfileFetcher from './RewriteProfileFetcher';

class ConsoleApp extends React.Component {
  constructor(props) {
    super(props);
    this.fetcher = new RewriteProfileFetcher();
    this.profileFetcher = new RewriteProfileFetcher();
    this.state = {
      currentUrl: 'http://alps.io/schema.org/Person',
      response: (
        <span>
        Hi,<br /><br />
        This is the ALPS Console - a generic client for ALPS-powered Web APIs.<br />
        The user interface consists of three parts: the address bar on the top, this response pane, and the documentation pane.<br /><br />
        As the name suggests, the address bar allows you to enter an URL to access the Web API.<br />
        The response will then be rendered in the response pane and in the pane to the right you'll find the corresponding documentation.<br /><br />
        To get started, enter the URL of the API in the address bar above and click on "Load".<br />
        If you wish, you can use the demo ALPS at <a href="github-user-alps.json">github-user-alps.json</a>.
        </span>
      ),
      documentation: null
    };
  }

  fetchUrl(url) {
    this.fetcher.fetch(url).then((doc) => {
      this.setState({
        currentUrl: url,
        response: doc,
        documentation: null
      });
      return Profile.parse(doc, url);
    }).then((profile) => {
      return new Semantics(profile, this.profileFetcher).build();
    }).then((semantics) => {
      semantics.printTree();
      this.setState({
        currentUrl: url,
        response: this.state.response,
        documentation: semantics
      });
    }).catch((e) => {
      setTimeout(() => {throw e;});
    });
  }

  render() {
    return (
      <div>
        <AddressBar onSubmit={this.fetchUrl.bind(this)} todo={this.state.currentUrl} />
        <div className="row">
          <div className="col-xs-6">
            <ResponseView doc={this.state.response} />
          </div>
          <div className="col-xs-6">
            <DocumentationView semantics={this.state.documentation} />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsoleApp;
