import React from "react"
import styles from "./Filters.module.scss"
import Filter from "./filter"
import DateFilter from "./dateFilter"

const Filters = () => {
    const [screenId, setScreenId] = React.useState<boolean[]>([])
    const [assayId, setAssayId] = React.useState<boolean[]>([])
    const [fmc, setFmc] = React.useState<boolean[]>([])
    // const [date, setDate] = React.useState<boolean[]>([])
    const [created, setCreated] = React.useState<boolean[]>([])
    const [download, setDownload] = React.useState<boolean[]>([])
    const [analysis, setAnalysis] = React.useState<boolean[]>([])
    const [resetable, setResetable] = React.useState(false)

    const checkState = (): boolean => {
        if (screenId.includes(true)) {
            return true
        }
        if (assayId.includes(true)) {
            return true
        }
        if (fmc.includes(true)) {
            return true
        }
        if (created.includes(true)) {
            return true
        }
        if (download.includes(true)) {
            return true
        }
        if (analysis.includes(true)) {
            return true
        }
        return false
    }
    React.useEffect(() => {
        const x: boolean = checkState()
        setResetable(x)
    }, [screenId, assayId, fmc, created, download, analysis])
    const reset = () => {
        setScreenId([])
        setAssayId([])
        setFmc([])
        setCreated([])
        setDownload([])
        setAnalysis([])
    }

    return (
        <div className={styles.container}>
            <Filter
                filters={screenId}
                // setFilters={setScreenId}
                title="Screen ID:"
                options={["H1", "H2"]}
            />
            <Filter
                filters={assayId}
                // setFilters={setAssayId}
                title="Assay ID:"
                options={["SEL", "Assay ID", "Assay ID"]}
            />
            <Filter
                filters={fmc}
                // setFilters={setFmc}
                title="FMC Annotation:"
                options={["Uploaded", "No annotation uploaded"]}
            />
            <DateFilter />
            <Filter
                filters={created}
                // setFilters={setCreated}
                search
                title="Created By:"
                options={[
                    "User name",
                    "User name",
                    "User name",
                    "User name",
                    "User name",
                    "User name",
                ]}
            />
            <Filter
                filters={download}
                // setFilters={setDownload}
                title="Download Status:"
                options={["True", "False"]}
            />
            <Filter
                filters={analysis}
                // setFilters={setAnalysis}
                title="Analysis Status:"
                options={["In Progress", "Passed", "Failed", "Occluded"]}
            />
            {resetable && (
                <p onClick={reset} className={styles.reset}>
                    Reset
                </p>
            )}
        </div>
    )
}

export default Filters
