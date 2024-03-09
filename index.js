const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
// Import required modules
const express = require("express");
const database = require("./database");
const populateData = require("./populateData");
const ArticleModel = require("./NewsArticle.js");
const cors= require("cors");

// Create an Express application
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a port number
const PORT = process.env.PORT || 5000;

// Define routes

app.get("/stealnews", (req, res) => {
  const country = req.body.country || "in";
  const category = req.body.category || "entertainment";
  let params = new URLSearchParams();
  params.append("country", country);
  params.append("category", category);
  params.append("page", req.query.page || 1);
  params.append("apiKey", process.env.API_KEY);
  // console.log(params.toString());

  fetch(process.env.API_URL + "?" + params.toString())
    .then((r) => r.json())
    .then((data) => {
      // fs.writeFileSync("recvd.json",JSON.stringify(data));
      populateData(
        data.articles.map((article) => {
          return {
            ...article,
            country,
            category,
          };
        })
      );
    });
  res.status(200).json({
    success: "true",
  });
});

app.post("/news", async (req, res) => {
  const body = req.body;
  let page=body.page??1;
  console.log(body);
  const UNIT_PAGE = 10;
  const results = await ArticleModel.find({
    country: body.country,
    category: body.category,
  });
  const paginatedResults=results.slice((page-1)*UNIT_PAGE,page*UNIT_PAGE);
  res.status(200).json({
    articles: paginatedResults,
    totalResults: results.length,
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
