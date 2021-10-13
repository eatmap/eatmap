package cs3300.group4.eatmap.authentication;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;

public class Datastore {

    private static final DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

    /**
     * Checks if the user can log in or not depending on its credentials.
     * @param username username of the user trying to log in
     * @param password password of the user trying to log in
     * @return true if it can login, false otherwise
     */
    public static boolean checkLogin(String username, String password) {
        Query query = new Query("User").setFilter(new Query.FilterPredicate("Username", Query.FilterOperator.EQUAL, username));
        PreparedQuery results = ds.prepare(query);

        // Hashed password
        int hashedPassword = (username + password).hashCode();

        // Check for the user
        for (Entity entity : results.asIterable()) {
            if (entity.getProperty("Username").equals(username) && Integer.valueOf(entity.getProperty("Password").toString()) == hashedPassword) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the user can register with its username and password. If the username already exists, it will not
     * be able to log in.
     * @param username username to be registered
     * @param password password of the user trying to register
     * @return true if it was able to register, false otherwise
     */
    public static boolean registerNewUser(String username, String password) {
        //Check if the username already exists in DataStore
        Query query = new Query("User").setFilter(new Query.FilterPredicate("Username", Query.FilterOperator.EQUAL, username));
        PreparedQuery results = ds.prepare(query);

        for (Entity entity : results.asIterable()) {
            if (entity.getProperty("Username").equals(username)) {
                return false;
            }
        }

        // Add the user to DataStore
        Entity userToAdd = new Entity("User");
        userToAdd.setProperty("Username", username);

        int hashedPassword = (username + password).hashCode();
        userToAdd.setProperty("Password", hashedPassword);
        ds.put(userToAdd);

        return true;
    }
}
