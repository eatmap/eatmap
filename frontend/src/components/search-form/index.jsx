import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
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
    // TODO: Validate user input
    setLoading(true);
    getRestaurants(longitude, latitude, radius)
      .then((restaurants) => setRestaurants(restaurants))
      .finally(() => setLoading(false));
  };

  return (
    <Box>
      <Flex flexDirection={['column', null, 'row']} justify="end">
        <FormControl
          id="latitude"
          maxW={['auto', null, 225]}
          margin="auto"
          mb={5}
          isDisabled={loading}
        >
          <FormLabel textAlign="center">Latitude</FormLabel>
          <Input
            type="number"
            value={latitude}
            onChange={(x) => setLatitude(x.target.value)}
          />
        </FormControl>

        <Spacer />

        <FormControl
          id="longitude"
          maxW={['auto', null, 225]}
          margin="auto"
          mb={5}
          isDisabled={loading}
        >
          <FormLabel textAlign="center">Longitude</FormLabel>
          <Input
            type="number"
            value={longitude}
            onChange={(x) => setLongitude(x.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl
        id="radius"
        maxW={['auto', null, 225]}
        margin="auto"
        mb={5}
        isDisabled={loading}
      >
        <FormLabel textAlign="center">Search radius (in km)</FormLabel>
        <Input
          type="number"
          value={radius}
          onChange={(x) => setRadius(x.target.value)}
        />
      </FormControl>

      <Button size="lg" isFullWidth isLoading={loading} onClick={onClick}>
        Find Places
      </Button>
    </Box>
  );
}

export default SearchForm;
