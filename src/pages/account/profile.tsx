import AuthedContent from "@core/src/components/AuthedContent";
import AccountLayout from "@core/src/components/Layouts/Account";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";
import { Avatar } from "@mui/material";
import style from "@styles/pages/account/profile.module.scss";

export default function ProfilePage() {
	const { state: appState } = useAppContext() as AppContextProps;

	return (
		<AuthedContent>
			<AccountLayout>
				<div className={style.sidebar}>
					<Avatar
						className={style.avatar}
						alt={`Profile picture of ${appState.viewer?.firstName} ${appState.viewer?.lastName}`}
						src={appState.viewer?.avatar?.url}
					/>

					<div className={style.info}>
						<span className="firstName">{appState.viewer?.firstName}</span>

						<span className="lastName">{appState.viewer?.lastName}</span>
					</div>
				</div>
			</AccountLayout>
		</AuthedContent>
	);
}
