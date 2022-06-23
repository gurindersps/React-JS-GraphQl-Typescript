import React from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"

import Dialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import Stack from "@mui/material/Stack"
import Slider from "@mui/material/Slider"
import { ZoomIn, ZoomOut } from "@mui/icons-material"
import { IOSSwitch } from "../switch"
import styles from "./ExperimentModal.module.scss"
import { GridRowId } from "@mui/x-data-grid"
import { CloseWhite, DownloadIcon } from "../../assets/images"
import { useTranslation } from "react-i18next"

interface Props {
    uniqueId: GridRowId
}

const Transition = React.forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement
        },
        ref: React.Ref<unknown>,
    ) => <Slide direction="up" ref={ref} {...props} />,
)

export function ExperimentModal({ uniqueId }: Props) {
    const [open, setOpen] = React.useState(false)
    const [openResult, setOpenResult] = React.useState(false)
    const [ZoomValue, setZoomValue] = React.useState<number>(90)
    const [resultSwitch, setResultSwitch] = React.useState<boolean>(false)
    const { t } = useTranslation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        if (!openResult) {
            setOpen(false)
        }
    }
    const handleZoomChange = (event: Event, newValue: number | number[]) => {
        setZoomValue(newValue as number)
    }

    return (
        <>
            <div onClick={handleOpen} className={styles.id}>
                {uniqueId}
            </div>
            {open && (
                <>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div className={styles.modalContainer}>
                            <div className={styles.pointer} />
                            <div className={styles.modal}>
                                <img onClick={() => setOpenResult(true)} src="./1.png" alt="1" />
                                <h3>{t(uniqueId.toString())}</h3>
                                <hr />
                                <h5>Result Rating</h5>
                                <div className={styles.tags}>
                                    <div className={styles.tag}>passed #/96</div>
                                    <div className={styles.tag}>failed #/96</div>
                                    <div className={styles.tag}>occluded #/96</div>
                                </div>
                                <h5>Symptoms Found</h5>
                                <p>Insert symptom name or say None</p>
                                <h5>Conentration Applied</h5>
                                <p>Insert cocentration name</p>
                                <h5>Conentration Rate</h5>
                                <p>Insert rate value</p>
                            </div>
                        </div>
                    </ClickAwayListener>
                    <Dialog
                        fullScreen
                        open={openResult}
                        onClose={() => setOpenResult(false)}
                        TransitionComponent={Transition}
                    >
                        <div className={styles.dialogContainer}>
                            <div className={styles.topBar}>
                                <div>
                                    <p>
                                        Image file name
                                        <br />
                                        <span>3MB</span>
                                    </p>
                                </div>
                                <div>
                                    <div className={styles.indicators}>
                                        <div />
                                        <p>Passed</p>
                                        <div />
                                        <p>Failed</p>
                                        <div />
                                        <p>Occluded</p>
                                    </div>
                                    <div className={styles.showSwitchContainer}>
                                        <p>Show Result Overlay</p>{" "}
                                        <IOSSwitch
                                            sx={{ m: 1 }}
                                            value={resultSwitch}
                                            onChange={() => setResultSwitch(!resultSwitch)}
                                        />
                                    </div>
                                    <IconButton
                                        style={{ marginRight: 15 }}
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setOpenResult(false)}
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                    >
                                        <CloseWhite />
                                    </IconButton>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <img
                                    style={{ height: `${ZoomValue}%` }}
                                    src={resultSwitch ? "./resultsPreview.png" : "./previewBig.png"}
                                    alt=""
                                />
                            </div>
                            <div className={styles.footer}>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ width: 300, fontSize: 30 }}
                                    alignItems="center"
                                >
                                    <ZoomOut fontSize="inherit" />
                                    <Slider
                                        aria-label="Volume"
                                        value={ZoomValue}
                                        onChange={handleZoomChange}
                                        min={90}
                                        max={160}
                                    />
                                    <ZoomIn fontSize="inherit" />
                                </Stack>
                            </div>
                        </div>
                    </Dialog>
                </>
            )}
        </>
    )
}
