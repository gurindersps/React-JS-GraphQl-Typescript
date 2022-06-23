import React from "react"
import styles from "./Filters.module.scss"
import Menu from "@mui/material/Menu"
import "./custom.css"
import Checkbox from "@mui/material/Checkbox"
import { SearchIcon, SelectDropDown } from "../../assets/images"

interface Props {
    options: string[]
    title: string
    search?: boolean
    filters: boolean[]
    // setFilters: React.Dispatch<React.SetStateAction<boolean[]>>
}

const Filter = ({ options, title, search, filters }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [optionsState, setOptionsState] = React.useState<boolean[]>([])
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const update = (index: number) => {
        setOptionsState((prev) => {
            const arr = prev.slice()
            arr[index] = !arr[index]
            // console.log("invoked")
            return arr
        })
    }

    // const submit = () => {
    //     setFilters(optionsState)
    //     handleClose()
    // }

    // const clear = () => {
    //     setOptionsState((prev) => {
    //         const arr = prev.slice()
    //         arr.forEach((item, index) => {
    //             arr[index] = false
    //         })
    //         console.log(arr)
    //         return arr
    //     })
    //     console.log("clear", optionsState)
    // }
    React.useEffect(() => {
        setOptionsState(filters)
    }, [open])

    return (
        <div>
            <button
                type="button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {title} <SelectDropDown />
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
                {search && (
                    <div className={styles.search}>
                        <div>
                            <SearchIcon />
                        </div>
                        <input type="text" placeholder="Search" />
                    </div>
                )}
                {options.map((item, index) => (
                    <div key={Math.floor(Math.random() * 10000)} className={styles.item}>
                        <div onClick={() => update(index)}>
                            <p>{item}</p>
                        </div>
                        <Checkbox
                            checked={optionsState[index] || false}
                            onChange={() => update(index)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </div>
                ))}
                <div className={styles.btns}>
                    <button type="button" onClick={handleClose}>
                        Apply
                    </button>
                </div>
            </Menu>
        </div>
    )
}

export default Filter
