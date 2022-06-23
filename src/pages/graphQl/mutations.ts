import { gql } from "@apollo/client"

export const LOGIN_USER_MUTATION = gql`
    mutation SignIn($email: Email, $password: String) {
        SignIn {
            create(input: { email: $email, password: $password }) {
                refreshToken
                accessToken
            }
        }
    }
`

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ($email: Email!) {
        ResetToken {
            create(input: { email: $email }) {
                email
            }
        }
    }
`

export const USER_LOGOUT_MUTATION = gql`
    mutation logout {
        logout {
            success
        }
    }
`

export const REQUEST_RESET_PASSWORD_MUTATION = gql`
    mutation ($token: String!, $password: String!) {
        ResetToken {
            update(input: { token: $token, password: $password }) {
                email
            }
        }
    }
`

export const RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword($data: PasswordResetInput!) {
        resetPassword(data: $data) {
            success
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation changePassword($data: PasswordUpdateInput!) {
        changePassword(data: $data) {
            success
        }
    }
`
