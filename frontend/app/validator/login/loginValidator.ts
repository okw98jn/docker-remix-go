import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const loginValidator = withZod(
    z.object({
        email: z
            .string()
            .email({ message: "メールアドレスを正しい形式で入力してください" }),
        password: z.string().min(4, { message: "パスワードは4文字以上入力してください" }),
    })
);
