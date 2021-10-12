package cs3300.group4.eatmap.controllers;

import cs3300.group4.eatmap.authentication.Datastore;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

@RestController
public class ApiController {

    @GetMapping("/api/isup")
    public JSONObject isUp() {
        JSONObject obj = new JSONObject();
        obj.put("running", true);
        System.out.println("Application is running.");
        return obj;
    }

    @PostMapping("/api/login")
    public JSONObject requestLogin(@RequestParam String username, @RequestParam String password) {
        // Make call to dataStore class
        boolean successfulLogin = Datastore.checkLogin(username, password);

        // Create JSON with specific objects.
        JSONObject json = new JSONObject();
        if (successfulLogin) {
            json.put("loggedIn", true);
            json.put("username", username);
        } else {
            json.put("loggedIn", false);
        }

        return json;
    }

    @PutMapping("/api/register")
    public JSONObject requestRegister(@RequestParam String username, @RequestParam String password) {

        // Make call to dataStore class
        boolean successfulRegistration = Datastore.registerNewUser(username, password);

        // Create JSON with specific objects.
        JSONObject json = new JSONObject();
        if (successfulRegistration) {
            json.put("registered", true);
            json.put("loggedIn", true);
            json.put("username", username);
        } else {
            json.put("registered", false);
            json.put("loggedIn", false);
        }

        return json;
    }

    @GetMapping("/api/isAuthenticated")
    public void isUserAuthenticated() {
        //TODO: Change return to a JSON object.
        //TODO: If the user is authenticated return a JSON with {authenticated: true} else with false.
    }
}
