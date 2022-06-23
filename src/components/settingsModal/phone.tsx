import React from "react"
import styles from "./SettingsModal.module.scss"
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import { BackIcon, CloseIcon } from "../../assets/images"
import { useTranslation } from "react-i18next"

// use this in future when required
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
    phoneModal: boolean
    handleClose: () => void
    handleBack: (fun: React.Dispatch<React.SetStateAction<boolean>>) => void
    setPhoneModal: React.Dispatch<React.SetStateAction<boolean>>
    // error: Error | undefined
    loading: boolean
    // userData: data
}
export const Phone = ({ phoneModal, handleClose, handleBack, setPhoneModal, loading }: Props) => {
    const { t } = useTranslation()
    return (
        <Modal open={phoneModal}>
            {/* <ClickAwayListener onClickAway={handleClose}> */}
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
                            onClick={() => handleBack(setPhoneModal)}
                            edge="start"
                            color="inherit"
                            aria-label="back"
                        >
                            <BackIcon />
                        </IconButton>
                        <h3>{t("change_number")}</h3>
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
                <div className={styles.inputs}>
                    <input type="text" placeholder={t("new_number")} disabled={loading} />
                </div>
                <div className={styles.btns}>
                    <div />
                    <button type="button">{t("save")}</button>
                </div>
            </div>
            {/* </ClickAwayListener> */}
        </Modal>
    )
}
