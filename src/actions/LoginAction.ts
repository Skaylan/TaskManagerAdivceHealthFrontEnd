export async function callAuthenticationApiRoute(email: string, password: string) {
    const response = await fetch('http://localhost:8000/api/v1/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data
}