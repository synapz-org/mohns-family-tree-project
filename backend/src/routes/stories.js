const express = require('express');
const router = express.Router();

// Get all stories
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Stories endpoint - to be implemented',
        data: []
    });
});

module.exports = router; 