package cs3300.group4.eatmap.authentication;

//import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
//import com.google.cloud.datastore.Datastore;
//import com.google.cloud.datastore.DatastoreOptions;
//import com.google.cloud.datastore.Key;
//import org.springframework.data.annotation.Id;
//import com.google.cloud.datastore.Entity;
import com.google.appengine.api.datastore.Entity;
//import com.google.cloud.datastore.Entity;

public class User {

    public static void someMethod(String username, String password) {
//        DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity userEntity = new Entity("User");


        userEntity.setProperty("username", username);
        userEntity.setProperty("password", password);

        datastore.put(userEntity);

//    System.out.printf("Saved %s: %s%n", task.getKey().getName(), task.getString("description"));

        //Retrieve entity
//    Entity retrieved = datastore.get(taskKey);
//
//    System.out.printf("Retrieved %s: %s%n", taskKey.getName(), retrieved.getString("description"));
    }
}
