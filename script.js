const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const symbols = "!@#$%^&*()";

const securityLevels = ["Very weak", "Weak", "Strong", "Very strong"];
const securityLevelsColors = ["#F5203E", "#F1C80B", "#1D90F5", "#1D90F5"];

/*====================================
                Elements
====================================*/

const lengthSlider = document.getElementById("length-slider");
const lengthSliderValue = document.getElementById("length-slider-value");

const uppercaseSwitch = document.getElementById("uppercase-switch");
const lowercaseSwitch = document.getElementById("lowercase-switch");
const digitsSwitch = document.getElementById("digits-switch");
const symbolsSwitch = document.getElementById("symbols-switch");

const passwordInput = document.getElementById("password-input");
const passwordSecurityLevelElements = document.querySelectorAll("#password-security-level");

const generateNewButton = document.getElementById("generate-new-button");
const copyToClipboardButton = document.getElementById("copy-to-clipboard-button");

/*====================================*/

function getSettingCheckboxs(filter = "all"){
    let settings = document.getElementById('settings');
    if(filter == "checked") return settings.querySelectorAll('input[type="checkbox"]:checked');
    if(filter == "unchecked") return settings.querySelectorAll('input[type="checkbox"]:not(:checked)');
    return settings.querySelectorAll('input[type="checkbox"]');
}

function generatePassword(){
    let length = lengthSlider.value;

    let characters = "";
    if(uppercaseSwitch.checked) characters += uppercase;
    if(lowercaseSwitch.checked) characters += lowercase;
    if(digitsSwitch.checked) characters += digits;
    if(symbolsSwitch.checked) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    passwordInput.innerHTML = password;

    // Update security level
    let securityLevel = 0;
    
    if(length >= 8){
        if(length < 12) securityLevel = 1;
        else if(length < 16) securityLevel = 2;
        else securityLevel = 3;

        if(length < 24){
            let checkedCount = getSettingCheckboxs("checked").length;
            if(checkedCount == 1) securityLevel--;
        }
    }

    passwordSecurityLevelElements.forEach(element => {
        element.innerHTML = securityLevels[securityLevel];
        element.style.color = securityLevelsColors[securityLevel];
    });
}

/*====================================
                Events
====================================*/

generatePassword();

generateNewButton.onclick = () => generatePassword();

copyToClipboardButton.onclick = () => {
    navigator.clipboard.writeText(passwordInput.textContent);
}

lengthSlider.oninput = () => {
    lengthSliderValue.innerHTML = lengthSlider.value;
    generatePassword();
}

getSettingCheckboxs().forEach(e => {
    e.onclick = () => {
        generatePassword();

        // At least one checked
        let checkeds = getSettingCheckboxs("checked");
        if(checkeds.length == 1) checkeds[0].disabled = true;
        else getSettingCheckboxs().forEach(e => e.disabled = false);
    }
});