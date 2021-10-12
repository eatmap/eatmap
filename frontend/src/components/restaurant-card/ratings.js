import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import { VscStarFull, VscStarHalf } from 'react-icons/vsc';

function RatingStars({ rating }) {
  const hasHalfStar = Math.round(rating) === Math.floor(rating) + 1;

  const stars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<VscStarFull color="gold" key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<VscStarHalf color="gold" key="half" />);
  }

  while (stars.length !== 5) {
    stars.push(<VscStarFull color="gray" key={stars.length} />);
  }

  return (
    <Box display="flex" alignItems="center" fontSize="lg" my="2">
      <Text mr="2" fontSize="sm">
        {rating}
      </Text>{' '}
      {stars}
    </Box>
  );
}

RatingStars.protoTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStars;
