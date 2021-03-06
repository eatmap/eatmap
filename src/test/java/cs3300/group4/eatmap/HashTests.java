package cs3300.group4.eatmap;

import cs3300.group4.eatmap.security.Hash;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class HashTests {
    /**
     * Ensure the hash created is not a plain text password and is a hash generated by BCrypt
     */
    @Test
    public void generatesPasswordHash() {
        String password = "hello123";
        String hash = Hash.generateHash(password);

        Assertions.assertNotEquals(password, hash);
    }

    /**
     * Test if the method returns true for hash that was generated for the given password
     */
    @Test
    public void acceptsCorrectHash() {
        String password = "hello123";
        String hash = "$2a$10$1uCGV1bFXkbnleZtBca4yuy5yn9X349z8w2FHlGQP4LYlM/vardJm";

        Assertions.assertTrue(Hash.isMatchingHash(hash, password));
    }

    /**
     * Test if the method return false for hash that was not generated using the provided password
     */
    @Test
    public void rejectsInvalidHash() {
        String password = "hello101";
        String hash = "$2a$10$1uCGV1bFXkbnleZtBca4yuy5yn9X349z8w2FHlGQP4LYlM/vardJm";

        Assertions.assertFalse(Hash.isMatchingHash(hash, password));
    }
}
