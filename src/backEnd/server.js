const express = require("express");
const app = express();
const cors = require("cors");
const data =require("../data/data.json")

app.use(express.json());
app.use(cors());

app.get("/menuData", (req, res) => {
    res.json(data)
  });


const port = 5000;
app.listen(port, () => {
  console.log(` سرور ${port} در حال اجراست...`);
});