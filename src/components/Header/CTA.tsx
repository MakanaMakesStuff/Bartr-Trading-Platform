import Link from "next/link";
import style from "@core/src/styles/components/Header/CTA.module.scss";
import { East } from "@mui/icons-material";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";

export default function HeaderCTA() {
	const { state: appState } = useAppContext() as AppContextProps;

	return (
		<div className={style.ctas}>
			{appState.loggedIn ? (
				<Link href="/account/logout">
					<a>Logout</a>
				</Link>
			) : (
				<>
					<Link href="/account/login">
						<a>Login</a>
					</Link>

					<Link href="/account/signup">
						<a>
							Become a member <East />
						</a>
					</Link>
				</>
			)}
		</div>
	);
}
