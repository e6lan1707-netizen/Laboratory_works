export class NotesManager {
    constructor() {
      this.notes = [];
      this.tags = new Set();
    }
  
    addNote(text) {
      this.notes.push(text);
  
      // собираем теги вида #tag
      text.split(" ").forEach(w => {
        if (w.startsWith("#")) this.tags.add(w);
      });
  
      return this.notes;
    }
  
    removeNote(index) {
      this.notes.splice(index, 1);
      return this.notes;
    }
  
    search(query) {
      return this.notes.filter(n => n.toLowerCase().includes(query.toLowerCase()));
    }
  }