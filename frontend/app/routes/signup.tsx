import { ActionFunction, json } from "@remix-run/server-runtime";
import { ValidatedForm, validationError } from "remix-validated-form";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";
import { signUpValidator } from "../validator/signup/signUpValidator";
import { createUser } from "../model/signUp";

export const action: ActionFunction = async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const formData = await signUpValidator.validate(
        await request.formData()
    );
    if (formData.error) {
        return validationError(formData.error);
    }

    const user = await createUser(formData.data);
    return json({ user });
}

export default function SignUp() {
    return (
        <Box>
            <Title title={'Sign up'} subTitle="ログイン" path={'/login'} />
            <ValidatedForm
                validator={signUpValidator}
                action="/signup"
                method="post"
            >
                <ItemBox>
                    <Label name="email" label="メールアドレス" />
                    <Input type="text" name="email" />
                </ItemBox>
                <ItemBox>
                    <Label name="password" label="パスワード" />
                    <Input type="password" name="password" />
                </ItemBox>
                <ItemBox>
                    <Button text={'新規登録'} />
                </ItemBox>
            </ValidatedForm>
        </Box>
    );
}
