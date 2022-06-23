import { gql } from "@apollo/client"

export const PROFILE_INFOS = gql`
    query {
        profile {
            id
            name
            username
            email
        }
    }
`
