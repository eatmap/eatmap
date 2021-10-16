package cs3300.group4.eatmap;

import com.google.appengine.api.datastore.*;
import cs3300.group4.eatmap.authentication.UserDatastore;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

@SpringBootTest
class EatmapApplicationTests {

	// Local dataStore instance
	private static final LocalServiceTestHelper helper =
			new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

	/**
	 * Create a dataStore instance before each test.
	 */
	@BeforeEach
	public void setUp() {
		helper.setUp();
	}

	/**
	 * Tear down the dataStore instance after each test.
	 */
	@AfterEach
	public void tearDown() {
		helper.tearDown();
	}

	/**
	 * Check if the credentials match what is in dataStore, and should then return true.
	 */
	@Test
	public void testCheckSuccessfulLogin() {
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity entity1 = new Entity("User");
		entity1.setProperty("Username", "Martin");
		entity1.setProperty("Password", ("MartinMartin").hashCode());
		Key key1 = ds.put(entity1);
		assertEquals(true, UserDatastore.checkLogin("Martin", "Martin"));
	}

	/**
	 * Since we didn't add anything to the dataStore, check that the checkLogin() method returns false, meaning it
	 * didn't find any user that matched its credentials.
	 */
	@Test
	public void testCheckUnsuccessfulLoginEmptyDataStore() {
		assertEquals(false, UserDatastore.checkLogin("Martin", "Martin"));
	}

	/**
	 * We added a user to dataStore, but the password doesn't match with the password passed into checkLogin(), thus it
	 * should fail.
	 */
	@Test
	public void testCheckUnsuccessfulLoginNonEmptyDataStore() {
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity entity1 = new Entity("User");
		entity1.setProperty("Username", "Martin");
		entity1.setProperty("Password", ("NotMartin").hashCode());
		Key key1 = ds.put(entity1);
		assertEquals(false, UserDatastore.checkLogin("Martin", "Martin"));
	}

	/**
	 * Check that with an empty datastore, we are able to register a new user successfully.
	 */
	@Test
	public void testCheckSuccessfulRegistrationWithEmptyDataStore() {
		assertEquals(true, UserDatastore.registerNewUser("Martin", "Martin"));
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Query query = new Query("User").setFilter(new Query.FilterPredicate("Username", Query.FilterOperator.EQUAL, "Martin"));
		PreparedQuery results = ds.prepare(query);

		int hashedPassword = ("MartinMartin").hashCode();

		// Check that there is only 1 user with the name 'Martin' in dataStore.
		int count = 0;
		for (Entity entity : results.asIterable()) {
			assertEquals("Martin", entity.getProperty("Username"));
			int entityPassword = Integer.valueOf(entity.getProperty("Password").toString());
			assertEquals(hashedPassword, entityPassword);
			count++;
		}
		assertEquals(1, count);
	}

	/**
	 * Check that with a non empty dataStore, we are still able to register a user since the username doesn't exist.
	 */
	@Test
	public void testCheckSuccessfulRegistrationWithNonEmptyDataStore() {
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity entity1 = new Entity("User");
		entity1.setProperty("Username", "Sofia");
		entity1.setProperty("Password", "Sofia");

		assertEquals(true, UserDatastore.registerNewUser("Martin", "Martin"));
		Query query = new Query("User").setFilter(new Query.FilterPredicate("Username", Query.FilterOperator.EQUAL, "Martin"));
		PreparedQuery results = ds.prepare(query);

		int hashedPassword = ("MartinMartin").hashCode();

		// Check that there is only 1 user with the name 'Martin' in dataStore.
		int count = 0;
		for (Entity entity : results.asIterable()) {
			assertEquals("Martin", entity.getProperty("Username"));
			int entityPassword = Integer.valueOf(entity.getProperty("Password").toString());
			assertEquals(hashedPassword, entityPassword);
			count++;
		}
		assertEquals(1, count);
	}

	/**
	 * Check that with a non empty dataStore, we are not able to register successfully since a user with the same
	 * username already exists.
	 */
	@Test
	public void testUnsuccessfulRegistrationWithNonEmptyDataStore() {

		// Put the initial user into dataStore
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity entity1 = new Entity("User");
		entity1.setProperty("Username", "Martin");
		entity1.setProperty("Password", "Martin");
		ds.put(entity1);

		assertEquals(false, UserDatastore.registerNewUser("Martin", "Martin"));

		// Check that there is still only 1 user named 'Martin'
		Query query = new Query("User").setFilter(new Query.FilterPredicate("Username", Query.FilterOperator.EQUAL, "Martin"));
		PreparedQuery results = ds.prepare(query);

		// Check there is only 1 user with that name.
		int count = 0;
		for (Entity entity : results.asIterable()) {
			assertEquals("Martin", entity.getProperty("Username"));

			// No need to check the hash here since it was put manually at the beginning of the test.
			assertEquals("Martin", entity.getProperty("Password"));
			count++;
		}
		assertEquals(1, count);
	}
}
