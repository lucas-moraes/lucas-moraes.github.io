import { translations } from "./translations.min.js";

const DEFAULT_LANG = "en";
const DEFAULT_THEME = "light";
const buttonTititle = document.getElementById("i18n-button-text");

let currentLang = window.localStorage.getItem("lang") ?? DEFAULT_LANG;
let currentTheme = window.localStorage.getItem("theme") ?? DEFAULT_THEME;

function SetTheme(theme) {
  currentTheme = theme;
  window.localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

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
  SetTheme(currentTheme);
  SetLang(currentLang);



  document.getElementById("i18n-button-text").addEventListener("click", () => {
    const newLang = currentLang === "en" ? "br" : "en";
    SetLang(newLang);
  });

  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.textContent = currentTheme === "light" ? "🔆" : "🌙";

  themeToggleButton.addEventListener("click", () => {
    let newTheme;
    if(currentTheme === "light") { 
      newTheme = "dark"
      themeToggleButton.textContent = "🌙";
    } 
    else {
      newTheme = "light"; 
      themeToggleButton.textContent = "🔆";
    } 

    SetTheme(newTheme);
  });
});
