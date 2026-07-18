import "../styles/global.css";
import "../styles/dashboard.css";

const newFolderDialog = document.getElementById("new-folder-dialog");
const newFolderForm = document.getElementById("new-folder-form");

newFolderDialog.addEventListener("wa-after-hide", () => newFolderForm.reset());
