import React from 'react';

class ResponseView extends React.Component {
  render() {
    let contentTypeDt = '', contentTypeDd = '';
    if (this.props.contentType) {
      contentTypeDt = <dt>Content-Type:</dt>;
      contentTypeDd = <dd>{this.props.contentType}</dd>;
    }
    let linkDt = '', linkDd = '';
    if (this.props.link) {
      linkDt = <dt>Link:</dt>;
      linkDd = <dd>{this.props.link}</dd>;
    }
    return (
      <div>
        <h4>Response</h4>
        <dl className="dl-horizontal">
          {contentTypeDt}
          {contentTypeDd}
          {linkDt}
          {linkDd}
        </dl>
        <pre>{this.props.doc}</pre>
      </div>
    );
  }
}

export default ResponseView;
