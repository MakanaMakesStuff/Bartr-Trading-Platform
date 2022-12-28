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
	max = 4,
}: {
	content: IntroductionContentI
	max?: number
}) {
	function getBubbles() {
		const bubbles = []

		for (let i = 0; i < max; i++) {
			const size = Math.random() + 0.5
			bubbles.push({ key: i, size: size * size })
		}

		return bubbles
	}
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
				{getBubbles()?.map((bubble) => (
					<div
						key={bubble?.key}
						className={style[`dot-${bubble?.key + 1}`]}
						style={{
							width: `${Math.round(20 * bubble?.size)}px`,
							height: `${Math.round(20 * bubble?.size)}px`,
						}}
					/>
				))}

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
