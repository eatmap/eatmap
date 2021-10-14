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
