import React from "react"
import Checkbox from "@mui/material/Checkbox"
import Menu from "@mui/material/Menu"
import DatePicker, { CalendarContainerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./custom.css"
import styles from "./Filters.module.scss"
import { NextIcon, PrevIcon, SelectDropDown } from "../../assets/images"

const DateFilter = () => {
    const [startDate, setStartDate] = React.useState<Date | null>(new Date())
    const [endDate, setEndDate] = React.useState<Date | null>(null)
    const [rangeMode, setRangeMode] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onChange = (_date: [Date | null, Date | null]) => {
        if (_date) {
            const [start, end] = _date
            setStartDate(start)
            setEndDate(end)
        }
    }
    const MyContainer = ({ className, children }: CalendarContainerProps) => (
        <div className={styles.dateContainer}>
            <div className={className}>
                <div className={styles.child}>{children}</div>
            </div>
        </div>
    )
    const renderDayContents = (day: number) => (
        <div className={styles.day}>
            <span>{day}</span>
        </div>
    )
    return (
        <div>
            <button
                type="button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Date
                <SelectDropDown />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {rangeMode ? (
                    <div className="customDatePickerWidth">
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            showWeekNumbers
                            selected={startDate}
                            onChange={onChange}
                            inline
                            calendarContainer={MyContainer}
                            className={styles.date}
                            fixedHeight
                            renderDayContents={renderDayContents}
                            renderCustomHeader={({
                                monthDate,
                                decreaseMonth,
                                customHeaderCount,
                                increaseMonth,
                            }) => (
                                <div className={`${styles.customHeader} ${styles.rangeHeader}`}>
                                    <button
                                        type="button"
                                        aria-label="Previous Month"
                                        onClick={decreaseMonth}
                                        style={
                                            customHeaderCount === 1
                                                ? { visibility: "hidden" }
                                                : undefined
                                        }
                                    >
                                        <img src="./images/prev.svg" alt="" />
                                    </button>
                                    <div className={styles.dateString}>
                                        <p>
                                            {monthDate.toLocaleString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Next Month"
                                        onClick={increaseMonth}
                                        style={
                                            customHeaderCount === 0
                                                ? { visibility: "hidden" }
                                                : undefined
                                        }
                                    >
                                        <NextIcon />
                                    </button>
                                </div>
                            )}
                            monthsShown={2}
                        />
                    </div>
                ) : (
                    <div className="customDatePickerWidth">
                        <DatePicker
                            showWeekNumbers
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            inline
                            className={styles.date}
                            fixedHeight
                            renderDayContents={renderDayContents}
                            renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
                                <div className={styles.customHeader}>
                                    <div className={styles.dateString}>
                                        <p>
                                            {monthDate.toLocaleString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Previous Month"
                                        onClick={decreaseMonth}
                                    >
                                        <PrevIcon />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Next Month"
                                        onClick={increaseMonth}
                                    >
                                        <NextIcon />
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                )}
                <div className={`${styles.btns} ${styles.btnsDate}`}>
                    <div>
                        <Checkbox checked={rangeMode} onChange={() => setRangeMode(!rangeMode)} />
                        <p>Select a date range</p>
                    </div>
                    <button type="button" onClick={handleClose}>
                        Done
                    </button>
                </div>
            </Menu>
        </div>
    )
}

export default DateFilter
