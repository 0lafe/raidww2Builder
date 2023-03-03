const express = require("express");
const builder = express();

builder.use(express.static('public'));
builder.get("/", (req, res) => res.sendFile("index.html", { root: "./pages/"}));

builder.listen(9999, () => console.log("raid builder started on port 9999")); // eslint-disable-line no-console