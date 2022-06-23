import { useEffect, useState } from "react"
import { Grid } from "@mui/material"
import "../../styles/login.css"
import { useMutation } from "@apollo/client"
import { CustomInput } from "../../components/StyledInputRoot"
import { Link } from "react-router-dom"
import { emailvalidationSchema } from "./validation"
import { FORGOT_PASSWORD_MUTATION } from "../graphQl/mutations"
import { ArrowLeftIcon, CheckEmailIcon, Logo } from "../../assets/images"
import { useTranslation } from "react-i18next"

function ForgotPassword() {
    const [sent, setSent] = useState(false)
    const [email, setEmail] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [btnDisable, setBtnDisable] = useState<Boolean>(true)
    const { t } = useTranslation()

    const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION)

    // setting submit button disabled for following condition
    useEffect(() => {
        if (email === "") {
            setBtnDisable(true)
        }

        if (email !== "") {
            setBtnDisable(false)
            setErrMsg("")
        }
    }, [email, btnDisable])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleClick = () => {
        emailvalidationSchema
            .validate({
                email,
            })
            .then(async (valid) => {
                if (!valid) {
                    setErrMsg("kindly enter valid email")
                }
                if (valid) {
                    try {
                        const data = await forgotPassword({ variables: { email } })
                        if (data === undefined) {
                            setSent(false)
                        }
                        setSent(true)
                    } catch (err) {
                        if (err instanceof Error) {
                            setErrMsg(err.message)
                            setSent(false)
                        }
                    }
                }
            })
            .catch((err) => {
                setErrMsg(t(err.errors[0]))
            })
    }

    const handleResendClick = async () => {
        try {
            await forgotPassword({ variables: { email } })
        } catch (err) {
            if (err instanceof Error) {
                setErrMsg(err.message)
            }
        }
    }

    const SentSuccess = () => (
        <div className="back-box">
            <div className="back_btn">
                <ArrowLeftIcon />
                <span>
                    <Link to="/">{t("back_to_login")}</Link>
                </span>
            </div>
            <div className="forgot_content_area text-center">
                <CheckEmailIcon />
                <h3>{t("check_your_email")}</h3>
                <p>{t("sent_reset_instructions")}</p>
                <p className="mail_name">{email}</p>
                <div className="resend_mail">
                    <span>{t("didnot_receive_the_email")}</span>{" "}
                    <span className="resend_text" onClick={handleResendClick}>
                        {" "}
                        <a> {t("resend_button")} </a>
                    </span>
                </div>
            </div>
        </div>
    )

    return (
        <Grid container className="main_content_area">
            <Grid lg={12} item>
                <div className="logo">
                    <Logo />
                </div>
                <div className="welcome-back">
                    <div className="welcome-back-inner">
                        <div className="content_inner">
                            {sent ? (
                                <SentSuccess />
                            ) : (
                                <div className="back-box">
                                    <div className="back_btn">
                                        <ArrowLeftIcon />{" "}
                                        <span>
                                            <Link to="/">{t("back")}</Link>
                                        </span>
                                    </div>
                                    <div className="forgot_content_area">
                                        <div
                                            className="error_msg"
                                            style={{
                                                display: errMsg === "" ? "none" : "block",
                                                textAlign: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "#ae0a04",
                                                    paddingTop: "5%",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {errMsg}
                                            </p>
                                        </div>
                                        <h5>{t("forgot_password_heading")}</h5>
                                        <p>{t("forgot_password_subheading")}</p>
                                        <CustomInput
                                            aria-label="Demo input"
                                            value={email}
                                            placeholder={t("email_placeholder")}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="submit"
                                            className="button_submit"
                                            onClick={handleClick}
                                            disabled={!!btnDisable}
                                        >
                                            {t("send_reset_instructions")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
export default ForgotPassword
