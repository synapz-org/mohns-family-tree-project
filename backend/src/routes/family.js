const express = require('express');
const router = express.Router();

// Get all family members
router.get('/members', (req, res) => {
    res.json({
        success: true,
        message: 'Family members endpoint - to be implemented',
        data: []
    });
});

// Get all family branches
router.get('/branches', (req, res) => {
    res.json({
        success: true,
        message: 'Family branches endpoint - to be implemented',
        data: []
    });
});

module.exports = router; 