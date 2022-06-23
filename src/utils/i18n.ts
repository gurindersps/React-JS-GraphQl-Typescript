import i18n from "i18next"
import ns1 from "../locales/en/translation.json"
import { initReactI18next } from "react-i18next"

export const resources = {
    en: {
        ns1,
    },
} as const

i18n.use(initReactI18next).init({
    lng: "en",
    ns: ["ns1"],
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
})
