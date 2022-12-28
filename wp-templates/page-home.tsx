import { gql } from "@apollo/client"
import SEO from "../components/SEO"
import { BlogInfoFragment } from "../fragments/GeneralSettings"
import * as MENUS from "@core/constants/menus"
import { MenuFragment } from "@core/constants/fragments"
import Header from "@core/components/Header/Main"
import Link from "next/link"
import style from "@core/styles/pages/home.module.scss"
import IntroductionContent from "@core/components/Content/Introduction"

export default function Component(props: any) {
	if (props.loading) {
		return <>Loading...</>
	}

	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings

	const menuItems = props?.data?.headerMenu?.nodes

	const page = props?.data?.page
	const heroTitle = page?.homePageHero?.title
	const heroSubTitle = page?.homePageHero?.subTitle
	const leftButton = page?.homePageHero?.leftButton
	const rightButton = page?.homePageHero?.rightButton
	const background = page?.homePageHero?.featuredImage?.mediaItemUrl

	const contentA = {
		title: page?.contentAHomePage?.contentA?.title,
		cta: {
			label: page?.contentAHomePage?.contentA?.ctaButton?.label,
			url: page?.contentAHomePage?.contentA?.ctaButton?.url,
		},
		background: page?.contentAHomePage?.contentA?.featuredImage?.mediaItemUrl,
		learnMore: page?.contentAHomePage?.contentA?.learnMore,
		description: page?.contentAHomePage?.contentA?.description,
	}

	const contentB = {
		title: page?.contentBHomePage?.contentB?.title,
		cta: {
			label: page?.contentBHomePage?.contentB?.ctaButton?.label,
			url: page?.contentBHomePage?.contentB?.ctaButton?.url,
		},
		background: page?.contentBHomePage?.contentB?.featuredImage?.mediaItemUrl,
		learnMore: page?.contentBHomePage?.contentB?.learnMore,
		description: page?.contentBHomePage?.contentB?.description,
	}

	console.log(contentA, contentB)

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<div className={style.page}>
				<div
					className={style.hero}
					style={{
						backgroundImage: `url(${background})`,
						backgroundSize: "cover",
					}}
				>
					<Header menuItems={menuItems} />

					<div className={style.content}>
						<h1 className={style.title}>{heroTitle}</h1>
						<h3 className={style.subTitle}>{heroSubTitle}</h3>

						<div className={style.buttons}>
							<Link href={leftButton?.leftButtonLink || "#"} target="_self">
								<a>{leftButton?.leftButtonLabel}</a>
							</Link>
							<Link href={rightButton?.rightButtonLink || "#"} target="_self">
								<a>{rightButton?.rightButtonLabel}</a>
							</Link>
						</div>
					</div>
				</div>

				<IntroductionContent content={contentA} />

				<IntroductionContent content={contentB} />
			</div>
		</>
	)
}

Component.query = gql`
	${BlogInfoFragment}
	${MenuFragment}
	query GetPageData(
		$databaseId: ID!
		$asPreview: Boolean = false
		$headerLocation: MenuLocationEnum
	) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			homePageHero {
				leftButton {
					leftButtonLabel
					leftButtonLink
				}
				rightButton {
					rightButtonLabel
					rightButtonLink
				}
				subTitle
				title
				featuredImage {
					mediaItemUrl
				}
			}
			contentAHomePage {
				contentA {
					ctaButton {
						label
						url
					}
					featuredImage {
						mediaItemUrl
					}
					learnMore
					title
					description
				}
			}

			contentBHomePage {
				contentB {
					ctaButton {
						label
						url
					}
					featuredImage {
						mediaItemUrl
					}
					learnMore
					title
					description
				}
			}
		}
		generalSettings {
			...BlogInfoFragment
		}
		headerMenu: menuItems(where: { location: $headerLocation }) {
			nodes {
				...MenuFragment
			}
		}
	}
`

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		headerLocation: MENUS.PRIMARY_LOCATION,
		asPreview: ctx?.asPreview,
	}
}
