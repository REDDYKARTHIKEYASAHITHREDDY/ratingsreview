const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, ROUND(AVG(r.rating),1) AS avgRating
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id
  `);
  res.json(rows);
});

app.post('/api/reviews', async (req, res) => {
  const { productId, rating, review } = req.body;
  const userId = 1;

  const [existing] = await db.query(
    'SELECT * FROM reviews WHERE product_id = ? AND user_id = ?',
    [productId, userId]
  );

  if (existing.length) {
    return res.json({ message: 'You already reviewed this product.' });
  }

  await db.query(
    'INSERT INTO reviews (product_id, user_id, rating, review) VALUES (?, ?, ?, ?)',
    [productId, userId, rating, review]
  );

  res.json({ message: 'Review submitted successfully!' });
});

app.listen(3001, () => console.log('Server running on port 3001'));