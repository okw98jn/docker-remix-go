import { Form } from "@remix-run/react";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";

export default function Login() {
	return (
		<Box>
			<Title title={'Sign in'} subTitle="新規登録" path={'/signup'} />
			<Form>
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
