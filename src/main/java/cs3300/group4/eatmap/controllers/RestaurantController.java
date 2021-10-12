package cs3300.group4.eatmap.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController {
    @GetMapping("/api/places")
    public String getRestaurants(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude, @RequestParam("radius") double radius) {
        String GOOGLE_API_KEY = "AIzaSyCEuHkhMn7uIsw0nyCoktph4_PC7pX_H8k";

        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(GOOGLE_API_KEY)
                .build();
        try {
            // Get the request parameters
            int searchRadius = (int) radius * 1000;
            LatLng location = new LatLng(latitude, longitude);

            // Request Google Places API to get the nearby restaurants
            PlacesSearchResponse response =  PlacesApi.nearbySearchQuery(context,
                    location).radius(searchRadius).type(PlaceType.RESTAURANT).await();

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(response);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new GsonBuilder().create().toJson("Error getting the restaurants");
        } finally {
            // Invoke .shutdown() after your application is done making requests
            context.shutdown();
        }
    }
}
