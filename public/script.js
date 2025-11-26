const API = 'http://localhost:3000';
function newRow() {
  const div = document.createElement('div'); div.className = 'cart-item';
  div.innerHTML = `
    <div class="item-details">
      <div class="input-group" style="flex:2">
        <label>Product Name</label>
        <input class="iname" placeholder="e.g. Laptop">
      </div>
      <div class="input-group">
        <label>Price</label>
        <input class="iprice" type="number" placeholder="0.00">
      </div>
      <div class="input-group">
        <label>Qty</label>
        <input class="iqty" type="number" placeholder="1" value="1">
      </div>
    </div>
    <button class="btn-remove remove" title="Remove Item">×</button>
  `;
  document.getElementById('items').appendChild(div);
}
document.getElementById('add').addEventListener('click', newRow);
document.getElementById('items').addEventListener('click', e => { if (e.target.classList.contains('remove')) e.target.parentElement.remove(); });
async function calc() {
  const rows = [...document.querySelectorAll('#items .cart-item')];
  const items = rows.map(r => ({ name: r.querySelector('.iname').value, price: Number(r.querySelector('.iprice').value) || 0, qty: Number(r.querySelector('.iqty').value) || 0 }));
  const res = await fetch(API + '/cart/total', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
  const j = await res.json();
  if (j.subtotal === undefined) {
    alert('Server is running an old version. Please restart the node server to see the breakdown.');
    return;
  }
  document.getElementById('subtotal').innerText = j.subtotal;
  document.getElementById('tax').innerText = j.tax;
  document.getElementById('total').innerText = j.total;
}
newRow();
document.getElementById('calc').addEventListener('click', calc);
