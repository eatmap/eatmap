package cs3300.group4.eatmap.security;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class Hash {
    public static String generateHash(String text) {
        return BCrypt.hashpw(text, BCrypt.gensalt());
    }

    public static boolean isMatchingHash(String hash, String text) {
        return BCrypt.checkpw(text, hash);
    }
}
