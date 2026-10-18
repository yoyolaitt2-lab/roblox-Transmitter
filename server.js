const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FUNZIONE DI CONVERSIONE (Inseriscila qui nel file principale) ---
function parolaIn6Bit(parola) {
    let testo = parola.toLowerCase();
    let risultatoBinario = [];

    for (let i = 0; i < testo.length; i++) {
        let char = testo[i];
        let valoreLogico = 0;

        if (char >= 'a' && char <= 'z') {
            valoreLogico = char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        } else if (char >= '1' && char <= '9') {
            valoreLogico = char.charCodeAt(0) - '1'.charCodeAt(0) + 27;
        } else if (char === '0') {
            valoreLogico = 36;
        } else if (char === ' ') {
            valoreLogico = 37;
        }

        // Converte e forza la lunghezza a 6 bit
        let binario6Bit = valoreLogico.toString(2).padStart(6, '0');
        risultatoBinario.push(binario6Bit);
    }

    // Unisce i bit senza spazi per mandarli come blocco unico al gioco (es: "011001000001")
    // Se preferisci mantenerli separati, usa .join(' ')
    return risultatoBinario.join(''); 
}

// Endpoint POST: Quando invii dati dal gioco al sito
app.post('/invia-a-sito', (req, res) => {
    console.log("Dati ricevuti da Roblox:", req.body);
    res.json({ value: "00000000" });
});

// Endpoint GET: Quando il gioco richiede dati dal sito
app.get('/ricevi-da-sito', (req, res) => {
    // 1. Definisci la parola che vuoi inviare a Roblox
    const parolaDaInviare = "y"; 
    
    // 2. Trasformala nella sequenza binaria a 6 bit
    const stringaBinaria = parolaIn6Bit(parolaDaInviare); // Genererà "011001"

    // 3. Rispondi dinamicamente inserendo la variabile generata
    res.json({ value: stringaBinaria });
});

app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
