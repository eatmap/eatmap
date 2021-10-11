import { Heading, Box } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';

function LoginPage() {
  return (
    <Box py={5}>
      <HeaderText />
      <Heading as="h3">Login</Heading>
    </Box>
  );
}

export default LoginPage;
