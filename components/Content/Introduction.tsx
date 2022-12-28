import Link from "next/link"
import style from "@core/styles/components/Content/Introduction.module.scss"
import Image from "next/image"
import { ArrowForwardIos } from "@mui/icons-material"

export interface IntroductionContentI {
	title?: string
	description?: string
	cta?: {
		label?: string
		url?: string
	}
	learnMore?: string
	background?: string
}

export default function IntroductionContent({
	content,
}: {
	content: IntroductionContentI
}) {
	return (
		<section className={style.content}>
			<div className={style.left}>
				<h2>{content.title}</h2>
				<p>{content.description}</p>

				<div className={style.buttons}>
					<Link href={content?.cta?.url || "#"} target="_self">
						{content?.cta?.label}
					</Link>
					<Link href={content?.learnMore || "#"} target="_self">
						<a>
							Learn More <ArrowForwardIos />
						</a>
					</Link>
				</div>
			</div>

			<div className={style.right}>
				<Image
					src={content?.background}
					alt="Content Image"
					width={400}
					height={400}
					className={style.bubble}
					style={{
						backgroundSize: "cover",
					}}
				/>
			</div>
		</section>
	)
}
