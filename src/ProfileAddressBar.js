import AddressBar from './AddressBar';

class ProfileAddressBar extends AddressBar {
  constructor(props) {
    super(props);
    this.label = 'Profile URL:';
  }
}

export default ProfileAddressBar
