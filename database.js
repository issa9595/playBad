// Données en mémoire pour les terrains
const terrains = [
    { id: 'A', available: true },
    { id: 'B', available: true },
    { id: 'C', available: true },
    { id: 'D', available: true }
];

// Données en mémoire pour les réservations
const reservations = [];

// Compteur pour générer des identifiants uniques de réservation
let reservationId = 1;

// Export des données partagées
module.exports = { terrains, reservations, reservationId };
