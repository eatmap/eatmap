import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Link,
} from '@chakra-ui/react';

import {
  VscStarFull,
  VscStarHalf,
  VscLocation,
  VscLinkExternal,
} from 'react-icons/vsc';

function RatingStars({ rating }) {
  const hasHalfStar = Math.round(rating) === Math.floor(rating) + 1;

  const stars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<VscStarFull color="gold" />);
  }

  if (hasHalfStar) {
    stars.push(<VscStarHalf color="gold" />);
  }

  while (stars.length !== 5) {
    stars.push(<VscStarFull color="gray" />);
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

function AddressDisplay({ address }) {
  return (
    <SimpleGrid templateColumns="20px 1fr" fontSize="xl" my="2">
      <VscLocation />
      <Text fontSize="md">{address}</Text>
    </SimpleGrid>
  );
}

function RestaurantCard({ name, address, rating, id }) {
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${id}`;
  return (
    <Box
      boxShadow="md"
      my="6"
      mx="4"
      p="5"
      rounded="md"
      bg="white"
      _hover={{ boxShadow: 'lg' }}
    >
      <Heading fontSize="lg">{name}</Heading>
      <Divider my="2" />
      <RatingStars rating={rating} />
      <AddressDisplay address={address} />

      <Link
        href={googleMapsUrl}
        isExternal
        display="flex"
        alignItems="center"
        fontSize="sm"
      >
        <Text mr="1">View in Google</Text> <VscLinkExternal />
      </Link>
    </Box>
  );
}

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RestaurantCard;
