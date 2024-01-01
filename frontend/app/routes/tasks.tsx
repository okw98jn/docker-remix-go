import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	return await authenticator.logout(request, { redirectTo: "/login" });
};

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login",
	});
	return json(user);
}

export default function Tasks() {
	const data = useLoaderData();
	console.log(data);
	return (
		<div>
			<h1>Tasks</h1>
			<Form method="post">
				<button>ログアウト</button>
			</Form>
		</div>
	);
}
