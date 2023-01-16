import { MenuItem } from "@core/src/constants/interfaces";
import Link from "next/link";
import style from "@core/src/styles/components/Header/Main.module.scss";
import HeaderCTA from "@core/src/components/Header/CTA";
import HeaderLogo from "@core/src/components/Header/Logo";
import { gql, useQuery } from "@apollo/client";
import * as MENUS from "@core/src/constants/menus";
import { MenuFragment } from "@core/src/constants/fragments";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";

export default function Header({ menuItems }: { menuItems?: MenuItem[] }) {
	const { state: appState } = useAppContext() as AppContextProps;

	const { data, loading, error } = useQuery(Header.query, {
		variables: {
			headerLocation: MENUS.PRIMARY_LOCATION,
		},
	});

	const items = data?.headerMenu?.nodes || menuItems || [];

	return (
		<header className={style.header}>
			<HeaderLogo />

			<div className={style.items}>
				{items?.map((item, key) => {
					if (!appState.loggedIn && item.cssClasses.includes("authed"))
						return null;

					return (
						<Link key={key} href={item.url} target={item.target}>
							<a className={item.cssClasses.join(" ")}>{item.label}</a>
						</Link>
					);
				})}
			</div>

			<HeaderCTA />
		</header>
	);
}

Header.query = gql`
	${MenuFragment}
	query GetHeaderMenu($headerLocation: MenuLocationEnum) {
		headerMenu: menuItems(where: { location: $headerLocation }) {
			nodes {
				...MenuFragment
			}
		}
	}
`;
