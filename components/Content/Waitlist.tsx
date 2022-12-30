import { Button } from "@mui/material";
import Image from "next/image";
import style from "@core/styles/components/Content/Waitlist.module.scss";
import trade from "@core/public/images/trade.png";

export interface WaitlistContentI {
	title?: string;
	subTitle?: string;
	button?: string;
}

export default function WaitlistContent({
	content,
	showLogo = false,
}: {
	content?: WaitlistContentI;
	showLogo?: boolean;
}) {
	return (
		<section className={style.waitlist}>
			{showLogo ? (
				<Image
					src={trade}
					alt="Bartr Logo"
					width={80}
					height={80}
					className={style.logo}
				/>
			) : null}
			{content?.title ? <h2>{content.title}</h2> : null}
			{content?.subTitle ? <p>{content.subTitle}</p> : null}
			{content?.button ? (
				<form className={style.info}>
					<input type="text" placeholder="Please enter your email address.." />
					<Button>{content.button}</Button>
				</form>
			) : null}
		</section>
	);
}
