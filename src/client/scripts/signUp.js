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

function verifySamePasswords() {
  if (
    confirmPassword.value.length > 0 &&
    confirmPassword.value != password.value
  ) {
    setError(confirmPassword, "Passwords must match!");
  } else {
    removeError(confirmPassword);
  }
}

username.addEventListener("input", () => {
  verifyInputLength(username);
});

password.addEventListener("input", () => {
  verifyInputLength(password);
  verifySamePasswords();
});

confirmPassword.addEventListener("input", () => {
  verifySamePasswords();
});
