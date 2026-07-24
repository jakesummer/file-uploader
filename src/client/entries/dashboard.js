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
const uploadProgressBar = document.getElementById("file-upload-progress");

const MAX_FILE_SIZE_MB = 50;

newFolderDialog.addEventListener("wa-show", () => newFolderForm.reset());
newFileDialog.addEventListener("wa-show", () => newFileForm.reset());

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

function uploadFile(file, folderId) {
  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", (e) => {
    uploadProgressBar.style.display = "block";
    if (e.lengthComputable) {
      const progress = Math.round((e.loaded / e.total) * 100);
      uploadProgressBar.value = progress;
    }
  });

  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.href = `/dashboard/${folderId}`;
    } else {
      let errMsg;
      try {
        errMsg = xhr.responseText;
      } catch {
        errMsg = "Something went wrong! Please try again!";
      }
      fileHint.textContent = errMsg;
      uploadProgressBar.style.display = "none";
    }
  };

  xhr.open("POST", `/item/create/file/${folderId}`);
  xhr.send(formData);
}

newFileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!newFileForm.checkValidity()) {
    newFileForm.reportValidity();
    return;
  }

  const file = fileInput.files[0];
  const folderId = newFileForm.dataset.folderId || "";

  if (file) {
    uploadFile(file, folderId);
  }
});
