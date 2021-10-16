package cs3300.group4.eatmap.authentication;

public class User {
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String username;
    private String password;

    public void validateCredentials() throws Exception {
        if (this.username.trim().length() == 0) {
            throw new Exception("Please provide a valid username");
        }

        if (this.password.trim().length() == 0) {
            throw new Exception("Please provide a valid password");
        }
    }
}
