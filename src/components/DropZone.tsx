import { Dispatch, FC, SetStateAction, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import { UploadIcon } from "../assets/images"
import { useTranslation } from "react-i18next"
import ProgressBar from "./ProgressBar"
import { CREATE_EXPERIMENT_ATTACHMENT_MUTATION } from "../pages/graphQl/mutations"
import { useMutation } from "@apollo/client"
import { selectToken } from "../redux/token"
import { useSelector } from "react-redux"

interface dropZoneProps {
    type: String
    setFile?: Dispatch<SetStateAction<File[]>>
}

const DropZone: FC<dropZoneProps> = ({ type, setFile }) => {
    const [showFile, setShowFile] = useState<String>()
    const { t } = useTranslation()
    const [fileAttached] = useMutation(CREATE_EXPERIMENT_ATTACHMENT_MUTATION)
    const reduxState = useSelector(selectToken)

    const callMutation = async (fileType: String, fileName: String) => {
        const values = {
            customerId: reduxState?.accessToken?.customerId,
            facilityId: reduxState?.accessToken?.facilityIds[0],
            name: fileName,
            mimeType: fileType,
        }
        try {
            const data = await fileAttached({
                variables: values,
            })
            console.log("data from home", data)
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (setFile) setFile(acceptedFiles)
        setShowFile(acceptedFiles[0]?.name)
        callMutation(acceptedFiles[0]?.type, acceptedFiles[0]?.name)
    }, [])

    const removeFile = () => {
        setShowFile(undefined)
        if (setFile) setFile([])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noKeyboard: true,
    })
    const otherAtt = { directory: "", webkitdirectory: "", type: "file" }
    return (
        <>
            <div>
                <h4>
                    {type === "firstZone" ? (
                        t("meta_data")
                    ) : (
                        <>
                            {t("fmc_annotation")} <span className="text-grey">{t("optional")}</span>
                        </>
                    )}
                </h4>
                <br />
                <div className="upload_box">
                    <UploadIcon />
                    <div {...getRootProps()}>
                        {type === "firstZone" ? (
                            <input {...getInputProps()} {...otherAtt} />
                        ) : (
                            <input {...getInputProps()} />
                        )}
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p className="text-grey">{t("drag_drop")}</p>
                        )}
                    </div>
                </div>
                <p className="text-grey">
                    {type === "firstZone" ? t("supported_file1") : t("excel_file_supported")}{" "}
                </p>
            </div>
            <div className="folder_parent" style={{ display: showFile ? "block" : "none" }}>
                <div className="folder_name">
                    <div className="folder_name_inner">
                        <FolderOpenIcon />
                        <span>{showFile}</span>
                    </div>
                    <div className="progress_bar">
                        <div>
                            <span className="percentage">
                                {" "}
                                <ProgressBar />{" "}
                            </span>
                        </div>
                        <span>10%</span>
                    </div>
                </div>
                <a className="cancel_btn" onClick={removeFile}>
                    {t("delete")}
                </a>
            </div>
        </>
    )
}
export default DropZone
