/* const express = require('express');
const router = express.Router();
const passport = require('../Controller/googleController');
const jwt = require('jsonwebtoken');

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    async (req, res) => {
        try {
            const student = req.user;
            if (!student) {
                return res.status(401).json({ success: false, message: 'Authentication failed' });
            }

            const token = jwt.sign(
                { id: student._id, role: student.role, email: student.email },
                process.env.JWT_SECRET_KEY, 
                { expiresIn: '7d' }
            );

            res.cookie('access', token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.redirect(`${process.env.CLIENT_URL}/dashboard`);

        } catch (error) {
            console.error('Google OAuth callback error:', error);
            return res.status(500).json({
                success: false,
                message: 'Google login failed'
            });
        }
    }
);

module.exports = router; */