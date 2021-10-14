import { Box, Spinner } from '@chakra-ui/react';

function Preloader() {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.500"
      />
    </Box>
  );
}

export default Preloader;
