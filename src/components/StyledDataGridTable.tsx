import { styled } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid"

const StyledDataGridTable = styled(DataGrid)`
    &.MuiDataGrid-root {
        border: none;
    }
    .MuiDataGrid-main {
        margin: 0 15px;
    }

    .MuiDataGrid-columnHeaders {
        background-color: white;
        color: grey;
        font-size: 12px;
        font-weight: light;
        outline: none;
        border-bottom-width: 6;
    }

    &.with--content .MuiDataGrid-columnHeaders {
        border-bottom: 4px solid #d8dadf;
    }

    .MuiDataGrid-root {
        .MuiDataGrid-cell:focus-within {
            outline: none !important;
        }
    }

    .MuiDataGrid-columnSeparator {
        visibility: hidden;
    }

    .MuiDataGrid-columnHeadersInner {
        margin-top: 15px;
        margin-bottom: 10px;
    }

    .MuiDataGrid-columnHeaderTitle {
        font-weight: 700;
    }

    .MuiDataGrid-row:hover {
        background-color: transparent !important;
    }

    .MuiDataGrid-row .MuiDataGrid-cell {
        border-bottom: 0;
    }

    .MuiDataGrid-cell:focus {
        outline: solid transparent 0 !important;
    }
`

export default StyledDataGridTable
