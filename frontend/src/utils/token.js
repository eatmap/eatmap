// Checks if local storage is available and is enabled
function verifyLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('valid', 'true');
            if (localStorage.getItem('valid') === 'true') {
                localStorage.removeItem('valid');
            } else {
                throw Error('Local Storage must be enabled');            
            }
        } catch(e) {
            throw Error('Local Storage must be enabled');
        }
    } else {
        throw Error('Local Storage must be available');
    }
}

const JWT_TOKEN_KEY = 'eatmap-jwt';

export function saveJWT(token) {
    verifyLocalStorage();
    localStorage.setItem(JWT_TOKEN_KEY, token);
}

export function getJWT() {
    return localStorage.getItem(JWT_TOKEN_KEY) || "";
}

export function deleteJWT() {
    localStorage.removeItem(JWT_TOKEN_KEY);
}