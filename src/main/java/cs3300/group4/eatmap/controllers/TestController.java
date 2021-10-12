package cs3300.group4.eatmap.controllers;

import cs3300.group4.eatmap.authentication.User;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

@RestController
public class TestController {

    @GetMapping("/api/isup")
    public JSONObject isUp() {
        JSONObject obj = new JSONObject();
        obj.put("running", true);
        System.out.println("Application is running.");
        return obj;
    }

    @PostMapping("/api/login")
    public JSONObject requestLogin(@RequestParam String username, @RequestParam String password) {
        JSONObject obj = new JSONObject();
        obj.put("username", username);
        obj.put("password", password);
        System.out.println("Login request.");
        User.someMethod(username, password);
        return obj;
    }
}
