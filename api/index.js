const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Search = require("./models/Search");
require('dotenv').config();
const request = require('request-promise');
const fs = require('fs')
const cheerio = require('cheerio')


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
    console.log(lastSearch)

    //metroRequester(lastSearch);
    nofrillsRequester(lastSearch);

    res.json(searchesGet)
})

function metroRequester(lastSearch) {
    request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.metro.ca/en/online-grocery/search?filter='+lastSearch)
    .then(response => {
        const htmlString = response;
        const $ = cheerio.load(htmlString);
        const nameElement = $('.head__title')
        const nameData = nameElement.first().text();

        const priceElement = $('.price-update')
        const priceData = priceElement.first().text();

        const picElement = $('.pt__visual .defaultable-picture img')
        const picData = picElement.attr('src');
        console.log(nameData, priceData, picData)
    })
    .catch(error => {
        console.log(error)
    })
}

function nofrillsRequester(lastSearch) {
    request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.loblaws.ca/search?search-bar='+lastSearch)
    .then(response => {
        const htmlString = response;
        const $ = cheerio.load(htmlString);
        const nameElement = $('.product-name__item--name')
        const nameData = nameElement.first().text();

        const priceElement = $('.selling-price-list__item__price--now-price__value')
        const priceData = priceElement.first().text();

        const picElement = $('.product-tile__thumbnail__image .responsive-image img')
        const picData = picElement.attr('src');
        console.log(nameData, priceData, picData)
    })
    .catch(error => {
        console.log(error)
    })
}



app.listen(4040);




