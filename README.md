# Form Validation In HTML

A client-side form validation project built with HTML, CSS, and vanilla JavaScript. It validates user input in real time and on submission, providing instant feedback before navigating to a thank-you page.

## Features

- **Live validation** – fields are validated as you type or select values
- **Blur validation** – required-field checks trigger when you leave a field
- **Full-name validation** – letters only, 2–50 characters, single spaces between words
- **Email validation** – standard email format check
- **Password validation** – minimum 8 characters with at least one uppercase letter, lowercase letter, digit, and special character; toggle visibility with the eye icon
- **Birth date validation** – date cannot be in the future; user must be at least 13 years old
- **Gender selection validation** – ensures an option is chosen
- **Visual feedback** – invalid fields highlighted in red, valid fields in green, with descriptive status messages
- **Successful submission** – redirects to `thank-you.html` when all fields pass validation

## Project Structure

```
Form-Validation-In-HTML/
├── index.html       # Main form page
├── thank-you.html   # Confirmation page shown after successful submission
├── style.css        # Styles for the form and validation states
└── script.js        # Validation logic and event listeners
```

## Getting Started

No build tools or dependencies are required. Simply open `index.html` in any modern browser:

```bash
# Clone the repository
git clone https://github.com/ronitgupta138/Form-Validation-In-HTML.git

# Open in your browser
open Form-Validation-In-HTML/index.html
```

Or serve it with any static file server, for example:

```bash
npx serve .
```

## Usage

1. Fill in all fields on the form.
2. Validation feedback appears live as you type.
3. Click **Submit** – if any field is invalid, an error message is shown next to it.
4. When all fields are valid, you are redirected to the thank-you page.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- [Font Awesome 6](https://fontawesome.com/) – password visibility toggle icon
- [Google Fonts – Open Sans](https://fonts.google.com/specimen/Open+Sans)