import { Container, Heading, Divider, Box, SimpleGrid } from '@chakra-ui/react';
import RestaurantMap from '../components/restaurant-map';
import RestaurantList from '../components/restaurant-list';
import SearchForm from '../components/search-form';
import { RestaurantSearchProvider } from '../providers/RestaurantsContext';

function SearchPage() {
  return (
    <RestaurantSearchProvider
      defaultLatitude={33.7756}
      defaultLongitude={84.3963}
      defaultRadius={5}
    >
      <Box>
        <Container>
          <Heading textAlign="center" my={5}>
            Eat<span style={{ color: 'red' }}>Map</span>
          </Heading>
          <Divider my={5} />
          <SearchForm />
        </Container>
        <Divider mt={5} />
        <SimpleGrid columns={[1, null, 2]}>
          <RestaurantList />
          <RestaurantMap restaurants={[]} />
        </SimpleGrid>
      </Box>
    </RestaurantSearchProvider>
  );
}

export default SearchPage;
