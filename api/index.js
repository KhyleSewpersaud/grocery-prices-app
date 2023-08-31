const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require('puppeteer');
const mongoose = require("mongoose")
const Search = require('./models/Search')

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://khylesewpersaud:mDiNF7LVfCQGlj9H@cluster0.h5thtg9.mongodb.net/?retryWrites=true&w=majority');

app.post("/searches", async (req, res) => {
    const search = req.body;
    const searchDoc = await Search.create({
        search
    })
    res.json(searchDoc);
});

// async function nofrills() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.nofrills.ca/search?search-bar='+search)
// } 

app.listen(3001);


// mongodb+srv://khylesewpersaud:mDiNF7LVfCQGlj9H@cluster0.h5thtg9.mongodb.net/?retryWrites=true&w=majority
