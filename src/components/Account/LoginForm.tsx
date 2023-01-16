import { Button } from "@mui/material";
import { FormEvent, useRef } from "react";
import style from "@styles/components/Account/LoginForm.module.scss";
import { gql, useMutation } from "@apollo/client";
import {
	AppContextProps,
	AppContextState,
	useAppContext,
} from "@core/src/utilities/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
	const {
		state: appState,
		updateState,
		appQuery,
	} = useAppContext() as AppContextProps;

	const state = useRef({
		username: "",
		password: "",
	});

	const [login] = useMutation(LoginForm.mutation, {
		refetchQueries: [
			{
				query: appQuery,
			},
		],
		awaitRefetchQueries: true,
	});

	const router = useRouter();

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		login({
			variables: {
				login: state.current.username,
				password: state.current.password,
			},
		})
			.then(({ data, errors }) => {
				if (errors && !data) return null;

				updateState((items: AppContextState) => ({
					...items,
					loggedIn: data?.loginWithCookies?.status ? true : false,
				}));

				router.push("/account/profile");
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<form className={style.form} onSubmit={onSubmit}>
			{appState.loggedIn ? (
				<>
					<h3>Looks like you're signed in!</h3>

					<Link href="/account/logout">Log me Out</Link>
				</>
			) : (
				<>
					<h3>Welcome Back.</h3>
					<input
						type="username"
						defaultValue={state.current.username}
						onChange={(e) => {
							state.current.username = e.currentTarget.value;
						}}
						required
					/>

					<input
						type="password"
						defaultValue={state.current.password}
						onChange={(e) => {
							state.current.password = e.currentTarget.value;
						}}
						required
					/>

					<Button type="submit">Log In</Button>
				</>
			)}
		</form>
	);
}

LoginForm.mutation = gql`
	mutation logIn($login: String!, $password: String!) {
		loginWithCookies(input: { login: $login, password: $password }) {
			status
		}
	}
`;
