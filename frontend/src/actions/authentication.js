// Authenticate provided credentials.
// If successful, return the JWT assigned by the server
export async function login(username, password) {
  const payload = { username, password };

  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    if (body.token) {
      return body.token;
    }
  }

  const errorMessage = body.message || 'Failed to authenticate with the server';
  throw Error(errorMessage);
}

// Test if the provided token is valid
export async function validateJWT(token) {
  if (!token || token.trim().length === 0) {
    throw Error('Please login to use the application');
  }

  const response = await fetch(`/api/validate?token=${token}`);
  const body = await response.json();

  if (response.status === 200) {
    // JWT is valid
    if (body.valid) {
      return;
    }
    throw Error('Please login to use the application');
  }

  // Some unexpected error occured on server side
  const errorMessage = body.message || 'Failed to authenticate with the server';
  throw Error(errorMessage);
}
