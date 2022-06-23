import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const ErrorPage = () => (
    <Grid container justifyContent="center" textAlign="center">
        <Grid item xs={12} p={5}>
            <Typography fontSize="200px">404</Typography>
            <Typography fontSize="40px" marginTop="-6%">
                Page not found
            </Typography>
            <p>The Page you are looking for is not found</p>
            <Button variant="outlined">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    Back to homepage{" "}
                </Link>
            </Button>
        </Grid>
    </Grid>
)

export default ErrorPage
