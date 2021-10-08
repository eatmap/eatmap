import { useContext } from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { RestaurantSearchContext } from '../../providers/RestaurantsContext';
function RestaurantList() {
  const { restaurants, loading } = useContext(RestaurantSearchContext);

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
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    );
  }

  return <h1>Restaurant List Here</h1>;
}

export default RestaurantList;
