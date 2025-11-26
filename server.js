const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/cart/total', (req, res) => {
  const items = req.body.items || [];
  let subtotal = 0;
  for (let it of items) {
    subtotal += (Number(it.price) || 0) * (Number(it.qty) || 0);
  }
  const tax = subtotal * 0.10;
  const total = subtotal + tax;
  res.json({ subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2) });
});

app.listen(3000, () => console.log('Cart project running on http://localhost:3000'));
