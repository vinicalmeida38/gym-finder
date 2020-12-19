const express = require("express");
const server = express();

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/contact", (req, res) => {
  return res.render("contact.html");
});

server.get("/about", (req, res) => {
  return res.render("about.html");
});

server.listen(3000);
