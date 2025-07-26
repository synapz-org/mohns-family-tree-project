const express = require('express');
const router = express.Router();

// Get reunion info
router.get('/info', (req, res) => {
    res.json({
        success: true,
        message: 'Reunion info endpoint - to be implemented',
        data: {}
    });
});

module.exports = router; 