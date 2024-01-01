import { LOGIN_API } from "../const/ApiRoute";

export async function login(email: string, password: string): Promise<number> {
    const body = JSON.stringify({ email, password });
    const res = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });
    const response = await res.json();
    const userId = response.user_id;
    
    if (!res.ok) {
        return 0;
    }

    return userId;
}