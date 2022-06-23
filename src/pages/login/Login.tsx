import { useState, useEffect } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { CustomInput, IconButton, InputAdornment } from "../../components/StyledInputRoot"
import Grid from "@mui/material/Grid"
import "../../styles/login.css"
import { Link, useNavigate } from "react-router-dom"
import { validationSchema } from "./validation"
import { LOGIN_USER_MUTATION } from "../graphQl/mutations"
import { useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { addToken } from "../../redux/token"
import { Logo } from "../../assets/images"
import { useTranslation } from "react-i18next"

interface State {
    email: string
    password: string
    showPassword: boolean
}

export default function Login() {
    const [btnDisable, setBtnDisable] = useState<Boolean>(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState<String>("")
    const [values, setValues] = useState<State>({
        email: "",
        password: "",
        showPassword: false,
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [loginUser] = useMutation(LOGIN_USER_MUTATION)

    // setting submit button disabled for following condition
    useEffect(() => {
        if (values.email === "" || values.password === "") {
            setBtnDisable(true)
        }

        if (values.email !== "" && values.password !== "") {
            setBtnDisable(false)
        }
    }, [values.email, values.password, btnDisable])

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleSubmit = () => {
        validationSchema
            .validate({
                email: values.email,
                password: values.password,
            })
            .then(async (valid) => {
                if (!valid) {
                    setError(true)
                    setErrorMessage("kindly enter valid email")
                    return
                }
                if (valid) {
                    try {
                        const data = await loginUser({ variables: values })
                        const apiData = data?.data?.SignIn?.create
                        if (apiData === undefined) {
                            setError(true)
                        }
                        dispatch(addToken(apiData))
                        navigate("/dashboard", apiData)
                    } catch (err) {
                        if (err instanceof Error) {
                            setErrorMessage(err.message)
                            setError(true)
                        }
                    }
                }
            })
            .catch((err) => {
                setError(true)
                setErrorMessage(t(err.errors[0]))
            })
    }

    return (
        <Grid container className="main_content_area">
            <Grid lg={12} item>
                <div className="logo">
                    <Logo />
                </div>
                <div className="welcome-back">
                    <div className="welcome-back-inner">
                        <div className="content_inner">
                            <h4>{t("login_page_heading")}</h4>
                            <div className="error_msg" style={{ display: error ? "flex" : "none" }}>
                                <p>{errorMessage}</p>
                            </div>
                            <div className="form-box">
                                <label>{t("email")}</label>
                                <CustomInput
                                    aria-label="Demo input"
                                    placeholder={t("email_placeholder")}
                                    value={values.email}
                                    onChange={handleChange("email")}
                                />

                                <label className="mt-24">{t("password")}</label>

                                <div className="password_box">
                                    <CustomInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? "text" : "password"}
                                        value={values.password}
                                        placeholder={t("password_placeholder")}
                                        onChange={handleChange("password")}
                                        endAdornment={
                                            <InputAdornment>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="forgot_pasword">
                                    <Link to="/forgot-password">{t("forgot_password")}</Link>
                                </div>
                                <button
                                    type="button"
                                    className={btnDisable ? "button_disabled" : "button_submit"}
                                    onClick={handleSubmit}
                                >
                                    {t("login_button")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
