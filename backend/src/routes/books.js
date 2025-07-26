const express = require('express');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Books endpoint - to be implemented',
        data: []
    });
});

module.exports = router; 