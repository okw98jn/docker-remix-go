import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";

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
		</div>
	);
}
