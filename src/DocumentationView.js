import React from 'react';
import _ from 'lodash';

class DocumentationView extends React.Component {
  render() {
    const semantics = this.props.semantics;
    var trs = <tr><td>ALPS documentation not available.</td></tr>
    if (semantics != null) {
      trs = _.values(semantics.nodes).filter((node) => node.isRoot()).map((node) => {
        const name = node.data.name;
        const descriptor = node.data.descriptor;
        let doc = '';
        if (descriptor.doc != null && descriptor.doc._ != null) {
          doc = descriptor.doc._;
        }
        return (
          <tr>
            <th title={name}>{descriptor.id}</th>
            <td>{doc}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h4>Documentation</h4>
        <div className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" data-trigger="hover"></a>
          <ul className="dropdown-menu">
          </ul>
        </div>
        <div className="details">
          <table className="table table-hover">
            <tbody>
              {trs}
            </tbody>
          </table>
        </div>
      </div>
    );
  }  
}

export default DocumentationView;
