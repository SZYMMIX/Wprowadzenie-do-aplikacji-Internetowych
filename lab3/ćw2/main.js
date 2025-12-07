const password_form = document.getElementById("password-form")

const charsSmall = "abcdefghijklmnopqrstuvwxyz";
const charsCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsSpecial = "!@#$%^&*()_+[]{}|;:,.<>?";

password_form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const fields = e.target.elements;

    const min = parseInt(fields.min.value);
    const max = parseInt(fields.max.value);
    const upper = fields.upper.checked;
    const special = fields.special.checked;

    let allowedChars = charsSmall;
    
    if (upper){
        allowedChars += charsCaps;
    }

    if (special){
        allowedChars += charsSpecial;
    }

    const length = Math.floor(Math.random() * (max - min + 1)) + min;

    let password = ""

    for(let i = 0; i<length; i++){
        password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }

    alert(password);
})
