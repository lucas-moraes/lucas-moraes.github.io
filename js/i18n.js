import { translations } from "./translations.min.js";

const DEFAULT_LANG = "br";
const buttonTititle = document.getElementById("i18n-button-text");

let currentLang = window.localStorage.getItem("lang") ?? DEFAULT_LANG;

function SetLang(lang) {
  currentLang = lang;
  window.localStorage.setItem("lang", lang);
  buttonTititle.textContent = lang === "en" ? "PT-BR" : "EN-US";

  document.querySelectorAll("[data-i18n-key]").forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const translation = translations[currentLang][key];

    if (translation) {
      if (el.placeholder !== undefined) {
        el.placeholder = translation;
      }
      if (el.title !== undefined) {
        el.title = translation;
      }

      el.textContent = translation;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  SetLang(currentLang);

  document.getElementById("lang-select").addEventListener("click", () => {
    const newLang = currentLang === "en" ? "br" : "en";
    SetLang(newLang);
  });
});
