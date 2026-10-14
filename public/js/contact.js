const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name.value.trim().split(' ')[0];
  note.textContent = `Thank you, ${name}! We'll get back to you soon.`;
  form.reset();
});