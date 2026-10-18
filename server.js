const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// to get data
app.post('/give-to-web', (req, res) => {
    console.log("Data from Roblox:", req.body);
    res.json({ status: "Success", messaggio: "Data Received from Transmitter!" });
});

// to give data
app.get('/receive-from-web', (req, res) => {
    res.json({ messagge: "Hello from Render!" });
});

app.listen(PORT, () => console.log(`Server active on the Port ${PORT}`));
