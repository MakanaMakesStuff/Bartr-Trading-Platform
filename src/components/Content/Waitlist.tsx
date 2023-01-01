import { Button } from "@mui/material";
import Image from "next/image";
import style from "@core/src/styles/components/Content/Waitlist.module.scss";
import trade from "@core/public/images/trade.png";
import { useState } from "react";

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
	const [email, setEmail] = useState("");
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
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Please enter your email address.."
					/>
					<Button
						style={{
							transition: "opacity 0.25s ease",
							opacity: email.length <= 0 ? 0.5 : 1,
						}}
						disabled={email.length <= 0}
						type="submit"
					>
						{content.button}
					</Button>
				</form>
			) : null}
		</section>
	);
}
