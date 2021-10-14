// Make API call to find restaurants for provided search inputs
export async function getRestaurants(longitude, latitude, radius, token) {
  // Validate the input values
  if (isNaN(latitude)) {
    throw Error('Please provide a valid value for latitude');
  }
  if (isNaN(longitude)) {
    throw Error('Please provide a valid value for longitude');
  }
  if (isNaN(radius)) {
    throw Error('Please provide a valid value for search radius');
  }

  const requestUrl = `/api/places?longitude=${longitude}&latitude=${latitude}&radius=${radius}&token=${token}`;

  const response = await fetch(requestUrl);
  const responseMessage = await response.json();

  if (response.status === 200) {
    // console.log(responseMessage);
    return responseMessage.results.map((x) => {
      const {
        name,
        geometry,
        rating,
        vicinity,
        formattedAddress,
        placeId,
        photos,
      } = x;

      // Find photo references
      let photoReferences = [];
      try {
        if (photos && Array.isArray(photos)) {
          photoReferences = photos.map((photo) => photo.photoReference);
        }
      } catch (e) {
        console.error(e);
      }

      return {
        id: placeId,
        name,
        location: geometry.location,
        rating,
        address: formattedAddress || vicinity,
        photos: photoReferences,
      };
    });
  }

  const errorMessage =
    responseMessage.message ||
    'Failed to find nearby restaurants. Please try again later';

  throw Error(errorMessage);
}
