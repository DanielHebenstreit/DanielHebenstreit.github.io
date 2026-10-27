const container = document.querySelector('[data-reading-list]');

function renderEmptyState() {
  container.innerHTML = `
    <div class="empty-state">
      <h2>The notebook is just getting started.</h2>
      <p>I have not published any reading notes yet. Future entries will collect concise summaries, questions, and observations from papers I want to revisit.</p>
    </div>`;
}

function renderEntries(entries) {
  if (!entries.length) {
    renderEmptyState();
    return;
  }

  container.innerHTML = entries.map((entry) => `
    <article class="reading-entry">
      <h2>${entry.title}</h2>
      <div class="meta">${entry.authors} · ${entry.dateRead} · <span class="tag">${entry.area}</span></div>
      <p>${entry.summary}</p>
      ${entry.thoughts ? `<p><strong>Notes.</strong> ${entry.thoughts}</p>` : ''}
      <p class="small">${entry.interest ? `Interest: ${entry.interest} · ` : ''}<a href="${entry.url}" rel="noopener">Source ↗</a></p>
    </article>`).join('');
}

fetch('assets/data/reading-notes.json')
  .then((response) => {
    if (!response.ok) throw new Error('Could not load reading notes');
    return response.json();
  })
  .then(renderEntries)
  .catch(renderEmptyState);
