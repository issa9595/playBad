const express = require('express');
const { verifyToken } = require('../jwt');
const { terrains, reservations, reservationId } = require('../database');
const { createHAL, createHALCollection } = require('../hal');
const router = express.Router();

// Lister toutes les réservations
router.get('/', (req, res) => {
    const halResponse = createHALCollection(reservations, '/reservations');
    res.json(halResponse);
});

// Créer une nouvelle réservation
router.post('/', (req, res) => {
    const { terrainId, pseudo, startTime, endTime } = req.body;

    const terrain = terrains.find(t => t.id === terrainId);
    if (!terrain) return res.status(404).json({ message: 'Terrain not found' });

    if (!terrain.available) return res.status(400).json({ message: 'Terrain not available' });

    const newReservation = {
        id: reservationId++,
        terrainId,
        pseudo,
        startTime,
        endTime
    };
    reservations.push(newReservation);
    res.status(201).json(createHAL(newReservation, { self: { href: `/reservations/${newReservation.id}` } }));
});

// Supprimer une réservation
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    const reservationIndex = reservations.findIndex(r => r.id === parseInt(id));
    if (reservationIndex === -1) return res.status(404).json({ message: 'Reservation not found' });

    reservations.splice(reservationIndex, 1);
    res.json({ message: 'Reservation deleted' });
});

module.exports = router;
