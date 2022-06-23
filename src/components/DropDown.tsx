import { useTranslation } from "react-i18next"

const DropDown = () => {
    const { t } = useTranslation()
    return (
        <div className="drop_down">
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("screen_id")}:</option>
                    <option>1</option>
                </select>
            </div>
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("assay_id")}:</option>
                    <option>1</option>
                </select>
            </div>
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("ocluded")}:</option>
                    <option>1</option>
                </select>
            </div>
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("fmc_annotation")}:</option>
                    <option>1</option>
                </select>
            </div>
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("date")}:</option>
                    <option>1</option>
                </select>
            </div>
            <div className="cus_select_parent">
                <select className="cus_select">
                    <option>{t("created_by")}:</option>
                    <option>1</option>
                </select>
            </div>
        </div>
    )
}
export default DropDown
