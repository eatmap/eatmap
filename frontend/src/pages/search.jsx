import { Text, Heading, Divider, Box, Grid } from '@chakra-ui/react';
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
        <Grid templateColumns={{ base: '1fr', lg: '650px 1fr' }}>
          <Box px={5}>
            <Heading textAlign="center" my={5}>
              Eat<span style={{ color: 'red' }}>Map</span>
            </Heading>
            <Heading as="h2" size="sm" textAlign="center">
              Select a Search Area
            </Heading>
            <Divider my={3} />

            <SearchForm />

            <Divider mt={5} />

            <RestaurantList />
          </Box>
          <MyMapComponent />
        </Grid>
      </Box>
    </RestaurantSearchProvider>
  );
}

export default SearchPage;
