import { gql } from "@apollo/client"
import SEO from "../components/SEO"
import { BlogInfoFragment } from "../fragments/GeneralSettings"
import * as MENUS from "@core/constants/menus"
import { MenuFragment } from "@core/constants/fragments"
import Header from "@core/components/Header/Main"
export default function Component(props: any) {
	if (props.loading) {
		return <>Loading...</>
	}

	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings

	const { title, content } = props?.data?.page

	const menuItems = props?.data?.headerMenu?.nodes

	return (
		<>
			<Header menuItems={menuItems} />
			<SEO title={siteTitle} description={siteDescription} />

			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
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
