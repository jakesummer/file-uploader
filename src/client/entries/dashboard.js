import "../styles/global.css";
import "../styles//dashboard/dashboard.css";
import "../styles//dashboard/item.css";
import "../styles//dashboard/tree.css";
import "../styles//dashboard/dialogs.css";

const newFolderDialog = document.getElementById("new-folder-dialog");
const newFolderForm = document.getElementById("new-folder-form");
const newFileDialog = document.getElementById("new-file-dialog");
const newFileForm = document.getElementById("new-file-form");
const fileInput = document.getElementById("new-file-input");
const fileHint = document.getElementById("new-file-hint");

const MAX_FILE_SIZE_MB = 50;

newFolderDialog.addEventListener("wa-after-hide", () => newFolderForm.reset());
newFileDialog.addEventListener("wa-after-hide", () => newFileForm.reset());

customElements.whenDefined("wa-tree-item").then(() => {
  document.querySelectorAll(".expanded").forEach((el) => (el.expanded = true));
});

document.addEventListener("click", (e) => {
  const file = e.target.closest("wa-button.item[data-type='FILE']");
  if (!file) return;

  const { id, name, size, created } = file.dataset;

  document.getElementById("dialog-file-name").textContent = name;
  document.getElementById("dialog-file-size").textContent = size;
  document.getElementById("dialog-file-created").textContent = created;
  document.getElementById("delete-file-form").action = `/item/delete/${id}`;
  document.getElementById("dialog-download-btn").href = `/item/download/${id}`;
});

fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  if (files.length > 0) {
    const fileSize = files[0].size;
    const maxSize = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (fileSize > maxSize) {
      const errMsg = `File exceeds the ${MAX_FILE_SIZE_MB}MB limit!`;
      fileInput.setCustomValidity(errMsg);
      fileHint.textContent = errMsg;
    } else {
      fileInput.setCustomValidity("");
      fileHint.textContent = "";
    }
  }
});
