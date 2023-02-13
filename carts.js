const express = require("express");
const writeToFile = require("./writeToFile");

const carts = require("./carts.json");
const cartsPath = "./carts.json";

const cartsRouter = express.Router();

cartsRouter.route("/").get((req, res) => {
  res.json(carts);
});

cartsRouter.route("/").post((req, res) => {
  const newCart = { id: carts.length + 1, products: [] };
  carts.push(newCart);
  writeToFile(cartsPath, carts);
  res.json(newCart);
});

cartsRouter.route("/:id").get((req, res) => {
  const cart = carts.find((c) => c.id === parseInt(req.params.id));
  if (!cart) {
    return res.status(404).send({ error: "El carrito no ha sido encontrado" });
  }
  return res.json(cart);
});

cartsRouter.route("/:id").put((req, res) => {
  const cartIndex = carts.findIndex((c) => c.id === parseInt(req.params.id));
  if (cartIndex === -1) {
    return res.status(404).send({ error: "El carrito no ha sido encontrado" });
  }
  carts[cartIndex] = { ...carts[cartIndex], ...req.body };
  writeToFile(cartsPath, carts);
  return res.json(carts[cartIndex]);
});

cartsRouter.route("/:id").delete((req, res) => {
  const cartIndex = carts.findIndex((c) => c.id === parseInt(req.params.id));
  if (cartIndex === -1) {
    return res.status(404).send({ error: "El carrito no ha sido encontrado" });
  }
  carts.splice(cartIndex, 1);
  writeToFile(cartsPath, carts);
  return res.send("El carrito ha sido eliminado");
});

module.exports = cartsRouter;

