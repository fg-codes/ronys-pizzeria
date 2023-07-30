const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");

const { 
    getPizzas, 
    getPizza, 
    getOrders, 
    getOrder, 
    createOrder, 
    updateOrder,
    deleteOrder,
    rewriteOrder
} = require("./handlers");

express()

    .use(express.json())
    .use(helmet())
    .use(morgan("tiny"))

    .get("/menu", getPizzas)
    .get("/menu/:pizzaId", getPizza)
    .get("/orders", getOrders)
    .get("/orders/:orderId", getOrder)

    .post("/orders", createOrder)

    .patch("/orders/:orderId", updateOrder)

    .put("/orders/:orderId", rewriteOrder)

    .delete("/orders/:orderId", deleteOrder)

    .listen(8000, () => {
        console.log(`Server listening on port ${8000}`)
    });