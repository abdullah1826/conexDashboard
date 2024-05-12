import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import Backend from "i18next-xhr-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import i18next from "i18next";
import translationEng from "./Localization/english.json";
import translationFrench from "./Localization/french.json";

let theLanguage = localStorage.getItem("connexLanguage");

const resources = {
  en: {
    translation: translationEng,
  },
  fr: {
    translation: translationFrench,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: theLanguage ? theLanguage : "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
