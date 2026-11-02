const container = document.querySelector('[data-reading-list]');
const pinnedSection = document.querySelector('[data-pinned-section]');
const pinnedContainer = document.querySelector('[data-pinned-list]');
const countNode = document.querySelector('[data-reading-count]');
const sentinel = document.querySelector('[data-reading-sentinel]');
const batchSize = 5;
let entries = [];
let renderedCount = 0;

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function entryDate(entry) {
  const [year, month, day] = entry.dateRead.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(entry) {
  return entryDate(entry).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function entryCard(entry, pinned = false) {
  const notes = entry.notes
    ? `<div class="reading-notes">${entry.notes.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}</div>`
    : '';
  const title = entry.url
    ? `<a href="${escapeHTML(entry.url)}" rel="noopener noreferrer">${escapeHTML(entry.title)}</a>`
    : escapeHTML(entry.title);
  const content = entry.notes
    ? `<details class="reading-details"><summary>${title}</summary>${notes}</details>`
    : `<h3>${title}</h3>`;

  return `
    <article class="reading-entry" role="listitem">
      <div class="reading-date">
        <time datetime="${escapeHTML(entry.dateRead)}">${formatDate(entry)}</time>
        ${pinned ? '<span class="pin-marker">Selected</span>' : ''}
      </div>
      <div class="reading-content">
        ${content}
      </div>
    </article>`;
}

function closeNotes() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.reading-details').forEach((details) => {
      details.open = false;
    });
  });
}

function renderEmptyState() {
  container.innerHTML = `
    <div class="empty-state">
      <h2>The notebook is just getting started.</h2>
      <p>No reading notes are available yet.</p>
    </div>`;
  countNode.textContent = 'No entries yet';
}

function renderNextBatch() {
  const nextEntries = entries.slice(renderedCount, renderedCount + batchSize);
  container.insertAdjacentHTML('beforeend', nextEntries.map((entry) => entryCard(entry)).join(''));
  renderedCount += nextEntries.length;
  sentinel.hidden = renderedCount >= entries.length;
  closeNotes();
}

function renderEntries(loadedEntries) {
  if (!loadedEntries.length) {
    renderEmptyState();
    return;
  }

  entries = [...loadedEntries].sort((a, b) => {
    const dateDifference = entryDate(b) - entryDate(a);
    return dateDifference || (a.order ?? 0) - (b.order ?? 0);
  });

  const pinned = entries.filter((entry) => entry.pinned);
  if (pinned.length) {
    pinnedSection.hidden = false;
    pinnedContainer.innerHTML = pinned.map((entry) => entryCard(entry, true)).join('');
    closeNotes();
  }

  countNode.textContent = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`;
  container.innerHTML = '';
  renderNextBatch();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((observations) => {
      if (observations.some((observation) => observation.isIntersecting)) renderNextBatch();
      if (renderedCount >= entries.length) observer.disconnect();
    }, { rootMargin: '500px 0px' });
    observer.observe(sentinel);
  } else {
    while (renderedCount < entries.length) renderNextBatch();
  }
}

fetch('assets/data/reading-notes.json?v=20261102-reading-1')
  .then((response) => {
    if (!response.ok) throw new Error('Could not load reading notes');
    return response.json();
  })
  .then(renderEntries)
  .catch(renderEmptyState);
