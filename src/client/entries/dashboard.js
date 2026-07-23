import "../styles/global.css";
import "../styles//dashboard/dashboard.css";
import "../styles//dashboard/item.css";
import "../styles//dashboard/tree.css";

const newFolderDialog = document.getElementById("new-folder-dialog");
const newFolderForm = document.getElementById("new-folder-form");
const newFileDialog = document.getElementById("new-file-dialog");
const newFileForm = document.getElementById("new-file-form");

newFolderDialog.addEventListener("wa-after-hide", () => newFolderForm.reset());
newFileDialog.addEventListener("wa-after-hide", () => newFileForm.reset());

customElements.whenDefined("wa-tree-item").then(() => {
  document.querySelectorAll(".expanded").forEach((el) => (el.expanded = true));
});
