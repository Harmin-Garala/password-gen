document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.querySelector('[data-passwordDisplay]');
    const lengthSlider = document.querySelector('[data-lengthslider]');
    const lengthNumber = document.querySelector('[data-lengthnumber]');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercasecase');
    const numberCheckbox = document.getElementById('number');
    const symbolCheckbox = document.getElementById('symbol');
    const generateButton = document.querySelector('.GenerateButton');
    const copyButton = document.querySelector('[data-copy]');
    const copyMsg = document.querySelector('[data-copymsg]');
    const indicator = document.querySelector('[data-indicator]');

    const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
    const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
    const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
    const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
        arrayFromLowToHigh(58, 64)
    ).concat(
        arrayFromLowToHigh(91, 96)
    ).concat(
        arrayFromLowToHigh(123, 126)
    );

    lengthSlider.addEventListener('input', syncLength);
    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyPassword);

    function arrayFromLowToHigh(low, high) {
        const array = [];
        for (let i = low; i <= high; i++) {
            array.push(i);
        }
        return array;
    }

    function syncLength(e) {
        const value = e.target.value;
        lengthNumber.textContent = value;
    }

    function generatePassword() {
        const length = lengthSlider.value;
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numberCheckbox.checked;
        const includeSymbols = symbolCheckbox.checked;
        
        const charCodes = [];
        if (includeUppercase) charCodes.push(...UPPERCASE_CHAR_CODES);
        if (includeLowercase) charCodes.push(...LOWERCASE_CHAR_CODES);
        if (includeNumbers) charCodes.push(...NUMBER_CHAR_CODES);
        if (includeSymbols) charCodes.push(...SYMBOL_CHAR_CODES);
        
        const passwordCharacters = [];
        for (let i = 0; i < length; i++) {
            const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
            passwordCharacters.push(String.fromCharCode(characterCode));
        }
        
        const password = passwordCharacters.join('');
        passwordDisplay.value = password;
        setIndicator(calculateStrength(password));
    }

    function copyPassword() {
        const password = passwordDisplay.value;
        if (!password) return;
        
        navigator.clipboard.writeText(password).then(() => {
            copyMsg.textContent = 'Copied!';
            setTimeout(() => copyMsg.textContent = '', 2000);
        }).catch(err => {
            console.error('Failed to copy password: ', err);
        });
    }

    function calculateStrength(password) {
        const length = password.length;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let strength = 0;
        if (hasUpper) strength++;
        if (hasLower) strength++;
        if (hasNumber) strength++;
        if (hasSymbol) strength++;
        if (length >= 8) strength++;

        return strength;
    }

    function setIndicator(strength) {
        indicator.className = ''; // Reset class
        if (strength === 0) {
            indicator.style.backgroundColor = 'transparent';
            indicator.textContent = '';
        } else if (strength <= 2) {
            indicator.style.backgroundColor = 'red';
           
        } else if (strength <= 4) {
            indicator.style.backgroundColor = 'orange';
            
        } else {
            indicator.style.backgroundColor = 'green';
            
        }
    }
});
