import { gql } from '@apollo/client'

export const GET_ARTICLES_LIST = gql`
  query GetArticlesList($skip: Int!, $take: Int!) {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      lang: "ru"
      skip: $skip
      take: $take
    ) {
      id
      url
      thumbnail
      title {
        short
      }
      dates {
        posted
      }
      description {
        intro
      }
      parents {
        id
        attachment
      }
    }
  }
`

export const GET_ARTICLE = gql`
  query GetArticle($id: String!, $url: String!) {
    content(
      id: $id
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      full_url: $url
    ) {
      id
      thumbnail
      title {
        short
      }
      counters {
        view
      }
      description {
        intro
        long
        thumbnail
      }
      dates {
        posted
      }
      counters {
        comment
        view
      }
      parents {
        id
        attachment
        title {
          nu
        }
      }
    }
  }
`
