import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

const URL = "https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/#!İstanbul/Pendik";

app.get("/pendik", async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: "new"
        });

        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: "networkidle2", timeout: 0 });

        // Sayfa yüklenip JS çalıştıktan sonra nöbetçi eczanelerin olduğu blokları al
        const data = await page.evaluate(() => {
            const list = [];
            const cards = document.querySelectorAll(".eczane-box");

            cards.forEach(card => {
                list.push({
                    eczaneAdi: card.querySelector("h3")?.innerText?.trim(),
                    adres: card.querySelector(".address")?.innerText?.trim(),
                    telefon: card.querySelector(".telephone")?.innerText?.trim()
                });
            });

            return list;
        });

        await browser.close();
        res.json(data);

    } catch (err) {
        res.json({ error: err.toString() });
    }
});

app.get("/", (req, res) => {
    res.send("Puppeteer ile Pendik Nöbetçi Eczane API çalışıyor.");
});

// Render doğru portu kullanabilsin diye
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("API çalışıyor PORT:", PORT));
