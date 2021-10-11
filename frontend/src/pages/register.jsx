import { Heading, Box } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';
import RegisterForm from '../components/RegisterForm';

function LoginPage() {
  return (
    <Box py={5} display="flex" alignItems="center" flexDir="column">
      <HeaderText />
      <Heading size="lg" as="h2" my={4}>
        Register
      </Heading>
      <RegisterForm />
    </Box>
  );
}

export default LoginPage;
