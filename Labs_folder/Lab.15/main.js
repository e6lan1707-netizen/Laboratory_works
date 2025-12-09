import { save, load } from "./storage.js";
import { render } from "./ui.js";
import { NotesManager } from "./notes.js";

const manager = new NotesManager();
manager.notes = load();

const input = document.getElementById("noteInput");
const search = document.getElementById("searchInput");
const list = document.getElementById("notesList");

window.removeFn = (i) => {
  manager.removeNote(i);
  save(manager.notes);
  render(list, manager.notes, removeFn);
};

document.getElementById("addBtn").addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  manager.addNote(text);
  save(manager.notes);
  input.value = "";

  render(list, manager.notes, removeFn);
});

search.addEventListener("input", () => {
  const result = manager.search(search.value);
  render(list, result, removeFn);
});

render(list, manager.notes, removeFn);