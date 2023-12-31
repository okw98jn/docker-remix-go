import { SIGN_UP_API, EMAIL_CHECK_API } from "../const/ApiRoute";

export async function createUser(formData: { email: string; password: string; }) {
    const apiUrl = SIGN_UP_API;
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

export async function checkEmailDuplication(email: string) {
    const apiUrl = EMAIL_CHECK_API;
    const body = JSON.stringify({ email: email });

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

    const response = await res.json();
    return response.is_duplicated;
}