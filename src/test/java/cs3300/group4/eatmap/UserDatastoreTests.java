package cs3300.group4.eatmap;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import cs3300.group4.eatmap.authentication.DatastoreFactory;
import cs3300.group4.eatmap.authentication.UserDatastore;
import cs3300.group4.eatmap.security.Hash;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserDatastoreTests {
    /**
     * Helper method to create new user
     *
     * @param username Username of the user
     * @param password Password of the user
     */
    private void createUserEntity(String username, String password) {
        Datastore ds = DatastoreFactory.getDatastore();
        Key key = ds.newKeyFactory().setKind(UserDatastore.KIND).newKey(username);
        Entity entity = Entity.newBuilder(key)
                .set("username", username)
                .set("password", Hash.generateHash(password))
                .build();
        ds.put(entity);
    }

    /**
     * Helper method to find the user entity
     *
     * @param username Username of the user
     * @return Entity for the provided username
     */
    private Entity getUserEntity(String username) {
        Datastore ds = DatastoreFactory.getDatastore();
        return ds.get(ds.newKeyFactory().setKind(UserDatastore.KIND).newKey(username));
    }

    /**
     * Check if the credentials match what is in dataStore, and should then return true.
     */
    @Test
    public void testCheckSuccessfulLogin() {
        String username = "LoginUser";
        String password = "LoginUser";
        createUserEntity(username, password);
        Assertions.assertTrue(UserDatastore.checkLogin(username, password));
    }

    /**
     * Since we didn't add anything to the dataStore, check that the checkLogin() method returns false, meaning it
     * didn't find any user that matched its credentials.
     */
    @Test
    public void testCheckUnsuccessfulLoginEmptyDataStore() {
        Assertions.assertFalse(UserDatastore.checkLogin("MissingUser", "MissingUser"));
    }

    /**
     * We added a user to dataStore, but the password doesn't match with the password passed into checkLogin(), thus it
     * should fail.
     */
    @Test
    public void testCheckUnsuccessfulLoginNonEmptyDataStore() {
        String username = "UnsuccessfulLoginUser";
        String password = "UnsuccessfulLoginUser";
        createUserEntity(username, password);

        Assertions.assertFalse(UserDatastore.checkLogin("UnsuccessfulLoginUser", "WrongPassword"));
    }

    /**
     * Check that with an empty datastore, we are able to register a new user successfully.
     */
    @Test
    public void testCheckSuccessfulRegistrationWithEmptyDataStore() {
        String username = "SuccessfulUser";
        String password = "SuccessfulUser";
        Assertions.assertTrue(UserDatastore.registerNewUser(username, password));

        Entity user = getUserEntity(username);
        Assertions.assertNotNull(user);
        Assertions.assertEquals(username, user.getString("username"));
    }

    /**
     * Check that with a non empty dataStore, we are still able to register a user since the username doesn't exist.
     */
    @Test
    public void testCheckSuccessfulRegistrationWithNonEmptyDataStore() {
        createUserEntity("Sofia", "Sofia");

        String username = "NewUserRegistration";
        String password = "NewUserRegistration";
        Assertions.assertTrue(UserDatastore.registerNewUser(username, password));

        Entity user = getUserEntity(username);
        Assertions.assertNotNull(user);
        Assertions.assertEquals(username, user.getString("username"));
    }
}
