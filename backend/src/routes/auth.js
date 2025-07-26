const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { logger } = require('../utils/logger');

const router = express.Router();

// Mock user data for testing
const mockUsers = [
    {
        id: '1',
        email: 'admin@mohns.com',
        password: '$2a$12$Du6MP2D21OmJC4k4tgS6suBPCM0Gl2QHQ2JC6yZplNAIexRggA8jy', // admin123
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin'],
        isActive: true
    },
    {
        id: '2',
        email: 'representative@mohns.com',
        password: '$2a$12$Du6MP2D21OmJC4k4tgS6suBPCM0Gl2QHQ2JC6yZplNAIexRggA8jy', // rep123
        firstName: 'Branch',
        lastName: 'Representative',
        role: 'branch_representative',
        permissions: ['read', 'write'],
        isActive: true
    },
    {
        id: '3',
        email: 'member@mohns.com',
        password: '$2a$12$Du6MP2D21OmJC4k4tgS6suBPCM0Gl2QHQ2JC6yZplNAIexRggA8jy', // member123
        firstName: 'Family',
        lastName: 'Member',
        role: 'family_member',
        permissions: ['read'],
        isActive: true
    }
];

// Login route
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Validation error',
                    details: errors.array()
                }
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid credentials'
                }
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid credentials'
                }
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Account is deactivated'
                }
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        logger.info('User logged in successfully:', { userId: user.id, email: user.email });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: userWithoutPassword,
                token
            }
        });

    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Internal server error'
            }
        });
    }
});

// Register route
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 1 })
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Validation error',
                    details: errors.array()
                }
            });
        }

        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: {
                    message: 'User already exists'
                }
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = {
            id: (mockUsers.length + 1).toString(),
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'family_member',
            permissions: ['read'],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add to mock users (in real app, this would be saved to database)
        mockUsers.push(newUser);

        // Generate JWT token
        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                permissions: newUser.permissions
            },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        logger.info('User registered successfully:', { userId: newUser.id, email: newUser.email });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: userWithoutPassword,
                token
            }
        });

    } catch (error) {
        logger.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Internal server error'
            }
        });
    }
});

// Validate token route
router.get('/validate', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'No token provided'
                }
            });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        // Find user
        const user = mockUsers.find(u => u.id === decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'User not found'
                }
            });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            data: {
                user: userWithoutPassword
            }
        });

    } catch (error) {
        logger.error('Token validation error:', error);
        res.status(401).json({
            success: false,
            error: {
                message: 'Invalid token'
            }
        });
    }
});

module.exports = router; 