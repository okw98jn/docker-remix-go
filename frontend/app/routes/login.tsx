import { ActionFunction, json } from "@remix-run/server-runtime";
import { ValidatedForm, validationError } from "remix-validated-form";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Box from "../components/auth/Box";
import Title from "../components/auth/Title";
import Label from "../components/auth/Label";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import ItemBox from "../components/auth/ItemBox";
import { loginValidator } from "../validator/login/loginValidator";
import { authenticator } from "../services/auth.server";
import { commitSession, getSession } from "../services/session.server";
import { css } from "../../styled-system/css";

export const action: ActionFunction = async ({ request }) => {
	// バリデーション
	const formData = await loginValidator.validate(
		await request.clone().formData()
	);

	//バリデーションエラーがある場合はエラーを返す
	if (formData.error) {
		return validationError(formData.error);
	}

	// ログイン処理
	return await authenticator.authenticate("user-login", request, {
		successRedirect: "/tasks",
		failureRedirect: "/login",
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

export default function Login() {
	const { errorMessage } = useLoaderData<typeof loader>();
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
				{errorMessage && <p className={css({ color: 'red.500', fontSize: 'sm', marginBottom: '15px', fontWeight: 'bold' })}>{errorMessage}</p>}
				<ItemBox>
					<Button text={'ログイン'} />
				</ItemBox>
			</ValidatedForm>
		</Box>
	);
}
