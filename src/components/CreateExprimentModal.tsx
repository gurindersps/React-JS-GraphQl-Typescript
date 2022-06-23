import React, { FC } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { useTranslation } from "react-i18next"

interface createExprimentModaProps {
    show: boolean
    handleClose?: (event: React.MouseEvent<HTMLElement>) => void
    error?: boolean
    errorMessage?: string
    FirstDropZone: JSX.Element
    SecondDropZone: JSX.Element
    onChangeOptional: (e: React.ChangeEvent<HTMLInputElement>) => void
    submitForm?: () => void
}

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    borderRadius: 4,
    p: 0,
}

const CreateExprimentModal: FC<createExprimentModaProps> = ({
    show,
    handleClose,
    error,
    errorMessage,
    FirstDropZone,
    SecondDropZone,
    onChangeOptional,
    submitForm,
}) => {
    const { t } = useTranslation()
    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="header_box">
                    <h4>{t("create_experiment")}</h4>
                </div>
                <div
                    className="error_msg"
                    style={{
                        display: error ? "flex" : "none",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <p>{errorMessage}</p>
                </div>
                <div className="modal_content">
                    <div className="meta_data">
                        {FirstDropZone}
                        <br />
                        {SecondDropZone}
                        <br />
                        <div>
                            <h4>
                                {t("fmc_annotation")}{" "}
                                <span className="text-grey">{t("optional")}</span>
                            </h4>
                            <br />
                            <input
                                className="cus_input"
                                placeholder={t("experiment_details")}
                                onChange={onChangeOptional}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal_footer">
                    <div className="btn-footer">
                        <a href="#" onClick={handleClose}>
                            {t("cancel_button")}
                        </a>
                        <a className="cre_exp" onClick={submitForm}>
                            {t("create_button")}
                        </a>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default CreateExprimentModal
