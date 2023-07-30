const pizzas = [
    {
        id: "cheese",
        name: "Cheese Pizza 🧀",
        description: "Cheese! Cheese everywhere! So much cheese!",
        toppings: "🧀. What else were you expecting?",
        src: "/assets/cheese.jpg",
        price: {
            "Small": "$8.99",
            "Medium": "$10.99",
            "Large": "$12.99",
            "XLarge": "$14.99"
        }
    },
    {
        id: "all_dressed",
        name: "All Dressed Pizza 💃",
        description: "The classic all dressed is here with literally 0 changes!",
        toppings: "Cheese, peperoni, green peppers, and mushrooms.",
        src: "/assets/all_dressed.jpg",
        price: {
            "Small": "$9.99",
            "Medium": "$11.99",
            "Large": "$13.99",
            "XLarge": "$15.99"
        }
    },
    {
        id: "vegetarian",
        name: "Vegetarian Pizza 🍅",
        description: "For a healthier alternative! (well... as healthy as pizza can get)",
        toppings: "Cheese, green peppers, mushrooms, olives, and onions.",
        src: "/assets/vegetarian.jpg",
        price: {
            "Small": "$9.99",
            "Medium": "$11.99",
            "Large": "$13.99",
            "XLarge": "$15.99"
        }
    },
    {
        id: "hawaiian",
        name: "Hawaiian Pizza 🍍",
        description: "The infamous pizza with a tropical twist!",
        toppings: "Cheese, ham, and pineapple.",
        src: "/assets/hawaiian.jpg",
        price: {
            "Small": "$9.99",
            "Medium": "$11.99",
            "Large": "$13.99",
            "XLarge": "$15.99"
        }
    },
    {
        id: "meat",
        name: "Meat Lovers 🍖",
        description: "All the meats you can legally put on a pizza!",
        toppings: "Cheese, peperoni, Italian sausage, bacon crumble, and buffalo style chicken.",
        src: "/assets/meat.jpg",
        price: {
            "Small": "$10.99",
            "Medium": "$12.99",
            "Large": "$14.99",
            "XLarge": "$16.99"
        }
    },
    {
        id: "diet",
        name: "The American Diet ☠",
        description: "Minimum 1 lbs of toppings guaranteed, or your money back!",
        toppings: "Cheese, peperoni, green peppers, mushrooms, Italian sausage, and bacon crumble.",
        src: "/assets/diet.jpg",
        price: {
            "Small": "$12.99",
            "Medium": "$14.99",
            "Large": "$16.99",
            "XLarge": "$18.99"
        }
    },
]

const orders = [];

module.exports = { pizzas, orders };