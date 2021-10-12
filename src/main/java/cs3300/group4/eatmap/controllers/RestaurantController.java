package cs3300.group4.eatmap.controllers;

import com.google.maps.GeoApiContext;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PlacesApi;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController {

    @GetMapping("/api/places")
    public String getRestaurants(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude, @RequestParam("radius") int radius) {
        GeoApiContext context = new GeoApiContext.Builder()
        .apiKey("AIzaSyCEuHkhMn7uIsw0nyCoktph4_PC7pX_H8k")
        .build();
        LatLng location = new LatLng((double) latitude, (double) longitude);
        PlacesSearchResponse response =  PlacesApi.nearbySearchQuery(context,
        location).radius(radius * 1000).await();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(response.results);

        // Invoke .shutdown() after your application is done making requests
        context.shutdown();
    }
}
