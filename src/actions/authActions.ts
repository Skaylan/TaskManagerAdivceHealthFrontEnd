export async function callCreateUserApiRoute(name: string, email: string, password: string, confirmPassword: string) {
    const response = await fetch('http://localhost:8000/api/v1/create_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            re_password: confirmPassword
         }),
    });
    const data = await response.json();
    return data
}


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