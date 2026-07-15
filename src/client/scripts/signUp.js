const USERNAME_PATTERN = /^[a-zA-Z0-9_.]+$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9_.[\]{}()!@#$%^&*+\-=\\/|:;'",<>?`~]+$/;

const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function setError(input, message) {
  input.querySelectorAll(".form-invalid-icon").forEach((i) => i.remove());

  input.setCustomValidity(message);
  input.hint = message;

  const icon = Object.assign(document.createElement("wa-icon"), {
    name: "circle-exclamation",
    slot: "end",
    className: "form-invalid-icon",
  });
  input.appendChild(icon);
  input.classList.add("invalid");
}

function removeError(input) {
  input.querySelectorAll(".form-invalid-icon").forEach((i) => i.remove());
  input.setCustomValidity("");
  input.classList.remove("invalid");
  input.hint = "";
}

function verifyInputLength(input) {
  const MAX_LENGTH = input.maxlength;
  const MIN_LENGTH = input.minlength;
  const value = input.value;

  const errMsg = `${input.label} must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters!  `;

  if (value.length > MAX_LENGTH || value.length < MIN_LENGTH) {
    setError(input, errMsg);
  } else {
    removeError(input);
  }
}

function verifyInputPattern(input, regex) {
  let errMsg =
    "Password can only contain letters, numbers, and special characters!";
  if (input === username) {
    errMsg =
      "Username can only contain letters, numbers, underscores, and periods!";
  }

  if (!regex.test(input.value)) {
    setError(input, errMsg);
  } else {
    removeError(input);
  }
}

function verifySamePasswords() {
  if (confirmPassword.value && confirmPassword.value != password.value) {
    setError(confirmPassword, "Passwords must match!");
  } else {
    removeError(confirmPassword);
  }
}

username.addEventListener("input", () => {
  verifyInputLength(username);
  verifyInputPattern(username, USERNAME_PATTERN);
});

password.addEventListener("input", () => {
  verifyInputLength(password);
  verifyInputPattern(password, PASSWORD_PATTERN);
  verifySamePasswords();
});

confirmPassword.addEventListener("input", () => {
  verifySamePasswords();
});
