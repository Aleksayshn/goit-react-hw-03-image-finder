import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <Item>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </Item>
    );
  }
}
