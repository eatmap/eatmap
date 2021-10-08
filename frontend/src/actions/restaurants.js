import restaurantsResult from './sample-restauants.json';

export async function getRestaurants(longitude, latitude, radius) {
  // TODO: Make API call to get restaurants
  return new Promise((resolve) => {
    setTimeout(() => {
      const parsed_result = restaurantsResult.results.map((x) => {
        const { name, geometry, rating, vicinity, place_id } = x;
        return {
          id: place_id,
          name,
          location: geometry.location,
          rating,
          address: vicinity,
        };
      });
      resolve(parsed_result);
    }, 3000);
  });
}
