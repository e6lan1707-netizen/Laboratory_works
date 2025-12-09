import { NotesManager } from "./notes.js";

test("Добавление и поиск заметок", () => {
  const m = new NotesManager();
  m.addNote("hello world");
  m.addNote("shadow song");

  const result = m.search("shadow");

  expect(result).toEqual(["shadow song"]);
});