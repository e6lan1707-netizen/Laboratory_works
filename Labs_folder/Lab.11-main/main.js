const moodForm = document.getElementById('moodForm');
const moodSelect = document.getElementById('moodSelect');
const noteInput = document.getElementById('noteInput');
const moodList = document.getElementById('moodList');

let moods = JSON.parse(localStorage.getItem('moods')) || [];

// Функция отображения списка
function renderMoods() {
  moodList.innerHTML = '';
  if (moods.length === 0) {
    moodList.innerHTML = '<p style="color:#777;">Пока ничего нет...</p>';
    return;
  }

  moods.forEach((mood) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mood.mood}</strong> — <small>${mood.date}</small><br>${mood.note ? `<em>${mood.note}</em>` : ''}`;
    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.onclick = () => {
      moods = moods.filter(m => m.id !== mood.id);
      localStorage.setItem('moods', JSON.stringify(moods));
      renderMoods();
    };

    li.appendChild(document.createElement('br'));
    li.appendChild(delBtn);
    moodList.appendChild(li);
  });
}

// Обработка формы
moodForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!moodSelect.value) return;

  const newMood = {
    id: Date.now(),
    mood: moodSelect.value,
    note: noteInput.value,
    date: new Date().toLocaleString()
  };

  moods.unshift(newMood);
  localStorage.setItem('moods', JSON.stringify(moods));
  renderMoods();

  moodSelect.value = '';
  noteInput.value = '';
});

// Инициализация
renderMoods();