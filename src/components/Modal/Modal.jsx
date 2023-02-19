import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.body.style = 'overflow-y: hidden';
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    document.body.style = 'overflow-y: auto';
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <ModalBackdrop onClick={this.onOverlayClick}>
        <ModalContent>{children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}
