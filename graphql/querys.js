import gql from "graphql-tag"

export const categorias = gql`
query{
  categorias{
    data{
        id
    attributes{
      name
      icon
      slug
      img
    }
  }
}
}
`

export const categoria =  gql`
query ($id: ID!) {
  categoria(id: $id) {
    data {
      id
      attributes {
        description
      }
    }
  }
}
`