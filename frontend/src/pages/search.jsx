import {
  Heading,
  Divider,
  Box,
  Grid,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';
import RestaurantList from '../components/restaurant-list';
import SearchForm from '../components/search-form';
import { RestaurantSearchProvider } from '../providers/RestaurantsContext';
import MyMapComponent from '../components/Map';
import GeoLocation from '../components/geolocation';
import HeaderText from '../components/HeaderText';
import { useHistory } from 'react-router';
import { deleteJWT } from '../utils/token';
import { showSuccessMessage } from '../utils/toast';

function SearchPage() {
  const history = useHistory();

  const onLogout = () => {
    deleteJWT();
    showSuccessMessage('Successfully logged out from the application');
    history.push('/login');
  };

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
              <Flex alignItems="center">
                <HeaderText />
                <Spacer />
                <Button onClick={onLogout}>Logout</Button>
              </Flex>
              <Divider mb={3} />
              <Heading as="h2" size="sm" textAlign="center">
                Select a Search Area
              </Heading>
              <GeoLocation />
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
