import PropTypes from 'prop-types';
import { Image } from '@chakra-ui/react';

const PUBLIC_GOOGLE_API_KEY = 'AIzaSyCEuHkhMn7uIsw0nyCoktph4_PC7pX_H8k';

function PhotoDisplay({ name, photos }) {
  const MAX_HEIGHT = 150;
  let photoSrc = `https://via.placeholder.com/${MAX_HEIGHT}`;

  try {
    if (photos.length > 0) {
      const photoReference = photos[0];
      const BASE_URL = 'https://maps.googleapis.com/maps/api/place/photo';
      photoSrc = `${BASE_URL}?photo_reference=${photoReference}&maxheight=${MAX_HEIGHT}&key=${PUBLIC_GOOGLE_API_KEY}`;
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <Image
      alt={name}
      src={photoSrc}
      objectFit="cover"
      borderRadius="md"
      fallbackSrc={`https://via.placeholder.com/${MAX_HEIGHT}`}
      height={MAX_HEIGHT}
    />
  );
}

PhotoDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(String),
};

export default PhotoDisplay;
