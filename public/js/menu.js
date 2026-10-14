const list = document.getElementById('menu-grid');
const statusText = document.getElementById('status');
const dialog = document.getElementById('item-dialog');

const peso = n => `₱${Number(n).toFixed(0)}`;

async function loadMenu() {
  statusText.textContent = 'Pouring the menu...';
  try {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const items = await res.json();

    list.innerHTML = items.map(item => `
      <li>
        <button class="menu-card" type="button" data-id="${item.id}" aria-label="View details for ${item.name}">
          <span class="photo"><img src="${item.image}" alt="${item.name}" loading="lazy"></span>
          <span class="name">${item.name}</span>
          <span class="hint">View details</span>
        </button>
      </li>
    `).join('');

    statusText.textContent = '';
  } catch (err) {
    statusText.textContent = 'Sorry, the menu could not be loaded. Please try again.';
    console.error(err);
  }
}

async function showItem(id) {
  try {
    const res = await fetch(`/api/menu/${id}`);
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const item = await res.json();

    document.getElementById('dialog-img').src = item.image;
    document.getElementById('dialog-img').alt = item.name;
    document.getElementById('dialog-name').textContent = item.name;
    document.getElementById('dialog-desc').textContent = item.description;
    document.getElementById('dialog-price').textContent = peso(item.price);
    dialog.showModal();
  } catch (err) {
    statusText.textContent = 'Could not load that item.';
    console.error(err);
  }
}

list.addEventListener('click', e => {
  const card = e.target.closest('.menu-card');
  if (card) showItem(card.dataset.id);
});

document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

loadMenu();