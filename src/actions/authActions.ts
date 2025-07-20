import Cookies from "js-cookie";

export async function callCreateUserApiRoute(name: string, email: string, password: string, confirmPassword: string) {
    const response = await fetch(process.env.BACKEND_URL + '/create_user', {
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
    const response = await fetch(process.env.BACKEND_URL + '/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data
}


export function logOut() {
    Cookies.remove("token");
    Cookies.remove("session");
    window.location.href = "/";
}