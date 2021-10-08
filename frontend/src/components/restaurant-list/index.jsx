import { useContext } from 'react';
import { Box, Flex, Text, Spinner, Divider } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { RestaurantSearchContext } from '../../providers/RestaurantsContext';
import RestaurantCard from '../restaurant-card';

function RestaurantList() {
  const { restaurants, loading } = useContext(RestaurantSearchContext);

  // No restaurant to display
  if (restaurants.length === 0 || loading) {
    return (
      <Box minH="300px" position="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
          transform="translate(-50%, 50%)"
        >
          <Flex flexDir="column" alignItems="center">
            {loading ? (
              <Box>
                <Spinner size="xl" />
                <Text fontSize="2xl">Loading</Text>
              </Box>
            ) : (
              <Box>
                <InfoOutlineIcon textAlign="center" w={8} h={8} />
                <Text fontSize="2xl">No Restaurants Found</Text>
                <Divider />
                <Text fontSize="sm">Try updating the search area</Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box overflowY="scroll" overflowX="hidden" maxH="65vh">
      {restaurants.map(({ name, address, id, rating }) => {
        return (
          <RestaurantCard
            name={name}
            address={address}
            rating={rating}
            key={id}
            id={id}
          />
        );
      })}
    </Box>
  );
}

export default RestaurantList;
