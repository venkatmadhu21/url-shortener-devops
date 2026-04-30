const express = require("express");
const app = express();

app.use(express.json());

const urls = {};

app.post("/shorten", (req, res) => {
    const code = Math.random().toString(36).substring(2, 8);
    urls[code] = req.body.url;
    res.json({ shortUrl: `/${code}` });
});

app.get("/:code", (req, res) => {
    const original = urls[req.params.code];
    if (!original) {
        return res.status(404).send("URL not found");
    }
    res.redirect(original);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});