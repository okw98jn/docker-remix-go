import { Form } from "@remix-run/react";
import { ActionFunction } from "@remix-run/server-runtime";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	await new Promise(resolve => setTimeout(resolve, 500));
	return {
		title: 'Sign in',
	};
}

export default function Login() {
	return (
		<Box>
			<Title title={'Sign in'} subTitle="新規登録" path={'/signup'} />
			<Form method="post">
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
			</Form>
		</Box>
	);
}
