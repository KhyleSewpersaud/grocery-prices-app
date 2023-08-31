const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/searches", (req, res) => {
    const {search} = req.body;
    res.json({requestData:{search}});
});

app.listen(3001);
