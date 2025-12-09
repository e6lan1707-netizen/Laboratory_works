export function save(data) {
    localStorage.setItem("shadow_notes", JSON.stringify(data));
  }
  
  export function load() {
    return JSON.parse(localStorage.getItem("shadow_notes")) || [];
  }