package cs3300.group4.eatmap.controllers;

import com.google.cloud.datastore.Entity;
import cs3300.group4.eatmap.authentication.UserDatastore;
import cs3300.group4.eatmap.authentication.User;
import cs3300.group4.eatmap.security.JwtAuth;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    @PostMapping("/api/login")
    public ResponseEntity<JSONObject> requestLogin(@RequestBody User login) {
        try {
            String username = login.getUsername();
            String password = login.getPassword();

            // Make call to dataStore class
            boolean successfulLogin = UserDatastore.checkLogin(username, password);
            // boolean successfulLogin = true; // USE FOR TESTING LOCALLY

            // Create JSON with specific objects.
            if (successfulLogin) {
                JSONObject json = new JSONObject();
                json.put("loggedIn", true);
                json.put("username", username);

                JwtAuth jwtAuth = new JwtAuth();
                String token = jwtAuth.getJwtToken(username);

                json.put("token", token);
                return new ResponseEntity<>(json, HttpStatus.OK);
            } else {
                JSONObject json = new JSONObject();
                json.put("message", "Please provide a valid credentials");
                return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            JSONObject json = new JSONObject();
            json.put("message", ex.getMessage());
            json.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/register")
    public ResponseEntity<JSONObject> requestRegister(@RequestBody User credentials) {
        try {
            // Determine if the provided credentials are valid
            try {
                credentials.validateCredentials();
            } catch (Exception ex) {
                // If no exception and was not a successful login, the credentials were incorrect
                JSONObject json = new JSONObject();
                json.put("message", ex.getMessage());
                return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
            }

            String username = credentials.getUsername();
            String password = credentials.getPassword();

            Entity existingUser = UserDatastore.getExistingUser(username);
            if (existingUser != null) {
                JSONObject json = new JSONObject();
                json.put("message", "Provided username already exists");
                return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
            }

            // Make call to dataStore class
            boolean successfulRegistration = UserDatastore.registerNewUser(username, password);
            // boolean successfulRegistration = true; // USE FOR TESTING

            // Create JSON with specific objects.

            if (successfulRegistration) {
                JSONObject json = new JSONObject();
                json.put("registered", true);
                return new ResponseEntity<>(json, HttpStatus.OK);
            }

            throw new Exception("Failed to register the new user");
        } catch (Exception ex) {
            JSONObject json = new JSONObject();
            json.put("message", ex.getMessage());
            json.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/validate")
    public ResponseEntity<JSONObject> validateToken(@RequestParam String token) {
        if (token.trim().length() == 0) {
            // No token was provided
            JSONObject json = new JSONObject();
            json.put("message", "Please provide a token");
            return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
        }

        try {
            // Validate token
            JwtAuth jwtAuth = new JwtAuth();
            boolean validToken = jwtAuth.checkValidJwtToken(token);

            JSONObject json = new JSONObject();
            json.put("valid", validToken);
            return new ResponseEntity<>(json, HttpStatus.OK);
        } catch (Exception ex) {
            JSONObject json = new JSONObject();
            json.put("message", ex.getMessage());
            return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}