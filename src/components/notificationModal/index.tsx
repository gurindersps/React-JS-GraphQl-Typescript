import styles from "./NotificationModal.module.scss"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Avatar from "@mui/material/Avatar"
import { SelectDropDown } from "../../assets/images"

interface Props {
    setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>
}

export const NotificationModal = ({ setOpenNotifications }: Props) => (
    <ClickAwayListener onClickAway={() => setOpenNotifications(false)}>
        <div className={styles.modal}>
            <div className={styles.header}>
                <div>
                    <p>Notifications</p>
                    <p>All</p>
                    <SelectDropDown />
                </div>
                <div>
                    <p>Mark all as read</p>
                </div>
            </div>
            <div className={styles.notif}>
                <div className={styles.avatar} />
                <div>
                    <p>
                        <span>20220124-H1-SEL-POST</span> is ready to view. It passed with 0
                        symptoms found
                    </p>
                    <div className={styles.btns}>
                        <button type="button">Download</button>
                        <button type="button">View Result</button>
                    </div>
                    <p className={styles.date}>Today at 10:02 AM</p>
                </div>
            </div>
            <div className={styles.notif}>
                <div className={styles.avatar}>
                    <Avatar
                        sx={{
                            background: "#000",
                            height: 30,
                            width: 30,
                            fontSize: 11,
                            fontWeight: 100,
                        }}
                    >
                        JD
                    </Avatar>
                </div>
                <div>
                    <p>
                        <span>John Doe</span> created an experiment{" "}
                        <span>20220124-H1-SEL-POST</span>
                    </p>
                    <p className={styles.date}>Today at 10:02 AM</p>
                </div>
            </div>
        </div>
    </ClickAwayListener>
)
