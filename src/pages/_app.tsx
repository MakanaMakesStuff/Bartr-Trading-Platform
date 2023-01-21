import "../faust.config"
import React from "react"
import { useRouter } from "next/router"
import { FaustProvider } from "@faustwp/core"
import "../styles/global.scss"
import AppProvider from "@core/src/utilities/AppContext"
import Head from "next/head"

export default function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return (
		<React.StrictMode>
			<FaustProvider pageProps={pageProps}>
				<AppProvider>
					<Head>
						<link rel="shortcut icon" href="/images/favicon.png" />

						<link
							rel="apple-touch-icon"
							sizes="180x180"
							href="/images/favicon.png"
						/>

						<link
							rel="icon"
							type="image/png"
							sizes="32x32"
							href="/images/favicon.png"
						/>

						<link
							rel="icon"
							type="image/png"
							sizes="16x16"
							href="/images/favicon.png"
						/>
					</Head>
					<Component {...pageProps} key={router.asPath} />
				</AppProvider>
			</FaustProvider>
		</React.StrictMode>
	)
}
