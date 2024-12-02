const express = require('express');
const app = express();

// Middleware global
app.use(express.json());

// Importation des routes
const authRoutes = require('./routes/auth');
const reservationsRoutes = require('./routes/reservations');
const terrainsRoutes = require('./routes/terrains');

// Déclaration des routes
app.use('/auth', authRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/terrains', terrainsRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
