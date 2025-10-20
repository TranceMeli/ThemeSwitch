function calculateSettingsAsThemeString({
    localStorageTheme, systemSettingsDark }) {
        if (localStorageTheme) {
            return localStorageTheme
        }
        if (systemSettingsDark.matches) {
            return 'dark'
    }
    return 'light'
}

function updateButton({ buttonEl, isDark}) {
    const newCta = isDark ? "Join the light side" : "Join the dark side" //aria-label when using text on the button
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
}

// update theme setting on the html tag
function updateThemeOnHtmlEl({ theme }) {

    document.querySelector("html").setAttribute("data-theme", theme)
}

const checkbox = document.getElementById("darkmode-toggle");

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingsDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingsAsThemeString({localStorageTheme, systemSettingsDark });


updateButton({ buttonEl: button, isDark:
    currentThemeSetting === "dark" });
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    checkbox.checked = currentThemeSetting === "dark";


// button click
button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark"});
    updateThemeOnHtmlEl({ theme: newTheme });

    checkbox.checked = newTheme === "dark";
    
    currentThemeSetting = newTheme;
});

checkbox.addEventListener("change", (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark"});
    updateThemeOnHtmlEl({ theme: newTheme });
    currentThemeSetting = newTheme;
});