const express = require('express');
const router = express.Router();

// тестовый чат маршрут
router.get('/', (req, res) => {
  res.send('Chat route works');
});

module.exports = router;