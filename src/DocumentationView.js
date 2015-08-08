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
      let doc = '';
      if (rootDescriptor.doc) {
        doc = rootDescriptor.doc._ || rootDescriptor.doc; // TODO: Improve parsing into '_'
      }
      let descendantItems = this.getAllAncestorNames(node).map((url) => <li>{url}</li>);
      let rt = '';
      if (descriptor.rt) {
        rt = (
          <div>
            <div className="list-heading">rt:</div>
            <div className="text-muted small">{descriptor.rt}</div>
          </div>
        );
      }

      return (
        <tr>
          <th>
            {icon}
            <span title={name}>{descriptor.id}</span>
          </th>
          <td>
            <div className="doc">
              <p>{doc}</p>
            </div>
            <div>
              <div className="list-heading">Reference:</div>
              <ul className="list-unstyled text-muted small">{descendantItems}</ul>
            </div>
            {rt}
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
