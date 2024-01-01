import { ActionFunction } from "@remix-run/server-runtime";
import { ValidatedForm, validationError } from "remix-validated-form";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";
import { signUpValidator } from "../validator/signup/signUpValidator";
import { createUser } from "../model/signUp";
import { authenticator } from "../services/auth.server";
import { commitSession, getSession } from "../services/session.server";
import { css } from "../../styled-system/css";

export const action: ActionFunction = async ({ request }) => {

    // バリデーション
    const formData = await signUpValidator.validate(
        await request.clone().formData()
    );

    //バリデーションエラーがある場合はエラーを返す
    if (formData.error) {
        return validationError(formData.error);
    }

    // ユーザー登録
    await createUser(formData.data);

    // ログイン処理
    return await authenticator.authenticate("user-login", request, {
        successRedirect: "/tasks",
        failureRedirect: "/signup",
    });
}

export async function loader({ request }: LoaderFunctionArgs) {
    // ログイン済みの場合はタスク一覧にリダイレクト
    await authenticator.isAuthenticated(request, {
        successRedirect: "/tasks",
    });

    // セッションからエラーメッセージを取得して返す
    const session = await getSession(request.headers.get("cookie"));
    const error = session.get(authenticator.sessionErrorKey);
    const errorMessage = error?.message;

    // セッションをコミット
    const setCookieHeader = await commitSession(session);

    return json({ errorMessage }, {
        headers: {
            'Set-Cookie': setCookieHeader
        }
    });
}

export default function SignUp() {
    const { errorMessage } = useLoaderData<typeof loader>();
    return (
        <Box>
            <Title title={'Sign up'} subTitle="ログイン" path={'/login'} />
            <ValidatedForm
                validator={signUpValidator}
                action="/signup"
                method="post"
            >
                <ItemBox>
                    <Label name="name" label="名前" />
                    <Input type="text" name="name" />
                </ItemBox>
                <ItemBox>
                    <Label name="email" label="メールアドレス" />
                    <Input type="text" name="email" />
                </ItemBox>
                <ItemBox>
                    <Label name="password" label="パスワード" />
                    <Input type="password" name="password" />
                </ItemBox>
                {errorMessage && <p className={css({ color: 'red.500', fontSize: 'sm', marginBottom: '15px', fontWeight: 'bold' })}>{errorMessage}</p>}
                <ItemBox>
                    <Button text={'新規登録'} />
                </ItemBox>
            </ValidatedForm>
        </Box>
    );
}
