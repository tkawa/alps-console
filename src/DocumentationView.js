import React from 'react';
import _ from 'lodash';

class DocumentationView extends React.Component {
  getAllDescendantNames(node) {
    const names = [];
    node.forEach((n) => {
      names.push(n.data.name);
    })
    return names;
  }

  // include self
  getAllAncestorNames(node) {
    let nodes = node.ancestors();
    nodes.reverse();
    nodes.push(node);
    return nodes.map((n) => n.data.name);
  }

  getTableRows() {
    const semantics = this.props.semantics;
    if (semantics == null) {
      return <tr><td>ALPS documentation not available.</td></tr>;
    }
    return _.values(semantics.nodes).filter((node) => node.isLeaf()).map((node) => {
      const name = node.data.name;
      const rootNode = node.root();
      const descriptor = node.data.descriptor;
      const rootDescriptor = rootNode.data.descriptor;
      let doc = '';
      if (rootDescriptor.doc != null && rootDescriptor.doc._ != null) {
        doc = rootDescriptor.doc._;
      }
      let descendantItems = this.getAllAncestorNames(node).map((url) => <li>{url}</li>);
      let icon = '';
      switch (descriptor.type) {
        case 'safe':
        case 'idempotent':
        case 'unsafe':
          icon = <span title={descriptor.type} className="glyphicon glyphicon-link text-info"></span>;
          break;
        default:
          icon = <span title={descriptor.type} className="glyphicon glyphicon-file text-info"></span>;
      }

      return (
        <tr>
          <th>
            {icon}
            <span title={name}>{descriptor.id}</span>
          </th>
          <td>
            <p>{doc}</p>
            <ul className="list-unstyled text-muted small">{descendantItems}</ul>
          </td>
        </tr>
      );
    });
  }

  render() {
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
              {this.getTableRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DocumentationView;
