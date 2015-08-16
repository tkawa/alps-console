import AddressBar from './AddressBar';

class DocumentAddressBar extends AddressBar {
  constructor(props) {
    super(props);
    this.label = 'Document URL:';
  }
}

export default DocumentAddressBar
