import React from "react"
import styles from "./SettingsModal.module.scss"
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import { BackIcon, CloseIcon } from "../../assets/images"
import { useTranslation } from "react-i18next"

interface changedData {
    id: string
    name?: string
    email?: string
}
interface data {
    id: string
    name: string
    username: string
    email: string
}
interface Props {
    emailModal: boolean
    handleClose: () => void
    handleBack: (fun: React.Dispatch<React.SetStateAction<boolean>>) => void
    setEmailModal: React.Dispatch<React.SetStateAction<boolean>>
    error: Error | undefined
    setNewEmail: React.Dispatch<React.SetStateAction<string>>
    newEmail: string
    loading: boolean
    submit: (val: changedData) => Promise<void>
    userData: data
}

const validateEmail = (email: string) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )

export const Email = ({
    emailModal,
    handleClose,
    handleBack,
    setEmailModal,
    error,
    loading,
    setNewEmail,
    newEmail,
    submit,
    userData,
}: Props) => {
    const [check, setCheck] = React.useState(false)
    const { t } = useTranslation()
    React.useEffect(() => {
        if (validateEmail(newEmail)) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [newEmail])
    return (
        <Modal open={emailModal}>
            <div className={styles.subModal}>
                <div className={styles.header}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                        }}
                    >
                        <IconButton
                            onClick={() => handleBack(setEmailModal)}
                            edge="start"
                            color="inherit"
                            aria-label="back"
                        >
                            <BackIcon />
                        </IconButton>
                        <h3>{t("change_email")}</h3>
                    </div>
                    <IconButton
                        onClick={handleClose}
                        edge="start"
                        color="inherit"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                {loading ? (
                    <div>loading...</div>
                ) : error ? (
                    `Submission error! ${error.message}`
                ) : (
                    <>
                        <div className={styles.inputs}>
                            <input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder={t("new_email")}
                                type="text"
                            />
                            <input type="text" placeholder={t("password")} />
                        </div>
                        <div className={styles.btns}>
                            <p>{t("forgot_password")}</p>
                            <button
                                type="button"
                                onClick={() => submit({ id: userData.id, email: newEmail })}
                                disabled={!check}
                            >
                                {t("save")}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
