package cs3300.group4.eatmap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/isup")
    public String isUp() {
        return "Application is running";
    }
}
