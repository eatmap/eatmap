package cs3300.group4.eatmap.controllers;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.InvalidRequestException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import cs3300.group4.eatmap.security.JwtAuth;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RestaurantController {
    @GetMapping("/api/places")
    public ResponseEntity<Map<String, Object>> getRestaurants(@RequestParam("longitude") double longitude,
                                                              @RequestParam("latitude") double latitude,
                                                              @RequestParam("radius") double radius,
                                                              @RequestParam("token") String token
    ) {
        Map<String, Object> response = new HashMap<>();

        // Authenticate request
        try {
            JwtAuth auth = new JwtAuth();
            if (!auth.checkValidJwtToken(token)) {
                throw new Exception("The provided token is invalid/expired. Please authenticate.");
            }
        } catch (Exception ex) {
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.UNAUTHORIZED.toString());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String GOOGLE_API_KEY = "AIzaSyCEuHkhMn7uIsw0nyCoktph4_PC7pX_H8k";

        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(GOOGLE_API_KEY)
                .build();
        try {
            // Get the request parameters
            int searchRadius = (int) (radius * 1000);
            LatLng location = new LatLng(latitude, longitude);

            // Request Google Places API to get the nearby restaurants
            PlacesSearchResponse apiResponse = PlacesApi.nearbySearchQuery(context,
                    location).radius(searchRadius).type(PlaceType.RESTAURANT).await();

            response.put("results", apiResponse.results);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (InvalidRequestException ex) {
            System.out.println(ex.getMessage());
            response.put("message", "The API request was malformed");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            // Invoke .shutdown() after your application is done making requests
            context.shutdown();
        }
    }
}
