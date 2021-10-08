import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { getRestaurants } from '../../actions/restaurants';
import { RestaurantSearchContext } from '../../providers/RestaurantsContext';

function SearchForm() {
  const {
    longitude,
    latitude,
    radius,
    loading,
    setLatitude,
    setLongitude,
    setRadius,
    setLoading,
    setRestaurants,
  } = useContext(RestaurantSearchContext);

  const onClick = () => {
    setLoading(true);
    setRestaurants([]);
    getRestaurants(longitude, latitude, radius)
      .then((restaurants) => setRestaurants(restaurants))
      .finally(() => setLoading(false));
  };

  return (
    <Box>
      <Flex flexDirection={['column', null, 'row']}>
        <FormControl
          id="latitude"
          maxW={['auto', null, 150]}
          margin="auto"
          mb={5}
          isDisabled={loading}
        >
          <FormLabel>Latitude</FormLabel>
          <Input
            type="number"
            value={latitude}
            onChange={(x) => setLatitude(x.target.value)}
          />
        </FormControl>

        <Spacer />

        <FormControl
          id="longitude"
          maxW={['auto', null, 150]}
          margin="auto"
          mb={5}
          isDisabled={loading}
        >
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            value={longitude}
            onChange={(x) => setLongitude(x.target.value)}
          />
        </FormControl>

        <Spacer />

        <FormControl
          id="radius"
          maxW={['auto', null, 150]}
          margin="auto"
          mb={5}
          isDisabled={loading}
        >
          <FormLabel>Search radius</FormLabel>
          <InputGroup>
            <Input
              type="number"
              value={radius}
              onChange={(x) => setRadius(x.target.value)}
            />
            <InputRightAddon children="km" />
          </InputGroup>
        </FormControl>
      </Flex>

      <Button size="lg" isFullWidth isLoading={loading} onClick={onClick}>
        Find Restaurants
      </Button>
    </Box>
  );
}

export default SearchForm;
