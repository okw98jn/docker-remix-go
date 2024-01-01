import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { checkEmailDuplication } from "../../model/signUp";

export const signUpValidator = withZod(
    z.object({
        name: z.string().min(1, { message: "名前を入力してください" }),
        email: z
            .string()
            .min(1, { message: "メールアドレスを入力してください" })
            .email({ message: "メールアドレスを正しい形式で入力してください" })
            .superRefine(async (email, ctx) => {
                const emailIdExists = await checkEmailDuplication(email);
                if (emailIdExists) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'メールアドレスは既に使用されています',
                    });
                }
            }),
        password: z.string().min(4, { message: "パスワードは4文字以上入力してください" }),
    })
);
