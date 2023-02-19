import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <List>
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    ))}
  </List>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
