const express = require('express');
const { verifyToken } = require('../jwt');
const { terrains } = require('../database');
const { createHAL, createHALCollection } = require('../hal');
const router = express.Router();

// Lister tous les terrains
router.get('/', (req, res) => {
    const halResponse = createHALCollection(terrains, '/terrains');
    res.json(halResponse);
});

// Modifier la disponibilité d'un terrain (admin uniquement)
router.post('/:id/status', verifyToken, (req, res) => {
    // Vérifie si l'utilisateur authentifié est un admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { available } = req.body;

    const terrain = terrains.find(t => t.id === id);
    if (!terrain) {
        return res.status(404).json({ message: 'Terrain not found' });
    }

    terrain.available = available;

    const halResponse = createHAL(terrain, {
        self: { href: `/terrains/${id}` }
    });
    res.json(halResponse);
});

module.exports = router;
