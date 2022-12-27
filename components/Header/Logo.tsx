import Image from "next/image"
import logo from "@core/public/images/logo.png"
import style from "@core/styles/components/Header/Logo.module.scss"

export default function HeaderLogo() {
	return (
		<div className={style.logo}>
			<Image src={logo.src} width={40} height={40} alt="Bartr Logo" />
			<span>Bartr</span>
		</div>
	)
}
