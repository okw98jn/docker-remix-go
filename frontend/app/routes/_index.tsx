import { type MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix Auth" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/login");
	}, []);
	return (
		<div>index</div>
	);
}
