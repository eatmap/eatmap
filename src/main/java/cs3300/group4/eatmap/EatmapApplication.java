package cs3300.group4.eatmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {
        DataSourceAutoConfiguration.class
})
public class EatmapApplication {

    public static void main(String[] args) {
        SpringApplication.run(EatmapApplication.class, args);
    }

}
