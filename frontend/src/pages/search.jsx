import { Container, Heading, Divider, Box, SimpleGrid } from '@chakra-ui/react';
import RestaurantList from '../components/restaurant-list';
import SearchForm from '../components/search-form';
import { RestaurantSearchProvider } from '../providers/RestaurantsContext';
import MyMapComponent from '../components/Map';

function SearchPage() {
  return (
    <RestaurantSearchProvider
      defaultLatitude={33.74899}
      defaultLongitude={-84.38798}
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
          <MyMapComponent />
        </SimpleGrid>
      </Box>
    </RestaurantSearchProvider>
  );
}

export default SearchPage;
