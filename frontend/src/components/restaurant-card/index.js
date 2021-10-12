import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Link,
} from '@chakra-ui/react';

import { VscLocation, VscLinkExternal } from 'react-icons/vsc';
import RatingStars from './ratings';
import PhotoDisplay from './photo';

function AddressDisplay({ address }) {
  return (
    <SimpleGrid templateColumns="20px 1fr" fontSize="xl" my="2">
      <VscLocation />
      <Text fontSize="md">{address}</Text>
    </SimpleGrid>
  );
}
function RestaurantCard({ name, address, rating, id, photos }) {
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
      <SimpleGrid templateColumns="3fr 1fr" spacing="5">
        <Box>
          <Heading fontSize="lg">{name}</Heading>
          <Divider my="2" />
          <RatingStars rating={rating} />
          <AddressDisplay address={address} />

          <Link href={googleMapsUrl} isExternal fontSize="sm">
            <Box display="flex" alignItems="center">
              <Text mr="1">View in Google</Text> <VscLinkExternal />
            </Box>
          </Link>
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDir="column"
        >
          <PhotoDisplay photos={photos} name={name} />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  photos: PropTypes.array,
};

export default RestaurantCard;
