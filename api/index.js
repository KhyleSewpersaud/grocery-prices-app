const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Search = require("./models/Search");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URL
);

app.post("/searches", (req, res) => {
    const search = JSON.stringify(req.body)
    const searchDoc = Search.create({
        search
    })
    res.json(search)
});

app.get("/test", (req, res) => {
    res.json('get')
})

// async function nofrills() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.nofrills.ca/search?search-bar='+search)
// }

app.listen(4040);


