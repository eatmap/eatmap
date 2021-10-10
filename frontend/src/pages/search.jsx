import { Heading, Divider, Box, Grid } from '@chakra-ui/react';
import RestaurantList from '../components/restaurant-list';
import SearchForm from '../components/search-form';
import { RestaurantSearchProvider } from '../providers/RestaurantsContext';
import MyMapComponent from '../components/Map';
import GeoLocation from '../components/geolocation';

function SearchPage() {
  return (
    <RestaurantSearchProvider
      defaultLatitude={33.772163578}
      defaultLongitude={-84.390165106}
      defaultRadius={2}
    >
      <Box>
        <Grid templateColumns={{ base: '1fr', lg: '650px 1fr' }}>
          <Box>
            <Box px={5}>
              <Heading textAlign="center" my={5}>
                Eat<span style={{ color: 'red' }}>Map</span>
              </Heading>
              <Heading as="h2" size="sm" textAlign="center">
                Select a Search Area
              </Heading>
              <GeoLocation />
              <Divider my={3} />

              <SearchForm />

              <Divider mt={5} />
            </Box>
            <Box bg="gray.50">
              <RestaurantList />
            </Box>
          </Box>
          <MyMapComponent />
        </Grid>
      </Box>
    </RestaurantSearchProvider>
  );
}

export default SearchPage;
