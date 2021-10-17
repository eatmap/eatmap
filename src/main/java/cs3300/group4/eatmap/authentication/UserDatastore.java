package cs3300.group4.eatmap.authentication;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import cs3300.group4.eatmap.security.Hash;


public class UserDatastore {

    public static final String KIND = "User";
    private static final Datastore datastore = DatastoreFactory.getDatastore();
    private static final KeyFactory keyFactory = datastore.newKeyFactory().setKind(KIND);

    /**
     * Checks if the user can log in or not depending on its credentials.
     *
     * @param username username of the user trying to log in
     * @param password password of the user trying to log in
     * @return true if it can login, false otherwise
     */
    public static boolean checkLogin(String username, String password) {
        Entity existingUser = getExistingUser(username);
        if (existingUser == null) {
            return false;
        }

//        String gotPassword = Hash.generateHash(password);
        String checkPassword = existingUser.getString("password");
        return Hash.isMatchingHash(checkPassword, password);

//        return Objects.equals(existingUser.getString("password"), gotPassword);
    }

    public static Entity getExistingUser(String username) {
        Key key = keyFactory.newKey(username);
        return datastore.get(key);
    }

    /**
     * Register a new user
     *
     * @param username username to be registered
     * @param password password of the user trying to register
     * @return true if it was able to register, false otherwise
     */
    public static boolean registerNewUser(String username, String password) {

        String passwordHash = Hash.generateHash(password);

        Key key = keyFactory.newKey(username);
        Entity entity = Entity.newBuilder(key)
                .set("username", username)
                .set("password", passwordHash)
                .build();

        Entity newUser = datastore.put(entity);
        return newUser != null;
    }
}
