const express = require('express');
const { generateToken } = require('../jwt');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = { pseudo: "admybad", password: "admybad" };

// Route pour se connecter
router.post('/login', (req, res) => {
    const { pseudo, password } = req.body;

    if (pseudo === ADMIN_CREDENTIALS.pseudo && password === ADMIN_CREDENTIALS.password) {
        const token = generateToken({ role: 'admin' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
