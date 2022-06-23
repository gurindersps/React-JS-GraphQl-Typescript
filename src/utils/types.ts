type File = {
    path: String
    name: String
    lastModified: Number
}

type TableRows = {
    experimentId: Number
    ScreenId: Number
    assayId: Number
    Barcode: String
    INCode: String
    Concentration: String
    TURole: Number
    Ocluded: String
}
export type { File, TableRows }
