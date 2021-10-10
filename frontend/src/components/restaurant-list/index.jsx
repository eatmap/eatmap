import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Spinner,
  Divider,
  FormControl,
  InputGroup,
  Input,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { RestaurantSearchContext } from '../../providers/RestaurantsContext';
import RestaurantCard from '../restaurant-card';

function RestaurantList() {
  const { restaurants, loading } = useContext(RestaurantSearchContext);

  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    setFilterText('');
  }, [loading, restaurants]);

  const filteredRestaurants =
    filterText && filterText.trim().length > 0
      ? restaurants.filter((x) =>
          x.name.toLowerCase().includes(filterText.toLowerCase()),
        )
      : restaurants;

  const SearchFilter = (
    <FormControl
      mb={5}
      isDisabled={loading}
      bg="white"
      mx="4"
      my="6"
      w="90%"
      rounded="md"
      boxShadow="md"
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Filter restaurants"
          value={filterText}
          onChange={(x) => setFilterText(x.target.value)}
        />
      </InputGroup>
    </FormControl>
  );

  // No restaurant to display
  if (filteredRestaurants.length === 0 || loading) {
    return (
      <Box minH="300px" position="relative">
        {SearchFilter}
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
                <Text fontSize="sm">
                  Try updating the search area or search filter
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box overflowY="scroll" overflowX="hidden" maxH="65vh">
      {SearchFilter}
      {filteredRestaurants.map(({ name, address, id, rating }) => {
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
