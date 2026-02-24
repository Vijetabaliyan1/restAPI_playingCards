const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4000;

let cards = [];

app.get('/cards', (req, res) => {
    res.json(cards);
});

app.post('/cards', (req, res) => {
    const { id, suit, rank, color } = req.body;

    if (!id || !suit || !rank || !color) {
        return res.status(400).json({ message: "All fields are required" });
    }

    cards.push({ id, suit, rank, color });
    res.status(201).json({ message: "Card added successfully", cards });
});

app.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);

    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
});

app.put('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Card not found" });
    }

    cards[index] = req.body;
    res.json({ message: "Card updated successfully", card: cards[index] });
});

app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Card not found" });
    }

    cards.splice(index, 1);
    res.json({ message: "Card deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
