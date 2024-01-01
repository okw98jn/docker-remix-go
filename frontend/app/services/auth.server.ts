import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export const authenticator = new Authenticator<number>(sessionStorage, {
    sessionErrorKey: "my-error-key",
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
        const email = form.get("email");
        const password = form.get("password");
        const userId = await login(String(email), String(password));
        if (!userId) {
            throw new Error("ログインに失敗しました");
        }
        return userId;
    }),
    "user-login"
);