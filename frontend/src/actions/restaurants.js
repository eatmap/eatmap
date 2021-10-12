export async function getRestaurants(longitude, latitude, radius) {
  // TODO: Make API call to get restaurants

  const requestUrl = `/api/places?longitude=${longitude}&latitude=${latitude}&radius=${radius}`;

  return await fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.results.map((x) => {
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
    });
}
