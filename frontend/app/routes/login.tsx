import { ActionFunction, json } from "@remix-run/server-runtime";
import { ValidatedForm, validationError } from "remix-validated-form";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";
import { loginValidator } from "../validator/login/loginValidator";

export const action: ActionFunction = async ({ request }) => {
	await new Promise(resolve => setTimeout(resolve, 500));
	const formData = await loginValidator.validate(
		await request.formData()
	);
	if (formData.error) {
		return validationError(formData.error);
	}
	const { email, password } = formData.data;
	return json({ email, password });
}

export default function Login() {
	return (
		<Box>
			<Title title={'Sign in'} subTitle="新規登録" path={'/signup'} />
			<ValidatedForm
				validator={loginValidator}
				action="/login"
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
					<Button text={'ログイン'} />
				</ItemBox>
			</ValidatedForm>
		</Box>
	);
}
