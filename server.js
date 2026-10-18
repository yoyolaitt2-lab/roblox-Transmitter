const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Funzione interna per convertire frasi intere in binario a 6 bit
function fraseIn6Bit(frase) {
    let testo = frase.toLowerCase();
    let risultatoBinario = [];

    for (let i = 0; i < testo.length; i++) {
        let char = testo[i];
        let valoreLogico = 0;

        if (char >= 'a' && char <= 'z') {
            valoreLogico = char.charCodeAt(0) - 'a'.charCodeAt(0) + 1; // a=1, b=2...
        } else if (char >= '1' && char <= '9') {
            valoreLogico = char.charCodeAt(0) - '1'.charCodeAt(0) + 27; // 1=27...
        } else if (char === '0') {
            valoreLogico = 36;
        } else if (char === ' ') {
            valoreLogico = 37; // Valore logico per lo spazio tra le parole
        }

        let binario6Bit = valoreLogico.toString(2).padStart(6, '0');
        risultatoBinario.push(binario6Bit);
    }

    // Unisce tutte le lettere e gli spazi in una stringa continua
    return risultatoBinario.join(''); 
}

// Endpoint POST: Quando invii dati dal gioco al sito (Ripristinato con '/')
app.post('/invia-a-sito', (req, res) => {
    console.log("Dati ricevuti da Roblox:", req.body);
    res.json({ value: "00000000" });
});

// Endpoint GET: Quando il gioco richiede dati dal sito (Ripristinato con '/')
app.get('/ricevi-da-sito', (req, res) => {
    // PUOI SCRIVERE PIÙ PAROLE SEPARATE DA SPAZI QUI DENTRO:
    const mieParole = "ciao roblox"; 
    
    // Converte l'intera frase in un'unica stringa binaria
    const stringaBinaria = fraseIn6Bit(mieParole); 

    // Invia il JSON corretto a Roblox
    res.json({ value: stringaBinaria });
});

app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
