export async function getRestaurants(longitude, latitude, radius) {
  // Validate the input values
  if (isNaN(longitude)) {
    throw Error("Please provide a valid value for longitude");
  }
  if (isNaN(latitude)) {
    throw Error("Please provide a valid value for latitude");
  }
  if (isNaN(radius)) {
    throw Error("Please provide a valid value for search radius");
  }
  
  
  const requestUrl = `/api/places?longitude=${longitude}&latitude=${latitude}&radius=${radius}`;

  const response = await fetch(requestUrl);
  const responseMessage = await response.json();

  if (response.status === 200) {
    return responseMessage.results.map((x) => {
      const { name, geometry, rating, vicinity, placeId, photos } = x;
      return {
        id: placeId,
        name,
        location: geometry.location,
        rating,
        address: vicinity,
        photos,
      };
    });
  }

  const errorMessage =
    responseMessage.message ||
    'Failed to find nearby restaurants. Please try again later';

  throw Error(errorMessage);
}
