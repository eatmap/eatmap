package cs3300.group4.eatmap.controllers;

import cs3300.group4.eatmap.authentication.LoginForm;
import cs3300.group4.eatmap.security.JwtAuth;
import org.jose4j.lang.JoseException;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    @PostMapping("/api/login")
    public ResponseEntity<JSONObject> requestLogin(@RequestBody LoginForm login) throws Exception {
        try {
            String username = login.getUsername();
            String password = login.getPassword();

            // Make call to dataStore class
            // TODO: Uncomment line below and comment the "successfulLogin" line to use datastore.
//        boolean successfulLogin = Datastore.checkLogin(username, password);
            boolean successfulLogin = true;

            // Create JSON with specific objects.
            JSONObject json = new JSONObject();
            if (successfulLogin) {
                json.put("loggedIn", true);
                json.put("username", username);

                JwtAuth jwtAuth = new JwtAuth();
                String token = jwtAuth.getJwtToken(username);

                json.put("token", token);
                return new ResponseEntity<>(json, HttpStatus.OK);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            JSONObject json = new JSONObject();
            json.put("message", ex.getMessage());
            json.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // If no exception and was not a successful login, the credentials were incorrect
        JSONObject json = new JSONObject();
        json.put("message", "Please provide a valid credentials");
        return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/api/register")
    public JSONObject requestRegister(@RequestParam String username, @RequestParam String password) throws JoseException {
        // Make call to dataStore class
        // TODO: Uncomment line below and comment the "successfulLogin" line to use datastore.
//        boolean successfulRegistration = Datastore.registerNewUser(username, password);
        boolean successfulRegistration = true;

        // Create JSON with specific objects.
        JSONObject json = new JSONObject();
        if (successfulRegistration) {
            json.put("registered", true);
            json.put("loggedIn", true);
            json.put("username", username);

            // Token
            JwtAuth jwtAuth = new JwtAuth();
            String token = jwtAuth.getJwtToken(username);

            json.put("token", token);

        } else {
            json.put("registered", false);
            json.put("loggedIn", false);
        }

        return json;
    }

    @GetMapping("/api/validate")
    public JSONObject validateToken(@RequestParam String token) {

        // Validate token
        JwtAuth jwtAuth = new JwtAuth();
        boolean validToken = jwtAuth.checkValidJwtToken(token);

        // Create json
        JSONObject json = new JSONObject();
        json.put("valid", validToken);
        return json;
    }
}