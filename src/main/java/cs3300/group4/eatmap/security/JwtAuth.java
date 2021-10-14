package cs3300.group4.eatmap.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtException;


import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

public class JwtAuth {

    // Hours for how long a token is valid
    public static final long JWT_TOKEN_VALIDITY = 6;

    // Key to sign JWT
    private static final String secret = "HGwfpYahwMahQuZh0j2o8nFV3Y1z8VyK";


    public String getJwtToken(String username) {
        return Jwts.builder()
                .setClaims(new HashMap<>()).setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 2 * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> resolver) throws JwtException {
        final Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return resolver.apply(claims);
    }

    public boolean checkValidJwtToken(String token) {
        try {
            // Since no additional authorization is necessary, simply check if the token is not malformed and not expired
            Date expirationDate = getClaimFromToken(token, Claims::getExpiration);
            return !expirationDate.before(new Date());
        } catch (JwtException ex) {
            return false ;
        }
    }
}
