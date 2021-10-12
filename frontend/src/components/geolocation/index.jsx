import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { RestaurantSearchContext } from '../../providers/RestaurantsContext';
import { BiCurrentLocation } from 'react-icons/bi';
import { showErrorMessage } from '../../utils/toast';

function GeoLocation() {
  const { setLatitude, setLongitude } = useContext(RestaurantSearchContext);

  const setCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.log(error);
          showErrorMessage(
            error.message ||
              'Error finding the current location. Please try again later',
          );
        },
      );
    } else {
      showErrorMessage('Location access must be enabled to use this feature');
    }
  };

  return (
    <Button
      size="sm"
      mx="auto"
      my="2"
      display="block"
      onClick={setCurrentLocation}
      leftIcon={<BiCurrentLocation fontSize={14} />}
    >
      Get my current location
    </Button>
  );
}

export default GeoLocation;
