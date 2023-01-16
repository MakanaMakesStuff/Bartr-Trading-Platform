import { gql } from '@apollo/client';

export const BlogInfoFragment = gql`
  fragment BlogInfoFragment on GeneralSettings {
    dateFormat
    description
    language
    startOfWeek
    timeFormat
    timezone
    title
    url
  }
`;
