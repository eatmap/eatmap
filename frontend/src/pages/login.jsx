import { Heading, Box } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <Box py={5} display="flex" alignItems="center" flexDir="column">
      <HeaderText />
      <Heading size="lg" as="h2" my={4}>
        Login
      </Heading>
      <LoginForm />
    </Box>
  );
}

export default LoginPage;
