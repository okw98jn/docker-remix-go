import { SIGNUP } from "../const/ApiRoute";

export async function createUser(formData: { email: string; password: string; }) {
    const apiUrl = `${process.env.API_URL}${SIGNUP}`;
    const body = JSON.stringify(formData);

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
}