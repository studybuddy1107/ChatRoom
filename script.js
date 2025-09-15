let currentSubject = 'Physics';
let entries = JSON.parse(localStorage.getItem('studyEntries')) || [];

function switchSubject(subject) {
  currentSubject = subject;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === subject) btn.classList.add('active');
  });
  renderEntries();
}

function openModal() {
  document.getElementById('entry-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('entry-modal').style.display = 'none';
  clearModalInputs();
}

function clearModalInputs() {
  document.getElementById('chapter').value = '';
  document.getElementById('topic').value = '';
  document.getElementById('questions').value = '';
  document.getElementById('flaws').value = '';
  document.getElementById('doubts').value = '';
}

function addEntry() {
  const chapter = document.getElementById('chapter').value.trim();
  const topic = document.getElementById('topic').value.trim();
  const questions = document.getElementById('questions').value.trim();
  const flaws = document.getElementById('flaws').value.trim();
  const doubts = document.getElementById('doubts').value.trim();

  if (!chapter || !topic || !questions) {
    alert("Please fill in all required fields.");
    return;
  }

  const entry = {
    id: Date.now(),
    subject: currentSubject,
    chapter,
    topic,
    questions,
    flaws,
    doubts
  };

  entries.push(entry);
  localStorage.setItem('studyEntries', JSON.stringify(entries));
  closeModal();
  renderEntries();
}

function deleteEntry(id) {
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem('studyEntries', JSON.stringify(entries));
  renderEntries();
}

function renderEntries() {
  const container = document.getElementById('entries-container');
  container.innerHTML = '';

  const subjectEntries = entries.filter(e => e.subject === currentSubject);
  if (subjectEntries.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:gray;">No entries for ${currentSubject} yet.</p>`;
    return;
  }

  subjectEntries.reverse().forEach(entry => {
    const card = document.createElement('div');
    card.className = `entry-card ${entry.subject.toLowerCase()}`;
    card.innerHTML = `
      <h3>${entry.chapter} — ${entry.topic}</h3>
      <p><strong>Questions:</strong> ${entry.questions}</p>
      ${entry.flaws ? `<p><strong>Flaws:</strong> ${entry.flaws}</p>` : ''}
      ${entry.doubts ? `<p><strong>Doubts:</strong> ${entry.doubts}</p>` : ''}
      <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

function loadDarkMode() {
  const dark = JSON.parse(localStorage.getItem('darkMode'));
  if (dark) document.body.classList.add('dark');
}

window.onload = () => {
  loadDarkMode();
  switchSubject(currentSubject);
};
