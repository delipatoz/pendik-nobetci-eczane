import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// İstanbul Eczacı Odası API URL (Pendik için filtre uygularız)
const apiURL = "https://www.istanbuleczaciodasi.org.tr/Eczane/NobetciEczane";

app.get("/pendik", async (req, res) => {
    try {
        const data = await fetch(apiURL).then(r => r.json());
        const sonuc = data.data.filter(x => x.ilce === "Pendik");
        res.json(sonuc);
    } catch (err) {
        res.json({ error: err.toString() });
    }
});

app.get("/", (req, res) => {
    res.send("Pendik Nöbetçi Eczane API Çalışıyor!");
});

app.listen(10000, () => {
    console.log("Server çalışıyor: Port 10000");
});
