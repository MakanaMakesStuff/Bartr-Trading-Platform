import { gql } from "@apollo/client";
import SEO from "../src/components/SEO";
import Header from "@core/src/components/Header/Main";
import Link from "next/link";
import style from "@core/src/styles/pages/home.module.scss";
import IntroductionContent from "@core/src/components/Content/Introduction";
import WaitlistContent from "@core/src/components/Content/Waitlist";
import { AppContextProps, useAppContext } from "@core/src/utilities/AppContext";

export default function Component(props: any) {
	const { state: appState } = useAppContext() as AppContextProps;

	if (props.loading) {
		return <>Loading...</>;
	}

	const { title: siteTitle, description: siteDescription } =
		appState.settings || {};

	const page = props?.data?.page;
	const heroTitle = page?.homePageHero?.title;
	const heroSubTitle = page?.homePageHero?.subTitle;
	const leftButton = page?.homePageHero?.leftButton;
	const rightButton = page?.homePageHero?.rightButton;
	const background = page?.homePageHero?.featuredImage?.mediaItemUrl;

	const contentA = {
		title: page?.contentAHomePage?.contentA?.title,
		cta: {
			label: page?.contentAHomePage?.contentA?.ctaButton?.label,
			url: page?.contentAHomePage?.contentA?.ctaButton?.url,
		},
		background: page?.contentAHomePage?.contentA?.featuredImage?.mediaItemUrl,
		learnMore: page?.contentAHomePage?.contentA?.learnMore,
		description: page?.contentAHomePage?.contentA?.description,
	};

	const contentB = {
		title: page?.contentBHomePage?.contentB?.title,
		cta: {
			label: page?.contentBHomePage?.contentB?.ctaButton?.label,
			url: page?.contentBHomePage?.contentB?.ctaButton?.url,
		},
		background: page?.contentBHomePage?.contentB?.featuredImage?.mediaItemUrl,
		learnMore: page?.contentBHomePage?.contentB?.learnMore,
		description: page?.contentBHomePage?.contentB?.description,
	};

	const title = page?.waitlist?.subscribeTitle;
	const subTitle = page?.waitlist?.subscribeSubTitle;
	const button = page?.waitlist?.subscribeButton;

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
					<Header />

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

				<WaitlistContent
					showLogo={true}
					content={{ title, subTitle, button }}
				/>
			</div>
		</>
	);
}

Component.query = gql`
	query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
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
			waitlist: subscribe {
				subscribeButton
				subscribeTitle
				subscribeSubTitle
			}
		}
	}
`;

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		asPreview: ctx?.asPreview,
	};
};
