import "../styles/global.css";
import "../styles/dashboard.css";
import "../styles/item.css";

const newFolderDialog = document.getElementById("new-folder-dialog");
const newFolderForm = document.getElementById("new-folder-form");

newFolderDialog.addEventListener("wa-after-hide", () => newFolderForm.reset());
