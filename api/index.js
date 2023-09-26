const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Search = require("./models/Search");
const Data = require("./models/Data")
require('dotenv').config();
const request = require('request-promise');
const cheerio = require('cheerio')
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
    console.log(lastSearch)

    const a = await metroRequester(lastSearch);
    const b = await walmartRequester(lastSearch);
    const c = await amazonRequester(lastSearch)


    const responseData = {
      metroData: a,
      walmartData: b,
      amazonData: c
    };

    res.json(responseData)
})

async function metroRequester(lastSearch) {
    await request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.metro.ca/en/online-grocery/search?filter='+lastSearch)
    .then(response => {
        const htmlString = response;
        const $ = cheerio.load(htmlString);
        const nameElement = $('.head__title')
        const nameData = nameElement.first().text();

        const priceElement = $('.price-update')
        const priceData = priceElement.first().text();

        const picElement = $('.pt__visual .defaultable-picture img')
        const picData = picElement.attr('src');

        const dataDoc = new Data({
            name: nameData,
            price: priceData,
            picture: picData
        })
        dataDoc.save()
        
        console.log(nameData, priceData, picData)
        return ([nameData, priceData, picData])
    })
    .catch(error => {
        console.log(error)
    })
}

async function walmartRequester(lastSearch) {
    await request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.walmart.ca/search?q='+lastSearch+'&c=10019')
    .then(response => {
        fs.writeFile('here.txt', response, (err) => {
            if (err) {
              console.error('Error writing to file:', err);
            } else {
              console.log('Data has been written to the file successfully.');
            }
          });

        const htmlString = response;
        const $ = cheerio.load(htmlString);
        const nameElement = $('.css-1p4va6y')
        const nameData = nameElement.first().text();

        const priceElement = $('.css-2vqe5n')
        const priceData = priceElement.text();

        const picElement = $('.css-19q6667')
        const picData = picElement.attr('src');

        const dataDoc = new Data({
            name: nameData,
            price: priceData,
            picture: picData
        })
        dataDoc.save()

        console.log(nameData, priceData, picData)
        return ([nameData, priceData, picData])
    })
    .catch(error => {
        console.log(error)
    })
}

async function amazonRequester(lastSearch) {
    request('http://api.scraperapi.com/?api_key='+process.env.API_KEY+'&url=https://www.amazon.ca/s?k=' + lastSearch + '&i=grocery&crid=3YIBEC56BNGA&sprefix=s%2Cgrocery%2C84&ref=nb_sb_ss_ts-doa-p_1_1')
    .then(response => {
        const htmlString = response;
        const $ = cheerio.load(htmlString);
        const nameElement = $('.a-size-base-plus')
        const nameData = nameElement.first().text();

        const priceElement = $('.a-price-whole')
        let priceData = priceElement.first().text();
        const priceElement2 = $('.a-price-fraction')
        let priceData2 = priceElement2.first().text();
        priceData = "$"+priceData + priceData2

        const picElement = $('.sg-col-4-of-24 .s-image')
        const picData = picElement.attr('src');

        const dataDoc = new Data({
            name: nameData,
            price: priceData,
            picture: picData
        })
        dataDoc.save()

        console.log(nameData, priceData, picData)
        return ([nameData, priceData, picData])
    })
    .catch(error => {
        console.log(error)
    })
}



app.listen(4040);




