import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function SearchForm({ loading, onSubmit }) {
  const [latitude, setLatitude] = useState(33.7756);
  const [longitude, setLongitude] = useState(84.3963);
  const [radius, setRadius] = useState(5);

  const findPlaces = () => {
    // TODO: Validate user input
    onSubmit(latitude, longitude, radius);
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

      <Button size="lg" isFullWidth isLoading={loading} onClick={findPlaces}>
        Find Places
      </Button>
    </Box>
  );
}

SearchForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default SearchForm;
