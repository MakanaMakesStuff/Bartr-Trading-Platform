import { MenuItem } from "@core/constants/interfaces"
import Link from "next/link"
import style from "@core/styles/components/Header/Main.module.scss"
import HeaderCTA from "@core/components/Header/CTA"
import HeaderLogo from "@core/components/Header/Logo"

export default function Header({ menuItems }: { menuItems: MenuItem[] }) {
	return (
		<header className={style.header}>
			<HeaderLogo />

			<div className={style.items}>
				{menuItems?.map((item, key) => {
					return (
						<Link key={key} href={item.url} target={item.target}>
							<a className={item.cssClasses.join(" ")}>{item.label}</a>
						</Link>
					)
				})}
			</div>

			<HeaderCTA />
		</header>
	)
}
