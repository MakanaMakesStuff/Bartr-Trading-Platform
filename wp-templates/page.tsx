import { gql } from "@apollo/client"
import SEO from "../components/SEO"
import * as MENUS from "../constants/menus"
import { BlogInfoFragment } from "../fragments/GeneralSettings"

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings

  const { title, content, featuredImage } = props?.data?.page ?? { title: "" }

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />

      <h1>{title}</h1>
      <p>{content}</p>
    </>
  )
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  }
}

Component.query = gql`
  ${BlogInfoFragment}
  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`
