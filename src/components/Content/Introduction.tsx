import Link from "next/link"
import style from "@core/src/styles/components/Content/Introduction.module.scss"
import Image from "next/image"
import { ArrowForwardIos } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"

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
			bubbles.push({ key: i, size: size * size * 20 })
		}

		return bubbles
	}

	const mounted = useRef(false)

	const [bubbles, setBubbles] = useState([])

	useEffect(() => {
		if (!mounted.current) {
			setBubbles(getBubbles())
		}

		return () => {
			mounted.current = true
		}
	})

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
				{bubbles.length > 0
					? bubbles?.map((bubble, i) => (
							<div
								key={i}
								className={style[`dot-${bubble?.key + 1}`]}
								style={{
									width: `${bubble?.size}px`,
									height: `${bubble?.size}px`,
								}}
							/>
					  ))
					: null}

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
