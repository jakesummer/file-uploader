const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function debounce(func, delay) {
  let timer;

  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}

function updateInputUi(input, errors, validMsg = null) {
  input.querySelectorAll(".form-validity-icon").forEach((i) => i.remove());

  if (errors && errors.length > 0) {
    const message = errors[0];

    input.setCustomValidity(message);
    input.hint = message;

    const icon = Object.assign(document.createElement("wa-icon"), {
      name: "circle-exclamation",
      slot: "end",
      className: "form-validity-icon",
    });
    input.appendChild(icon);
    input.classList.remove("valid");
    input.classList.add("invalid");
  } else {
    input.setCustomValidity("");
    input.classList.remove("invalid");
    input.hint = "";

    if (validMsg) {
      const icon = Object.assign(document.createElement("wa-icon"), {
        name: "circle-check",
        slot: "end",
        className: "form-validity-icon",
      });
      input.appendChild(icon);
      input.hint = validMsg;
      input.classList.add("valid");
    }
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

async function checkUsernameAvailability() {
  if (username.checkVisibility() && username.value) {
    try {
      const res = await fetch(
        `/username/${encodeURIComponent(username.value)}`,
      );

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.available) {
        return "Username is taken!";
      }
      return null;
    } catch {
      return "Could not verify username. Please try again.";
    }
  }
}

const debouncedFetchAvailability = debounce(async () => {
  const usernameAvailabilityMsg = await checkUsernameAvailability();

  if (usernameAvailabilityMsg) {
    updateInputUi(username, [usernameAvailabilityMsg]);
  } else {
    updateInputUi(username, null, "Username Available!");
  }
}, 500);

async function validateUsername() {
  if (!username.value) return;

  const pattern = /^[a-zA-Z0-9_.]+$/;
  const errors = [];

  const lengthErr = getLengthError(username);
  const patternErr = getPatternError(username, pattern);

  if (lengthErr) errors.push(lengthErr);
  if (patternErr) errors.push(patternErr);

  if (errors.length > 0) {
    debouncedFetchAvailability.cancel();
    updateInputUi(username, errors);
  } else {
    updateInputUi(username, [], "Username Available!");
    debouncedFetchAvailability();
  }
}

function validatePassword() {
  if (!password.value) return;

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

document.addEventListener("DOMContentLoaded", () => {
  validateUsername();
  validatePassword();
});

username.addEventListener("input", validateUsername);

password.addEventListener("input", validatePassword);

confirmPassword.addEventListener("input", validateConfirmPassword);
