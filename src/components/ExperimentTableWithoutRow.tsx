import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import NoRowsOverlay from "./NoRowOverlay"
import StyledDataGridTable from "./StyledDataGridTable"
import { ExperimentModal } from "./experimentModal"
import { useTranslation } from "react-i18next"

const ExperimentTableWithoutRow = () => {
    const { t } = useTranslation()
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
    return (
        <StyledDataGridTable
            disableSelectionOnClick
            autoHeight
            autoPageSize
            pageSize={50}
            columns={userTableColumns}
            rows={[]}
            components={{
                NoRowsOverlay,
            }}
            // getRowClassName={() => styles.row}
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
        />
    )
}
export default ExperimentTableWithoutRow
