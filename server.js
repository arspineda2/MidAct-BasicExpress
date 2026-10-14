// Name: Pineda, Angel Raphaelle S.
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

const menuItems = [
  {
    id: 1,
    name: 'Spanish Latte',
    category: 'coffee',
    price: 140,
    image: '/images/spanish-latte.jpg',
    description: 'Espresso over ice with silky sweetened condensed milk, creamy, smooth, and just sweet enough to feel like a hug in a cup.'
  },
  {
    id: 2,
    name: 'Matcha Latte',
    category: 'non-coffee',
    price: 150,
    image: '/images/matcha-latte.jpg',
    description: 'Ceremonial-grade matcha whisked until smooth, poured over cold milk and ice for a grassy, gently sweet sip.'
  },
  {
    id: 3,
    name: 'Cappuccino',
    category: 'coffee',
    price: 130,
    image: '/images/cappuccino.jpg',
    description: 'A carefully pulled shot of espresso with steamed milk and a thick cap of foam, finished with a little latte art.'
  }
];

function logPage(label) {
  return (req, res, next) => {
    console.log(`${label} page visited`);
    next();
  };
}

app.get('/', logPage('Home'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', logPage('Menu'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/about', logPage('About'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', logPage('Contact'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/api/menu', (req, res) => {
  let results = menuItems;
  const { category, maxPrice } = req.query;

  if (category && category !== 'all') {
    results = results.filter(item => item.category === category.toLowerCase());
  }
  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }

  res.json(results);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(i => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: `Menu item ${req.params.id} not found` });
  }
  res.json(item);
});

app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Auji Brews running at http://localhost:${PORT}`);
});
