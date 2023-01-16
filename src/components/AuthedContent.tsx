import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function AuthedContent({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { state: appState, loading: appLoading } =
		useAppContext() as AppContextProps;

	// When the layout loads we need to check if the app query is still loading and if the user is logged in. If it is finshed loading and the user is authenticated the we allow them to view the page. Else we will redirect the user to the login page
	useEffect(() => {
		if (!appLoading && !appState.loggedIn) {
			router.push("/account/login");
			return null;
		}
	}, [appState]);

	return <>{children}</>;
}
