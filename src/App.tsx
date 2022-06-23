import { useMemo } from "react"
import Login from "./pages/login/Login"
import ErrorPage from "./pages/ErrorPage"
import ForgotPassword from "./pages/login/ForgotPassword"
import ResetPassword from "./pages/login/ResetPassword"
import Home from "./pages/Dashboard/Home"
import Protected from "./components/Protected"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectToken } from "./redux/token"
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import "./utils/i18n"

function App() {
    const token = useSelector(selectToken)
    const loggedIn = useMemo(() => !!token, [token])
    // console.log("token from redux", reduxToken?.accessToken?.accessToken)
    const tokenBearer = token?.accessToken?.accessToken

    const httpLink = createHttpLink({
        uri: process.env.REACT_APP_SERVER_URL,
    })

    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${tokenBearer}` : "",
        },
    }))

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Protected isLoggedIn={loggedIn}>
                                <Home />
                            </Protected>
                        }
                    />

                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:id" element={<ResetPassword />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
