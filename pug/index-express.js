const express = require("express");
let { config } = require("./config");
const Productos = require('./contenedor.js');
let pug = require("pug")
const app = express();
const PORT = config.port;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let productos = new Productos();

app.get("/", (req, res, next) => {
    res.render("form");
})

app.get("/productos", (req, res, next) => {
    let products = productos.getAll()
    res.render("table", {products})
})

app.post("/productos", (req, res, next) => {
    productos.add(req.body)
    res.redirect("/")
})

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT} ||| Clase ${config.class}`);
})

