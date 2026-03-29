// Selecting form and input elements
const form = document.querySelector("form");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dateInput = document.getElementById("date");
const genderInput = document.getElementById("gender");
const passToggleBtn = document.getElementById("pass-toggle-btn");

const fullnamePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[^A-Za-z0-9]/;

// Function to display error messages
const showError = (field, errorText) => {
    clearFieldState(field);
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("status-text", "error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

const showSuccess = (field, successText = "Looks good") => {
    clearFieldState(field);
    field.classList.add("valid");
    const successElement = document.createElement("small");
    successElement.classList.add("status-text", "valid-text");
    successElement.innerText = successText;
    field.closest(".form-group").appendChild(successElement);
};

const clearFieldError = (field) => {
    field.classList.remove("error");
    field.classList.remove("valid");
    const formGroup = field.closest(".form-group");
    const statusElement = formGroup.querySelector(".status-text");
    if (statusElement) {
        statusElement.remove();
    }
};

const clearFieldState = (field) => {
    clearFieldError(field);
};

const clearErrors = () => {
    document.querySelectorAll(".form-group input, .form-group select").forEach((field) => clearFieldState(field));
    document.querySelectorAll(".status-text").forEach((statusText) => statusText.remove());
};

const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }

    return age;
};

const validateFullname = () => {
    const fullname = fullnameInput.value.trim();

    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
        return false;
    }
    if (!fullnamePattern.test(fullname)) {
        showError(fullnameInput, "Use A to Z letters only (single spaces between words)");
        return false;
    }
    if (fullname.length < 2 || fullname.length > 50) {
        showError(fullnameInput, "Full name must be between 2 and 50 characters");
        return false;
    }

    showSuccess(fullnameInput, "Name looks good");
    return true;
};

const validateEmail = () => {
    const email = emailInput.value.trim();

    if (email === "") {
        showError(emailInput, "Enter your email address");
        return false;
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
        return false;
    }

    showSuccess(emailInput, "Email looks valid");
    return true;
};

const validatePassword = () => {
    const password = passwordInput.value.trim();

    if (password === "") {
        showError(passwordInput, "Enter your password");
        return false;
    }
    if (password.length < 8) {
        showError(passwordInput, "Password must be at least 8 characters long");
        return false;
    }
    if (!hasUppercase.test(password) || !hasLowercase.test(password) || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
        showError(passwordInput, "Password must include uppercase, lowercase, number, and special character");
        return false;
    }

    showSuccess(passwordInput, "Strong password");
    return true;
};

const validateDate = () => {
    const date = dateInput.value;

    if (date === "") {
        showError(dateInput, "Select your date of birth");
        return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        showError(dateInput, "Birth date cannot be in the future");
        return false;
    }
    if (calculateAge(date) < 13) {
        showError(dateInput, "You must be at least 13 years old");
        return false;
    }

    showSuccess(dateInput, "Date accepted");
    return true;
};

const validateGender = () => {
    const gender = genderInput.value;

    if (gender === "") {
        showError(genderInput, "Select your gender");
        return false;
    }

    showSuccess(genderInput, "Selection saved");
    return true;
};

// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();

    // Clearing previous error messages
    clearErrors();

    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isDateValid = validateDate();
    const isGenderValid = validateGender();

    if (!isFullnameValid || !isEmailValid || !isPasswordValid || !isDateValid || !isGenderValid) return;

    // Submitting the form
    form.submit();
}

const validateOnInput = (field, validator) => {
    if (field.value.trim() === "") {
        clearFieldError(field);
        return;
    }
    validator();
};

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Restrict date picker to today or earlier
dateInput.max = new Date().toISOString().split("T")[0];

// Live validation while typing/selecting
fullnameInput.addEventListener("input", () => validateOnInput(fullnameInput, validateFullname));
emailInput.addEventListener("input", () => validateOnInput(emailInput, validateEmail));
passwordInput.addEventListener("input", () => validateOnInput(passwordInput, validatePassword));
dateInput.addEventListener("change", validateDate);
genderInput.addEventListener("change", validateGender);

// Required-field validation when leaving a field
fullnameInput.addEventListener("blur", validateFullname);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
dateInput.addEventListener("blur", validateDate);
genderInput.addEventListener("blur", validateGender);

// Handling form submission event
form.addEventListener("submit", handleFormData);