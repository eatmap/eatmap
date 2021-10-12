export async function getRestaurants(longitude, latitude, radius) {
  // TODO: Make API call to get restaurants
  return new Promise((resolve) => {
    setTimeout(() => {
      // From Google Places API example
      // var axios = require('axios');

      // var config = {
      //   method: 'get',
      //   url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + '%2C' + longitude + '&radius=' + (radius * 1000) + '&type=restaurant&key=AIzaSyCEuHkhMn7uIsw0nyCoktph4_PC7pX_H8k',
      //   headers: {}
      // };

      // axios(config)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      //   const parsed_result = response.data.results.map((x) => {
      //     const { name, geometry, rating, vicinity, place_id } = x;
      //     return {
      //       id: place_id,
      //       name,
      //       location: geometry.location,
      //       rating,
      //       address: vicinity,
      //     };
      //   });
      //   resolve(parsed_result);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      var input = {
        longitude: longitude,
        latitude: latitude,
        radius: radius
      }

      $.ajax({
        type: "POST",
        url: "/api/places",
        data: input,
        success: function (response) {
          console.log(JSON.stringify(response.data));
          const parsed_result = response.data.results.map((x) => {
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
        },
        error: function (response) {
          console.log(error);
        }
    });

    }, 3000);
  });
}
