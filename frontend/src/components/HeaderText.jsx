import { Heading } from '@chakra-ui/react';

const HeaderText = () => {
  return (
    <Heading textAlign="center" my={5}>
      Eat<span style={{ color: 'red' }}>Map</span>
    </Heading>
  );
};

export default HeaderText;
