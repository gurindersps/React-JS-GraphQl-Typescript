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
    nameModal: boolean
    handleClose: () => void
    handleBack: (fun: React.Dispatch<React.SetStateAction<boolean>>) => void
    setNameModal: React.Dispatch<React.SetStateAction<boolean>>
    // error: Error | undefined
    setNewName: React.Dispatch<React.SetStateAction<string>>
    newName: string
    loading: boolean
    submit: (val: changedData) => Promise<void>
    userData: data
}
export const Name = ({
    nameModal,
    handleClose,
    handleBack,
    setNameModal,
    loading,
    setNewName,
    newName,
    submit,
    userData,
}: Props) => {
    const [check, setCheck] = React.useState(false)
    const { t } = useTranslation()
    React.useEffect(() => {
        if (newName.length > 2) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [newName])
    return (
        <Modal open={nameModal}>
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
                            onClick={() => handleBack(setNameModal)}
                            edge="start"
                            color="inherit"
                            aria-label="back"
                        >
                            <BackIcon />
                        </IconButton>
                        <h3>{t("change_name")}</h3>
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
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        type="text"
                        placeholder={t("new_name")}
                        disabled={loading}
                    />
                </div>
                <div className={styles.btns}>
                    <div />
                    <button
                        type="button"
                        onClick={() => submit({ id: userData.id, name: newName })}
                        disabled={!check || loading}
                    >
                        {t("save")}
                    </button>
                </div>
            </div>
            {/* </ClickAwayListener> */}
        </Modal>
    )
}
