import { Container, Heading, Text, Button, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NoFoundPage() {
  return (
    <Container
      h="100vh"
      textAlign="center"
      display="flex"
      flexDir="column"
      justifyContent="center"
    >
      <Heading size="4xl" letterSpacing={15}>
        404
      </Heading>
      <Text fontSize="3xl">page not found</Text>

      <Divider my="5" />
      <Text fontSize="md" mb="5">
        We’re sorry, the page you have looked for does not exist
      </Text>
      <Link to="/">
        <Button>Go back to home page</Button>
      </Link>
    </Container>
  );
}

export default NoFoundPage;
