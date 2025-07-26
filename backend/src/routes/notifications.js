const express = require('express');
const router = express.Router();

// Get notifications
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Notifications endpoint - to be implemented',
        data: []
    });
});

module.exports = router; 