const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");



const app = express();
app.use(express.json());
app.use(cors());

// Verschlüsselungs- und Entschlüsselungsschlüssel
const IV_LENGTH = 16; // Initialisierungsvektor für AES
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 64 Hex-Zeichen (32 Bytes)


// Middleware zur Überprüfung des JWT-Tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Token aus dem Authorization-Header extrahieren

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    jwt.verify(token, process.env.NEXTAUTH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user; // Benutzerinformationen aus dem JWT setzen
        next(); // Weiter mit der Anfrage
    });
};

// Hilfsfunktionen zum Verschlüsseln und Entschlüsseln
const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    console.log(iv.toString("hex") + ":" + encrypted)
    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText) => {
    const [iv, encrypted] = encryptedText.split(":");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

// Simulierte Datenbank für Passwörter (verschlüsselt)
const passwordEntries = [
    { id: 1, website: "example.com", username: "exampleUser", password: "79d105aa8c69ffb08692ccce6c616a5d:b73e03ab7cb2d8f142c62cd061df9cf5", remarks: "Personal account" },
    { id: 2, website: "test.com", username: "testUser", password: "61bf0fb5e8ace45017951a7d19932c07:6af8f7c742a83af7f2f5ee29c086e06e", remarks: "Work account" },
    { id: 3, website: "website.org", username: "orgUser", password: "ea78d25e78fe4a9053a52827ecf3839c:c4044658546bbb3e3c3c3acee6ac70fe", remarks: "Subscription" },
];

// Beispiel-Benutzerdatenbank für Master-Login
const masters = [
    { id: 1, username: "user", password: "$2b$12$mTOZp97J1LPLMX0ww4EUNu7/ChB/Wn6Qa7b5sxFIwRgivZv2q6Wye" }
];

// Login-API
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const master = masters.find((u) => u.username === username);

    if (!master) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = bcrypt.compareSync(password, master.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ id: master.id, username: master.username });
});



app.post("/api/passwords", (req, res) => {
    const { website, username, password, remarks } = req.body;
    const newPassword = {
        id: passwordEntries.length + 1,
        website,
        username,
        password: encrypt(password), // Passwort verschlüsseln
        remarks,
    };

    passwordEntries.push(newPassword);
    res.status(201).json(newPassword);
});


// API zum Abrufen der gespeicherten Passwörter (verschlüsselt)
app.get("/api/passwords", (req, res) => {
    // Entschlüsseln der Passwörter, bevor sie an den Client gesendet werden
    const decryptedPasswords = passwordEntries.map((entry) => ({
        ...entry,
        password: decrypt(entry.password), // Passwort entschlüsseln
    }));

    res.status(200).json(decryptedPasswords);
});

// API zum Aktualisieren eines Passworts
app.put("/api/passwords/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { website, username, password, remarks } = req.body;

    const index = passwordEntries.findIndex((entry) => entry.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Password entry not found" });
    }

    // Eintrag aktualisieren
    passwordEntries[index] = {
        ...passwordEntries[index],
        website,
        username,
        password: encrypt(password), // Passwort verschlüsseln
        remarks,
    };

    res.status(200).json({ message: "Password entry updated successfully" });
});

// API zum Löschen eines Passworts
app.delete("/api/passwords/:id", (req, res) => {
    console.log("ID to delete:", req.params.id);
    const id = parseInt(req.params.id, 10);
    const index = passwordEntries.findIndex((entry) => entry.id === id);
    if (index === -1) {
        console.error("Password entry not found for ID:", id);
        return res.status(404).json({ error: "Password entry not found" });
    }
    passwordEntries.splice(index, 1);
    res.status(200).json({ message: "Password entry deleted successfully" });
});


// Server starten
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
