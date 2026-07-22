import "../styles/global.css";
import "../styles//dashboard/dashboard.css";
import "../styles//dashboard/item.css";
import "../styles//dashboard/tree.css";

const newFolderDialog = document.getElementById("new-folder-dialog");
const newFolderForm = document.getElementById("new-folder-form");

newFolderDialog.addEventListener("wa-after-hide", () => newFolderForm.reset());

customElements.whenDefined("wa-tree-item").then(() => {
  document.querySelectorAll(".expanded").forEach((el) => (el.expanded = true));
});
