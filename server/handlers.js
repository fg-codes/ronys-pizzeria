const { pizzas, orders } = require("./data");
const { v4: uuidv4 } = require('uuid');

// GET all the pizzas
const getPizzas = (req, res) => {
    try {
        setTimeout(() => {
            res.status(200).json({status: 200, data: pizzas});
        }, Math.random() * 3000);
    }
    catch {
        res.status(400).json({status: 400, message: "Something went wrong! 🤷‍♂️"});
    }
}

// GET one pizza based on ID
const getPizza = (req, res) => {
    try {
        setTimeout(() => {
            const { pizzaId } = req.params;
        
            const requestedPizza = pizzas.find((pizza) => {
                return pizza.id === pizzaId;
            });
    
            return requestedPizza 
                ? res.status(200).json({status: 200, data: requestedPizza})
                : res.status(400).json({status: 400, message: "Pizza not found! 😢"});

        }, Math.random() * 3000);
    
    }
    catch {
        return res.status(400).json({status: 400, message: "Pizza not found! 😢"});
    }
}

// GET all orders
const getOrders = (req, res) => {
    try {
        setTimeout(() => {
            return res.status(200).json({status: 200, data: orders});
        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Something went wrong! 🤷‍♂️"});
    }
} 

// GET one order based on ID
const getOrder = (req, res) => {
    try {
        setTimeout(() => {
            const { orderId } = req.params;
    
            const requestOrder = orders.find((order) => {
                return order.id === orderId
            });
    
            return requestOrder
                ? res.status(200).json({status: 200, data: requestOrder})
                : res.status(400).json({status: 400, message: "Order not found! 😱"});

        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Order not found! 😱"});
    }
}

// POST to create an order
const createOrder = (req, res) => {
    try {
        setTimeout(() => {
            const { order } = req.body;
    
            const {fname, lname, phone, address, email, price, pizza} = order;
            
            if(
                Object.keys(order).length !== 7 ||
                !fname.length || !lname.length || !phone.length || !address.length ||
                !email.length || !price.length || !pizza.length
            ) {
                return res.status(400).json({status: 400, message: "Missing data!"});
            }
    
            order.id = uuidv4();
        
            orders.push(order);
        
            return res.status(200).json({status: 200, message: "Order created successfully", data: order});

        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Invalid data!"});
    }
}

// PATCH to update an order
const updateOrder = (req, res) => {
    try {
        setTimeout(() => {
            const { orderId } = req.params;
            const { newOrder } = req.body;
        
            const orderIndex = orders.findIndex((order) => {
                return order.id === orderId
            });
        
            Object.keys(newOrder).forEach((key) => {
                orders[orderIndex][key] = newOrder[key];
            })
        
            return res.status(200).json({status: 200, message: "Order updated successfully", data: newOrder});

        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Order not found! 😱"});
    }
}

// DELETE an order based on ID
const deleteOrder = (req, res) => {
    try {
        setTimeout(() => {
            const { orderId } = req.params;
    
            const orderIndex = orders.findIndex((order) => {
                return order.id === orderId
            });
        
            orders.splice(orderIndex, 1);
        
            return res.status(200).json({status: 200, message: "Order deleted successfully"});

        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Order not found! 😱"});
    }
}

// PUT overwrite an order
const rewriteOrder = (req, res) => {
    try {
        setTimeout(() => {
            const { orderId } = req.params;
            const { newOrder } = req.body;
    
            const {fname, lname, phone, address, email, price, pizza} = newOrder;
            
            if(
                Object.keys(newOrder).length !== 8 ||
                !fname.length || !lname.length || !phone.length || !address.length ||
                !email.length || !price.length || !pizza.length
            ) {
                return res.status(400).json({status: 400, message: "Missing data!"});
            }
        
            const orderIndex = orders.findIndex((order) => {
                return order.id === orderId
            });
        
            orders.splice(orderIndex, 1, newOrder);
        
            return res.status(200).json({status: 200, message: "Order updated successfully", data: newOrder});

        }, Math.random() * 3000);
    }
    catch {
        return res.status(400).json({status: 400, message: "Order not found! 😱"});
    }
}

module.exports = { 
    getPizzas, 
    getPizza, 
    getOrders, 
    getOrder, 
    createOrder, 
    updateOrder,
    deleteOrder,
    rewriteOrder
};