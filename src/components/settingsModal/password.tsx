import React from "react"
import styles from "./SettingsModal.module.scss"
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import { BackIcon, CloseIcon } from "../../assets/images"
import { useTranslation } from "react-i18next"

// interface changedData {
//     id: string
//     name?: string
//     email?: string
// }
// interface data {
//     id: string
//     name: string
//     username: string
//     email: string
// }
interface Props {
    passwordModal: boolean
    handleClose: () => void
    handleBack: (fun: React.Dispatch<React.SetStateAction<boolean>>) => void
    setPasswordModal: React.Dispatch<React.SetStateAction<boolean>>
    error: Error | undefined
    setNewPassword: React.Dispatch<React.SetStateAction<string>>
    newPassword: string
    loading: boolean
    // submit: (val: changedData) => Promise<void>
    // userData: data
}

const validatePass = (pass: string) => {
    if (pass.length > 5) {
        return true
    }
    return false
}

export const Password = ({
    passwordModal,
    handleClose,
    handleBack,
    error,
    setPasswordModal,
    loading,
    setNewPassword,
    newPassword,
}: Props) => {
    const [check, setCheck] = React.useState(false)
    const { t } = useTranslation()
    React.useEffect(() => {
        if (validatePass(newPassword)) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [newPassword])
    return (
        <Modal open={passwordModal}>
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
                            onClick={() => handleBack(setPasswordModal)}
                            edge="start"
                            color="inherit"
                            aria-label="back"
                        >
                            <BackIcon />
                        </IconButton>
                        <h3>{t("change_password")}</h3>
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
                    <div>{t("loading")}</div>
                ) : error ? (
                    `t("submission_error") ${t(error.message)}`
                ) : (
                    <>
                        <div className={styles.inputs}>
                            <input type="text" placeholder="Current Password" />
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder={t("new_password")}
                                type="text"
                            />
                            <input type="text" placeholder={t("confirm_password")} />
                        </div>
                        <div className={styles.btns}>
                            <p>{t("forgot_password")}</p>
                            <button type="button" disabled={!check}>
                                {t("save")}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
