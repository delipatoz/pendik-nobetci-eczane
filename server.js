import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

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

// 🔧 Render için DOĞRU PORT kullanımı
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Server çalışıyor: Port " + PORT);
});
