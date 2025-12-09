export function render(listElem, notes, removeFn) {
    listElem.innerHTML = "";
  
    notes.forEach((note, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${note}
        <button onclick="removeFn(${i})">Удалить</button>
      `;
      listElem.appendChild(li);
    });
  }