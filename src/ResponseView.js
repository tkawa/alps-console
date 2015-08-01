import React from 'react';

class ResponseView extends React.Component {
  render() {
    return (
      <div>
        <h4>Response</h4>
        <pre>{this.props.doc}</pre>
      </div>
    );
  }  
}

export default ResponseView;
