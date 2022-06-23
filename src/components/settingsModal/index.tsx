import React from "react"
import styles from "./SettingsModal.module.scss"
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import { IOSSwitch } from "../switch"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "../../pages/graphQl/mutations"
import { Name } from "./name"
import { Email } from "./email"
import { Password } from "./password"
import { Phone } from "./phone"
import { CloseIcon } from "../../assets/images"
import { useTranslation } from "react-i18next"

interface data {
    id: string
    name: string
    username: string
    email: string
}
interface changedData {
    id: string
    name?: string
    email?: string
}
interface Props {
    openSettings: boolean
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
    userData: data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch: any
}

export const SettingsModal = ({ openSettings, setOpenSettings, userData, refetch }: Props) => {
    const [nameModal, setNameModal] = React.useState(false)
    const [emailModal, setEmailModal] = React.useState(false)
    const [passwordModal, setPasswordModal] = React.useState(false)
    const [phoneModal, setPhoneModal] = React.useState(false)
    const [newName, setNewName] = React.useState("")
    const [newEmail, setNewEmail] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    // eslint-disable-next-line
    const [update, { data, loading, error, reset }] = useMutation(UPDATE_USER)
    const { t } = useTranslation()
    React.useEffect(() => {
        // console.log(error)
    }, [error])

    const handleOpen = (fun: React.Dispatch<React.SetStateAction<boolean>>) => {
        fun(true)
        setOpenSettings(false)
    }
    const handleBack = (fun: React.Dispatch<React.SetStateAction<boolean>>) => {
        fun(false)
        setOpenSettings(true)
        reset()
    }
    const handleClose = () => {
        setNameModal(false)
        setEmailModal(false)
        setPasswordModal(false)
        setOpenSettings(false)
        setPhoneModal(false)
        reset()
    }
    const submit = async (val: changedData) => {
        await update({ variables: { obj: val } })
        refetch()
        setNewEmail("")
        setNewName("")
        handleBack(setNameModal)
        handleBack(setPasswordModal)
        handleBack(setEmailModal)
    }
    return (
        <>
            <Modal
                open={openSettings}
                onClose={() => setOpenSettings(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.modalContainer}
            >
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>{t("settings")}</h3>
                        <IconButton
                            onClick={() => setOpenSettings(false)}
                            edge="start"
                            color="inherit"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <h3 className={styles.title}>My Account</h3>
                    <div className={styles.field}>
                        <p>
                            {t("name")} <span>{t(userData.name)}</span>
                        </p>
                        <p onClick={() => handleOpen(setNameModal)}>{t("change_name")}</p>
                    </div>
                    <div className={styles.field}>
                        <p>
                            {t("email")} <span>{t(userData.email)}</span>
                        </p>
                        <p onClick={() => handleOpen(setEmailModal)}>{t("change_email")}</p>
                    </div>
                    <div className={styles.field}>
                        <p>{t("password")}</p>
                        <p onClick={() => handleOpen(setPasswordModal)}>{t("change_password")}</p>
                    </div>
                    <div className={styles.field}>
                        <p>
                            {t("phone_number")} <span>+99 999 999</span>
                        </p>
                        <p onClick={() => handleOpen(setPhoneModal)}>{t("change_number")}</p>
                    </div>
                    <h3 className={styles.title}>{t("notification")}</h3>
                    <div className={styles.field}>
                        <p>{t("browser_notification")}</p>
                        <IOSSwitch sx={{ m: 1 }} />
                    </div>
                    <div className={styles.field}>
                        <p>{t("email_notification")}</p>
                        <IOSSwitch sx={{ m: 1 }} />
                    </div>
                    <div className={styles.field}>
                        <p>{t("text_notification")}</p>
                        <IOSSwitch sx={{ m: 1 }} />
                    </div>
                </div>
            </Modal>
            <Name
                nameModal={nameModal}
                handleClose={handleClose}
                handleBack={handleBack}
                setNameModal={setNameModal}
                // error={error}
                loading={loading}
                newName={newName}
                setNewName={setNewName}
                submit={submit}
                userData={userData}
            />
            <Email
                emailModal={emailModal}
                handleClose={handleClose}
                handleBack={handleBack}
                setEmailModal={setEmailModal}
                error={error}
                loading={loading}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                submit={submit}
                userData={userData}
            />
            <Password
                passwordModal={passwordModal}
                handleClose={handleClose}
                handleBack={handleBack}
                setPasswordModal={setPasswordModal}
                error={error}
                loading={loading}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                // submit={submit}
                // userData={userData}
            />
            <Phone
                phoneModal={phoneModal}
                handleClose={handleClose}
                handleBack={handleBack}
                setPhoneModal={setPhoneModal}
                // error={error}
                loading={loading}
                // userData={userData}
            />
        </>
    )
}
