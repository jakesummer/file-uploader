const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function updateInputUi(input, errors) {
  input.querySelectorAll(".form-invalid-icon").forEach((i) => i.remove());

  if (errors.length > 0) {
    const message = errors[0];

    input.setCustomValidity(message);
    input.hint = message;

    const icon = Object.assign(document.createElement("wa-icon"), {
      name: "circle-exclamation",
      slot: "end",
      className: "form-invalid-icon",
    });
    input.appendChild(icon);
    input.classList.add("invalid");
  } else {
    input.setCustomValidity("");
    input.classList.remove("invalid");
    input.hint = "";
  }
}

function getLengthError(input) {
  const MAX_LENGTH = input.maxlength;
  const MIN_LENGTH = input.minlength;
  const value = input.value;

  const errMsg = `${input.label} must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters!  `;

  if (value.length > MAX_LENGTH || value.length < MIN_LENGTH) {
    return errMsg;
  }
  return null;
}

function getPatternError(input, regex) {
  if (regex.test(input.value)) return null;

  if (input === username) {
    return "Username can only contain letters, numbers, underscores, and periods!";
  }
  return "Password can only contain letters, numbers, and special characters!";
}

function getSamePasswordsError() {
  if (confirmPassword.value && confirmPassword.value != password.value) {
    return "Passwords must match!";
  }
  return null;
}

function validateUsername() {
  const pattern = /^[a-zA-Z0-9_.]+$/;
  const errors = [];

  const lengthErr = getLengthError(username);
  const patternErr = getPatternError(username, pattern);

  if (lengthErr) errors.push(lengthErr);
  if (patternErr) errors.push(patternErr);

  updateInputUi(username, errors);
}

function validatePassword() {
  const pattern = /^[a-zA-Z0-9_.[\]{}()!@#$%^&*+\-=\\/|:;'",<>?`~]+$/;

  const errors = [];

  const lengthErr = getLengthError(password);
  const patternErr = getPatternError(password, pattern);

  if (lengthErr) errors.push(lengthErr);
  if (patternErr) errors.push(patternErr);

  updateInputUi(password, errors);

  validateConfirmPassword();
}

function validateConfirmPassword() {
  const errors = [];
  const samePasswordErr = getSamePasswordsError();

  if (samePasswordErr) errors.push(samePasswordErr);

  updateInputUi(confirmPassword, errors);
}

username.addEventListener("input", validateUsername);

password.addEventListener("input", validatePassword);

confirmPassword.addEventListener("input", validateConfirmPassword);
