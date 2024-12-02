const jwt = require('jsonwebtoken');

// Clé secrète pour signer les JWT
const SECRET_KEY = 'your_secret_key';

// Générer un JWT avec un rôle
function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Middleware pour vérifier un JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user; // Stocke l'utilisateur décodé dans `req.user`
        next();
    });
}

module.exports = { generateToken, verifyToken };
