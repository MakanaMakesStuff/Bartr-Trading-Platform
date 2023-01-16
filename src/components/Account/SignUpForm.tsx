import { Button, Fade } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import style from "@styles/components/Account/SignUpForm.module.scss";
import { gql, useMutation } from "@apollo/client";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";
import { useRouter } from "next/router";

export default function SignUpForm() {
	const router = useRouter();

	const { appQuery } = useAppContext() as AppContextProps;

	const [signup, { loading }] = useMutation(SignUpForm.mutation, {
		refetchQueries: [{ query: appQuery }],
		awaitRefetchQueries: true,
	});

	const [message, setMessage] = useState<{
		type: "error" | "success";
		body: string;
	} | null>(null);

	const state = useRef({
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		passwordAgain: "",
	});

	function handleChange(e: FormEvent<HTMLInputElement>) {
		state.current[e.currentTarget.name as keyof typeof state.current] =
			e.currentTarget.value;
		setMessage(null);
	}

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (state.current.password !== state.current.passwordAgain) {
			setMessage({
				type: "error",
				body: "Passwords must match",
			});

			return disableMessage(2500);
		}

		signup({
			variables: {
				username: state.current.username,
				email: state.current.email,
				firstName: state.current.firstName,
				lastName: state.current.lastName,
				password: state.current.password,
			},
		})
			.then(() => {
				// When the user is signed up, log a success message and navigate to the home page
				console.info(
					"User successfully signed up!! You can now access the authed content."
				);
				router.push("/");
			})
			.catch((error) => {
				console.error("Failed to sign up user:", error);
			});
	}

	// This function disables the form message after a specified time. We make sure to clear the timeout appropiately
	let delayer: any;
	function disableMessage(delay = 1000) {
		if (delayer) clearTimeout(delayer);

		delayer = setTimeout(() => {
			setMessage(null);
			clearTimeout(delayer);
		}, delay);
	}

	return (
		<form className={style.form} onSubmit={onSubmit}>
			<Fade in={message !== null}>
				<span className={style.message}>{message?.body}</span>
			</Fade>

			<h3>Join the Family :)</h3>

			<input
				type="username"
				placeholder="username"
				name="username"
				onChange={handleChange}
				required
			/>

			<input
				type="email"
				placeholder="email"
				name="email"
				onChange={handleChange}
				required
			/>

			<input
				type="text"
				placeholder="first name"
				name="firstName"
				onChange={handleChange}
				required
			/>

			<input
				type="text"
				placeholder="lasst name"
				name="lasstName"
				onChange={handleChange}
				required
			/>

			<input
				type="password"
				placeholder="password"
				name="password"
				onChange={handleChange}
				required
			/>

			<input
				type="password"
				placeholder="retype password"
				name="passwordAgain"
				onChange={handleChange}
				required
			/>

			<Button type="submit">Sign up</Button>
		</form>
	);
}

SignUpForm.mutation = gql`
	mutation SignUp(
		$username: String!
		$email: String!
		$firstName: String!
		$lastName: String!
		$password: String!
	) {
		registerUser(
			input: {
				username: $username
				email: $email
				firstName: $firstName
				lastName: $lastName
				password: $password
			}
		) {
			clientMutationId
		}
	}
`;
