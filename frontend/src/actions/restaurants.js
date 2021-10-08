export async function getRestaurants(longitude, latitude, radius) {
  console.log(latitude, longitude, radius);
  // TODO: Make API call to get restaurants
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 3000);
  });
}
