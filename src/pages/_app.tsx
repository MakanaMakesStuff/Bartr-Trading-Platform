import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/global.scss";
import AppProvider from "@core/src/utilities/AppContext";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<React.StrictMode>
			<FaustProvider pageProps={pageProps}>
				<AppProvider>
					<Component {...pageProps} key={router.asPath} />
				</AppProvider>
			</FaustProvider>
		</React.StrictMode>
	);
}
