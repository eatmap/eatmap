import { Container, Heading, Divider, Box } from '@chakra-ui/react';
import { useState } from 'react';
import SearchForm from '../components/search-form';

function SearchPage() {
  const [loading, setLoading] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);

  const findRestaurants = (latitude, longitude, radius) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(latitude, longitude, radius);
      // setRestaurants([]);
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
    </Box>
  );
}

export default SearchPage;
