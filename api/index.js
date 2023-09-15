const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Search = require("./models/Search");
require('dotenv').config();
const request = require('request-promise');
const fs = require('fs')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URL
);

let lastSearch;


app.post("/searches", (req, res) => {
    const search = JSON.stringify(req.body)
    const searchDoc = Search.create({
        search
    })
    res.json(search)
});

app.get("/searchesGet", async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const searchesGet = await Search.find({});
    lastSearch = (JSON.parse(searchesGet[searchesGet.length - 1].search).body).replace(/^"(.*)"$/, '$1')
    console.log('https://www.metro.ca/en/online-grocery/search?filter=' + lastSearch)

    requester(lastSearch);

    res.json(searchesGet)
})

function requester(lastSearch) {
    request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.metro.ca/en/online-grocery/search?filter='+lastSearch)
    .then(response => {
        console.log(response)
        fs.appendFile('here.txt', response, (err) => {
            if (err) {
                console.log(error)
            } else {
                console.log('yay')
            }
        })
    })
    .catch(error => {
        console.log(error)
    })
}



// async function nofrills(search1) {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();

//     await page.goto('https://www.nofrills.ca/search?search-bar='+search1)

//     setTimeout(() => {
        
//     }, 40000)
//     await page.screenshot({path: 'screenshot.png'})
//     await browser.close()

//     // const site = document.querySelector('div[data-track-product-index="5"]')
//     // const title = site.querySelector('span[class=product-name__item--name]').innerHTML
// }

app.listen(4040);




