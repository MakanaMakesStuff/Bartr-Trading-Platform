import Link from "next/link"
import style from "@core/styles/components/Header/CTA.module.scss"
import { East } from "@mui/icons-material"

export default function HeaderCTA() {
	return (
		<div className={style.ctas}>
			<Link href="/account/login">
				<a>Login</a>
			</Link>

			<Link href="/account/signup">
				<a>
					Become a member <East />
				</a>
			</Link>
		</div>
	)
}
