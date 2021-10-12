package cs3300.group4.eatmap.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

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
            PlacesSearchResponse response = PlacesApi.nearbySearchQuery(context,
                    location).radius(searchRadius).type(PlaceType.RESTAURANT).await();

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(response);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", ex.getMessage());
            errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new GsonBuilder().create().toJson(new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR));
        } finally {
            // Invoke .shutdown() after your application is done making requests
            context.shutdown();
        }
    }

    // Exception handler when the required request parameters are missing
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Map<String, String>> handleMissingParams(MissingServletRequestParameterException ex) {
        Map<String, String> errorResponse = new HashMap<>();

        String errorMessage = String.format("Please provide a valid value for %s", ex.getParameterName());
        errorResponse.put("message", errorMessage);
        errorResponse.put("status", HttpStatus.BAD_REQUEST.toString());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Exception handler when the request parameters are not valid
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, String>> handleTypeMismatchException(MethodArgumentTypeMismatchException e) {
        Map<String, String> errorResponse = new HashMap<>();

        String errorMessage = String.format("Please provide a valid value for %s", e.getName());
        errorResponse.put("message", errorMessage);
        errorResponse.put("status", HttpStatus.BAD_REQUEST.toString());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Generic exception handler for requests
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleDefaultException(
            Exception e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", e.getLocalizedMessage());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
