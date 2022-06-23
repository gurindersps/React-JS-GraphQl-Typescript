import { GridColDef, GridRenderCellParams, GridSelectionModel } from "@mui/x-data-grid"
import NoRowsOverlay from "./NoRowOverlay"
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react"
import StyledDataGridTable from "./StyledDataGridTable"
import tableRows from "../pages/Dashboard/mockData/tableRows"
import { ExperimentModal } from "./experimentModal"
import { useTranslation } from "react-i18next"
import styles from "../styles/Home.module.scss"

interface ExperimentTableWithRowProps {
    setSelectedRows?: Dispatch<SetStateAction<Number>>
}

const ExperimentTableWithRow: FC<ExperimentTableWithRowProps> = ({ setSelectedRows }) => {
    const { t } = useTranslation()
    const rows = tableRows
    const userTableColumns: GridColDef[] = [
        {
            field: "experimentId",
            renderCell: (cellValues: GridRenderCellParams) => (
                <ExperimentModal uniqueId={cellValues.id} />
            ),
            headerName: t("experiment_id"),
            flex: 2,
            sortable: false,
        },
        { field: "ScreenId", headerName: t("screen_id"), flex: 2, sortable: false },
        { field: "assayId", headerName: t("assay_id"), flex: 2, sortable: false },
        { field: "Barcode", headerName: t("barcode"), flex: 2, sortable: false },
        { field: "INCode", headerName: t("in_code"), flex: 2, sortable: false },
        { field: "Concentration", headerName: t("concentration"), flex: 3, sortable: false },
        { field: "TURole", headerName: t("tu_role"), flex: 2, sortable: false },
        { field: "Ocluded", headerName: t("ocluded"), flex: 2, sortable: false },
    ]
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>(() =>
        rows
            .filter((r: { experimentId: number }) => r.experimentId < 1)
            .map((r: { experimentId: number }) => r.experimentId),
    )
    // function to deselect the datagrid rows on pressing esc button
    const escFunction = useCallback((event: { keyCode: number }) => {
        if (event.keyCode === 27) {
            if (setSelectedRows) setSelectedRows(0)
            setSelectionModel([])
        }
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)
        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])
    return (
        <StyledDataGridTable
            disableSelectionOnClick
            checkboxSelection
            autoHeight
            autoPageSize
            pageSize={50}
            columns={userTableColumns}
            rows={tableRows}
            getRowId={(row) => row.experimentId}
            selectionModel={selectionModel}
            onSelectionModelChange={(e) => {
                setSelectionModel(e)
                const selectedIDs = new Set(e)
                if (rows.length > 1) {
                    const selectedRows = rows.filter((r: { experimentId: number }) =>
                        selectedIDs.has(r.experimentId),
                    )
                    // console.log("selectedRows", selectedRows)
                    // selectedRows.length >= 1 ? setShowSelected(true) : setShowSelected(false)
                    if (setSelectedRows) setSelectedRows(selectedRows.length)
                }
            }}
            components={{
                NoRowsOverlay,
            }}
            getRowClassName={() => styles.row}
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
        />
    )
}
export default ExperimentTableWithRow
