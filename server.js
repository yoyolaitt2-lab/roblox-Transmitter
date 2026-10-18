const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Gestisce sia i dati JSON che i dati provenienti dai moduli di Build Logic
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint POST: Quando invii dati dal gioco al sito
app.post('/invia-a-sito', (req, res) => {
    console.log("Dati ricevuti da Roblox:", req.body);
    // Risponde con il formato binario corretto richiesto dal Transmitter
    res.json({ value: "00000000" });
});

// Endpoint GET: Quando il gioco richiede dati dal sito
app.get('/ricevi-da-sito', (req, res) => {
    // Cambia gli zeri e gli uni per attivare le porte logiche nel gioco (es: "00000101")
    res.json({ value: "00000001" });
});

app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
