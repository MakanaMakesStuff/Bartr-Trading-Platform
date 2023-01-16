import { gql, useMutation } from "@apollo/client";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage(): null {
	const router = useRouter();
	const { appQuery } = useAppContext() as AppContextProps;

	const [logout, { data, error, loading, called }] = useMutation(
		LogoutPage.mutation,
		{
			refetchQueries: [{ query: appQuery }],
			awaitRefetchQueries: true,
		}
	);

	useEffect(() => {
		// If the mutation is successful and returned a status, then we need to redirect to the login page
		if (data?.logout?.status) {
			router.push("/");
		}

		// if the mutation is loading or is already called, then we need to return early
		if (loading || called) return null;
		// Likewise, if the mutation has an error, then log the error and return early
		else if (error) {
			console.error("Failed to logout the current user:", error);
			return null;
		}

		// Call logout on initial page load
		logout();
	});

	return null;
}

LogoutPage.mutation = gql`
	mutation LogoutPage {
		logout(input: {}) {
			status
		}
	}
`;
