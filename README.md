
# **PlayBad - API de Réservation de Terrains de Badminton**

Une API RESTful permettant de gérer les réservations de terrains de badminton et l'administration de leur disponibilité.

---

## **Table des matières**
1. [Lancer le projet](#lancer-le-projet)
2. [Conception](#conception)
   - [Dictionnaire des données](#dictionnaire-des-données)
   - [Tableau récapitulatif des ressources](#tableau-récapitulatif-des-ressources)
3. [Sécurité](#sécurité)
4. [Remarques](#remarques)
5. [Références](#références)

---

## **Lancer le projet**

### **Pré-requis**
- **Node.js** version 14 ou supérieure
- **npm** (installé avec Node.js)

### **Instructions**
1. **Cloner le projet :**
   ```bash
   git clone https://github.com/nom-utilisateur/playbad.git
   cd playbad
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur :**
   ```bash
   npm run start
   ```
   Par défaut, le service sera disponible à l’adresse suivante :
   ```
   http://localhost:3000
   ```

4. **Tester les endpoints :**
   Utilisez un outil comme [Postman](https://www.postman.com/) ou `cURL` pour interagir avec l'API.

---

## **Conception**

### **Dictionnaire des données**

| **Nom**        | **Description**                                                  |
|-----------------|------------------------------------------------------------------|
| `terrain`       | Identifiant unique pour un terrain (ex. "A", "B", "C", "D").     |
| `available`     | Statut de disponibilité d’un terrain (boolean).                 |
| `reservationId` | Identifiant unique d'une réservation (généré automatiquement).   |
| `terrainId`     | Identifiant du terrain associé à une réservation.                |
| `pseudo`        | Pseudo de l'utilisateur effectuant une réservation.              |
| `startTime`     | Heure de début de la réservation (format ISO 8601).              |
| `endTime`       | Heure de fin de la réservation (format ISO 8601).                |
| `role`          | Rôle de l'utilisateur (admin ou utilisateur standard).           |

---

### **Tableau récapitulatif des ressources**

| **Ressource**     | **URL**                    | **Méthodes HTTP** | **Paramètres d’URL/Variations** | **Commentaires**                                        |
|--------------------|----------------------------|-------------------|----------------------------------|--------------------------------------------------------|
| **Authentification** | `/auth/login`           | `POST`            | Aucune                           | Permet de générer un token JWT pour un admin.          |
| **Terrains**       | `/terrains`               | `GET`             | Aucune                           | Liste tous les terrains et leur disponibilité.         |
| **Terrains**       | `/terrains/:id/status`    | `POST`            | `:id` (A, B, C, D)              | Met à jour la disponibilité d’un terrain (admin).      |
| **Réservations**   | `/reservations`           | `GET`             | Aucune                           | Liste toutes les réservations existantes.              |
| **Réservations**   | `/reservations`           | `POST`            | Aucune                           | Crée une nouvelle réservation pour un terrain.         |
| **Réservations**   | `/reservations/:id`       | `DELETE`          | `:id` (identifiant numérique)   | Supprime une réservation existante (admin).            |

---

## **Sécurité**

### **Mesures de sécurité mises en place**
1. **Authentification basée sur JWT :**
   - Un administrateur doit se connecter via `/auth/login` pour obtenir un token JWT.
   - Le token inclut des informations sur le rôle de l'utilisateur (`admin`).
   - Les routes sensibles (comme la modification de la disponibilité des terrains) sont protégées par le middleware `verifyToken`.

2. **Protection des rôles :**
   - Seuls les utilisateurs avec le rôle `admin` peuvent modifier la disponibilité des terrains ou supprimer des réservations.

3. **Bonnes pratiques :**
   - Utilisation de mots de passe codés en dur pour simplifier le développement.
   - Expiration automatique des tokens après 1 heure pour limiter les abus.

### **Améliorations possibles (bonus)**
- Mise en place de la protection contre les attaques par brute force (rate-limiting).
- Utilisation de HTTPS et de `helmet` pour sécuriser les headers.

---

## **Remarques**

### **Points importants :**
- Ce projet est une preuve de concept, les données sont stockées en mémoire.
- Si le serveur redémarre, toutes les données (terrains, réservations) seront réinitialisées.

### **Difficultés rencontrées :**
- Gestion des erreurs liées à JWT : nécessité de vérifier le rôle en plus de la validité du token.
- Coordination des ressources partagées (`terrains`, `reservations`) entre les différentes routes.

---

## **Références**

### **Ressources utilisées**
1. Documentation officielle de [Node.js](https://nodejs.org/en/docs/).
2. Documentation officielle de [Express.js](https://expressjs.com/).
3. [JSON Web Tokens (JWT) Guide](https://jwt.io/introduction).
4. Cours et exercices sur la création d'APIs RESTful.
5. Tutoriels et articles sur [Postman](https://www.postman.com/).
