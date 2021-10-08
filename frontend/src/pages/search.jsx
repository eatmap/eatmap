import { Container, Heading, Divider, Box, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import RestaurantMap from '../components/restaurant-map';
import RestaurantList from '../components/restaurant-list';
import SearchForm from '../components/search-form';

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const findRestaurants = (latitude, longitude, radius) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(latitude, longitude, radius);
      setRestaurants([]);
    }, 3000);
  };

  return (
    <Box>
      <Container>
        <Heading textAlign="center" my={5}>
          Eat<span style={{ color: 'red' }}>Map</span>
        </Heading>
        <Divider my={5} />
        <SearchForm onSubmit={findRestaurants} loading={loading} />
      </Container>
      <Divider mt={5} />
      <SimpleGrid columns={[1, null, 2]}>
				<RestaurantList />
        <RestaurantMap restaurants={restaurants} />
      </SimpleGrid>
    </Box>
  );
}

export default SearchPage;
