import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import Login from "./login";
import { authenticator } from "../services/auth.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix Auth" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
    // ログイン済みの場合はタスク一覧にリダイレクト
    return await authenticator.isAuthenticated(request, {
        successRedirect: "/tasks",
    });
}

export default function Index() {
	return (
		<Login />
	);
}
